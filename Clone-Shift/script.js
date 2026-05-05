const boardEl = document.getElementById("board");
const actionText = document.getElementById("actionText");
const messageEl = document.getElementById("message");
const sequenceText = document.getElementById("sequenceText");
const cloneBtn = document.getElementById("cloneBtn");
const resetBtn = document.getElementById("resetBtn");
const controlButtons = document.querySelectorAll(".controls button");
const stageSelect = document.getElementById("stageSelect");
const stageDescription = document.getElementById("stageDescription");

const GROUP_THEMES = {
  A: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#7c2d12",
    border: "#451a03",
    glow: "rgba(251, 191, 36, 0.75)",
    softGlow: "rgba(251, 191, 36, 0.25)",
    text: "#451a03",
    badgeBg: "rgba(254, 243, 199, 0.96)",
  },
  B: {
    main: "#8b5cf6",
    light: "#c4b5fd",
    dark: "#4c1d95",
    border: "#2e1065",
    glow: "rgba(139, 92, 246, 0.75)",
    softGlow: "rgba(139, 92, 246, 0.25)",
    text: "#2e1065",
    badgeBg: "rgba(237, 233, 254, 0.96)",
  },
  C: {
    main: "#06b6d4",
    light: "#67e8f9",
    dark: "#164e63",
    border: "#083344",
    glow: "rgba(6, 182, 212, 0.75)",
    softGlow: "rgba(6, 182, 212, 0.25)",
    text: "#083344",
    badgeBg: "rgba(207, 250, 254, 0.96)",
  },
  D: {
    main: "#22c55e",
    light: "#86efac",
    dark: "#166534",
    border: "#052e16",
    glow: "rgba(34, 197, 94, 0.75)",
    softGlow: "rgba(34, 197, 94, 0.25)",
    text: "#052e16",
    badgeBg: "rgba(220, 252, 231, 0.96)",
  },
  E: {
    main: "#ef4444",
    light: "#fca5a5",
    dark: "#7f1d1d",
    border: "#450a0a",
    glow: "rgba(239, 68, 68, 0.75)",
    softGlow: "rgba(239, 68, 68, 0.25)",
    text: "#450a0a",
    badgeBg: "rgba(254, 226, 226, 0.96)",
  },
};

function applyGroupTheme(cell, group) {
  const theme = GROUP_THEMES[group] || GROUP_THEMES.A;

  cell.dataset.group = group;

  cell.style.setProperty("--group-main", theme.main);
  cell.style.setProperty("--group-light", theme.light);
  cell.style.setProperty("--group-dark", theme.dark);
  cell.style.setProperty("--group-border", theme.border);
  cell.style.setProperty("--group-glow", theme.glow);
  cell.style.setProperty("--group-soft-glow", theme.softGlow);
  cell.style.setProperty("--group-text", theme.text);
  cell.style.setProperty("--group-badge-bg", theme.badgeBg);
}

let ROWS = 0;
let COLS = 0;
let MAX_ACTIONS = 0;
let stage = null;

const TILE = {
  FLOOR: 0,
  WALL: 1,
};

const state = {
  player: null,
  actionsUsed: 0,
  currentSequence: [],
  cloneSequence: [],
  clone: null,
  cloneStep: 0,
  isGameOver: false,
  openedGroups: new Set(),
};

let messageTimer = null;

const directionMap = {
  up: { row: -1, col: 0, label: "↑" },
  down: { row: 1, col: 0, label: "↓" },
  left: { row: 0, col: -1, label: "←" },
  right: { row: 0, col: 1, label: "→" },
  wait: { row: 0, col: 0, label: "W" },
};

function initStageSelect() {
  stageSelect.innerHTML = "";

  STAGES.forEach((stageData, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = stageData.name;
    stageSelect.appendChild(option);
  });

  stageSelect.addEventListener("change", () => {
    loadStage(Number(stageSelect.value));
  });
}

function loadStage(stageIndex) {
  stage = STAGES[stageIndex];

  ROWS = stage.rows;
  COLS = stage.cols;
  MAX_ACTIONS = stage.maxActions;

  boardEl.style.setProperty("--rows", ROWS);
  boardEl.style.setProperty("--cols", COLS);
  boardEl.dataset.room = stage.name;

  if (stageDescription) {
    stageDescription.textContent = stage.description;
  }

  resetGame();
}

function createGrid() {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(TILE.FLOOR));

  stage.walls.forEach((wall) => {
    grid[wall.row][wall.col] = TILE.WALL;
  });

  return grid;
}

function isSamePos(a, b) {
  return a && b && a.row === b.row && a.col === b.col;
}

function isInside(pos) {
  return pos.row >= 0 && pos.row < ROWS && pos.col >= 0 && pos.col < COLS;
}

function isWall(pos) {
  if (!isInside(pos)) return false;
  return createGrid()[pos.row][pos.col] === TILE.WALL;
}

