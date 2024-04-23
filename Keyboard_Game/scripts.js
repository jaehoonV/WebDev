import * as basic from "./basic_scripts.js"

const keyBoardMap = new Map([
    [65, 'A'], [66, 'B'], [67, 'C'], [68, 'D'], [69, 'E'], [70, 'F'],
    [71, 'G'], [72, 'H'], [73, 'I'], [74, 'J'], [75, 'K'], [76, 'L'],
    [77, 'M'], [78, 'N'], [79, 'O'], [80, 'P'], [81, 'Q'], [82, 'R'],
    [83, 'S'], [84, 'T'], [85, 'U'], [86, 'V'], [87, 'W'], [88, 'X'],
    [89, 'Y'], [192, 'mul'], [49, '1'], [50, '2'], [51, '3'], [52, '4'],
    [53, '5'], [54, '6'], [55, '7'], [56, '8'], [57, '9'], [48, '10'],
    [189, 'minus'], [187, 'plus'], [8, 'back'], [9, 'tab'], [219, 'case1'],
    [221, 'case2'], [220, 'backslash'], [20, 'caps'], [186, 'case3'], [222, 'case4'],
    [13, 'enter'], [16, 'shift'], [188, 'case5'], [190, 'case6'], [191, 'case7'],
    [17, 'left-ctrl'], [91, 'window'], [18, 'left-alt'], [32, 'space'], [21, 'right-alt'],
    [25, 'right-ctrl'], [38, 'up'], [37, 'left'], [40, 'down'], [39, 'right']
]);

// 방향키를 눌렀을 때 이벤트 핸들러 등록
document.addEventListener("keydown", handleDirectionKeyPress);

let alphabet, score = 0, end_bool = false;

random_alphabet();

// 방향키를 눌렀을 때의 이벤트 핸들러 함수
function handleDirectionKeyPress(event) {

    if(press_func(event.keyCode)){
        if(!end_bool){
            if(event.keyCode == alphabet){
                score++;
                random_alphabet();
            }else{
                end_bool = true;
                basic.effect_vibe('target_div');
                console.log("게임 종료! 점수 : " + score);
            }
        }
    }
}

function random_alphabet(){
    if(!end_bool){
        alphabet = Math.floor((Math.random() * (90 - 65)) + 65);
        document.getElementById('target').innerText = keyBoardMap.get(alphabet);
    }
}

function press_func(keyCode){
    let key = keyBoardMap.get(keyCode);
    basic.pressKey(key);

    if(key) return true;
    return false;
}