function getSwitchAt(pos) {
  return stage.switches.find((switchTile) => isSamePos(pos, switchTile));
}

function getDoorAt(pos) {
  return stage.doors.find((doorTile) => isSamePos(pos, doorTile));
}

function getSwitchType(switchTile) {
  return switchTile.type || "hold";
}

function activateOnceSwitchesAt(pos) {
  const switchTile = getSwitchAt(pos);

  if (!switchTile) return;

  if (getSwitchType(switchTile) === "once") {
    const isNew = !state.openedGroups.has(switchTile.group);
    state.openedGroups.add(switchTile.group);

    // 처음 열리는 순간만 문 파괴 애니메이션 예약
    if (isNew) {
      state.newlyOpenedGroups = state.newlyOpenedGroups || new Set();
      state.newlyOpenedGroups.add(switchTile.group);
    }
  }
}

function isSwitchActiveByGroup(group) {
  return stage.switches.some((switchTile) => {
    return (
      switchTile.group === group &&
      getSwitchType(switchTile) === "hold" &&
      (
        isSamePos(state.player, switchTile) ||
        isSamePos(state.clone, switchTile)
      )
    );
  });
}

function isDoorOpenByGroup(group) {
  return state.openedGroups.has(group) || isSwitchActiveByGroup(group);
}

function hasAnyOpenDoor() {
  return stage.doors.some((doorTile) => isDoorOpenByGroup(doorTile.group));
}

function canMoveTo(pos) {
  if (!isInside(pos)) return false;
  if (isWall(pos)) return false;
  const door = getDoorAt(pos);

  if (door && !isDoorOpenByGroup(door.group)) {
    return false;
  }

  return true;
}

function getBlockedReason(pos) {
  if (!isInside(pos)) {
    return "방 밖으로는 이동할 수 없습니다.";
  }

  if (isWall(pos)) {
    return "벽에 막혀 이동할 수 없습니다.";
  }

  const door = getDoorAt(pos);

  if (door && !isDoorOpenByGroup(door.group)) {
    return `문 ${door.group}가 닫혀 있습니다. 스위치 ${door.group}를 눌러야 열립니다.`;
  }

  return "";
}

function showBlockedFeedback(reason) {
  if (messageTimer) {
    clearTimeout(messageTimer);
  }

  boardEl.classList.remove("shake");
  void boardEl.offsetWidth;
  boardEl.classList.add("shake");

  messageEl.classList.add("warning");
  messageEl.textContent = reason || "이동할 수 없습니다.";

  messageTimer = setTimeout(() => {
    boardEl.classList.remove("shake");
    messageEl.classList.remove("warning");

    if (!state.isGameOver) {
      messageEl.textContent = "다른 방향으로 이동하거나 Wait를 사용해보세요.";
    }
  }, 1500);
}

function nextPosition(actor, action) {
  const move = directionMap[action];

  return {
    row: actor.row + move.row,
    col: actor.col + move.col,
  };
}

function moveActor(actor, action) {
  if (!actor) return null;

  const target = nextPosition(actor, action);
  return canMoveTo(target) ? target : actor;
}

function render() {
  boardEl.innerHTML = "";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const pos = { row, col };

      if (isWall(pos)) {
        cell.classList.add("wall");
      }

      if (isSamePos(pos, stage.start)) {
        cell.classList.add("start");
        cell.textContent = "";
      }

      const switchTile = getSwitchAt(pos);

      if (switchTile) {
        const switchActive = isSwitchActiveByGroup(switchTile.group);
        const switchType = getSwitchType(switchTile);
        const isOpenedOnce = switchType === "once" && state.openedGroups.has(switchTile.group);

        cell.classList.add("switch", `switch-${switchType}`);
        if (switchActive || isOpenedOnce) {
          cell.classList.add("active");
        }

        if (isOpenedOnce) {
          cell.classList.add("latched");
        }

        applyGroupTheme(cell, switchTile.group);
      }

      const doorTile = getDoorAt(pos);

      if (doorTile) {
        const doorOpen = isDoorOpenByGroup(doorTile.group);

        // once 스위치로 열린 문인지 확인
        const isOnceGroup = stage.switches.some(
          s => s.group === doorTile.group && getSwitchType(s) === "once"
        );

        if (isOnceGroup && doorOpen) {
          // 이번 턴에 처음 열린 문 → 파괴 애니메이션
          const isNewlyOpened = state.newlyOpenedGroups && state.newlyOpenedGroups.has(doorTile.group);
          cell.classList.add("door", "door-remnant");
          if (isNewlyOpened) cell.classList.add("door-destroy");
          applyGroupTheme(cell, doorTile.group);
          cell.dataset.group = doorTile.group;
        } else {
          cell.classList.add("door");
          if (doorOpen) cell.classList.add("open");
          applyGroupTheme(cell, doorTile.group);
          cell.dataset.group = doorTile.group;
        }
      }

      if (isSamePos(pos, stage.exit)) {
        cell.classList.add("exit");
        cell.textContent = "EXIT";
      }

      if (isSamePos(pos, state.player)) {
        const player = document.createElement("div");
        player.className = "actor player";
        player.textContent = "";
        cell.appendChild(player);
      }

      if (isSamePos(pos, state.clone)) {
        const clone = document.createElement("div");
        clone.className = "actor clone";
        clone.textContent = "";
        cell.appendChild(clone);
      }

      boardEl.appendChild(cell);
    }
  }

  actionText.textContent = `${state.actionsUsed} / ${MAX_ACTIONS}`;

  sequenceText.textContent = state.currentSequence.length
    ? state.currentSequence.map((action) => directionMap[action].label).join(" ")
    : "없음";

  cloneBtn.disabled = state.currentSequence.length === 0 || state.isGameOver;

  controlButtons.forEach((button) => {
    button.disabled = state.isGameOver;
  });

  // 애니메이션 트리거 후 초기화
  if (state.newlyOpenedGroups) state.newlyOpenedGroups.clear();
}

function checkGameState() {
  if (isSamePos(state.player, stage.exit)) {
    state.isGameOver = true;
    messageEl.textContent = "클리어! Clone이 스위치를 담당하는 동안 Player가 출구에 도달했습니다.";
    render();
    return;
  }

  if (state.actionsUsed >= MAX_ACTIONS) {
    state.isGameOver = true;
    messageEl.textContent = "실패! Actions를 모두 사용했습니다. Reset 후 다시 시도하세요.";
    render();
  }
}

function advanceClone() {
  if (!state.clone) return;

  if (state.cloneStep >= state.cloneSequence.length) {
    state.clone = null;
    return;
  }

  const cloneAction = state.cloneSequence[state.cloneStep];
  state.clone = moveActor(state.clone, cloneAction);
  state.cloneStep += 1;

  activateOnceSwitchesAt(state.clone);

  if (state.cloneStep >= state.cloneSequence.length) {
    setTimeout(() => {
      if (!state.isGameOver && state.cloneStep >= state.cloneSequence.length) {
        state.clone = null;
        render();
      }
    }, 180);
  }
}

function handlePlayerAction(action) {
  if (state.isGameOver) return;
  if (state.actionsUsed >= MAX_ACTIONS) return;

  const target = nextPosition(state.player, action);
  const blockedReason = getBlockedReason(target);

  /*
    이동이 막힌 경우:
    - Actions 증가 X
    - Sequence 저장 X
    - Clone 진행 X
    - Player 위치 변경 X
    - 화면 진동 + 안내 메시지만 표시
  */
  if (action !== "wait" && blockedReason) {
    showBlockedFeedback(blockedReason);
    render();
    return;
  }

  // 한 턴 처리: 유효한 행동일 때만 Clone과 Player가 동시에 움직인다.
  advanceClone();
  state.player = moveActor(state.player, action);
  activateOnceSwitchesAt(state.player);

  state.currentSequence.push(action);
  state.actionsUsed += 1;

  if (hasAnyOpenDoor()) {
    messageEl.textContent = "스위치가 눌려 연결된 문이 열렸습니다. 지금 출구로 이동하세요.";
  } else {
    messageEl.textContent = "이동 기록이 Sequence에 저장되고 있습니다.";
  }

  render();
  checkGameState();
}

function createClone() {
  if (state.currentSequence.length === 0 || state.isGameOver) return;

  state.cloneSequence = [...state.currentSequence];
  state.openedGroups = new Set();
  state.clone = { ...stage.start };
  state.cloneStep = 0;
  state.player = { ...stage.start };
  state.currentSequence = [];

  messageEl.textContent = "Clone이 생성되었습니다. 이제 Player와 Clone이 동시에 움직입니다.";
  render();
}

function resetGame() {
  state.player = { ...stage.start };
  state.actionsUsed = 0;
  state.currentSequence = [];
  state.cloneSequence = [];
  state.clone = null;
  state.cloneStep = 0;
  state.isGameOver = false;
  state.openedGroups = new Set();

  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }

  boardEl.classList.remove("shake");
  messageEl.classList.remove("warning");
  messageEl.textContent = "먼저 Clone이 스위치까지 가도록 이동한 뒤 Clone을 생성해보세요.";

  render();
}

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handlePlayerAction(button.dataset.action);
  });
});

window.addEventListener("keydown", (event) => {
  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    " ": "wait",
  };

  const action = keyMap[event.key];
  if (!action) return;

  event.preventDefault();
  handlePlayerAction(action);
});

cloneBtn.addEventListener("click", createClone);
resetBtn.addEventListener("click", resetGame);

initStageSelect();
loadStage(0);