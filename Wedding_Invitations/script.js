const weddingInfo = {
    groom: '재훈',
    bride: '희은',
    weddingDate: '2026-12-19T17:00:00+09:00',
    venue: '루이비스 컨벤션 강서점',
    address: '서울특별시 강서구 양천로 476 7층, 8층'
};

const appContents = {
    story: `
        <article class="content-card hero-card">
            <span class="section-kicker">Our Story</span>
            <h2>신랑 신부 이야기</h2>
            <p>만난 지 1000일이 되는 날, 저희 두 사람이 평생을 함께 걷기로 약속했습니다.</p>
            <p>소중한 분들을 모시고 첫걸음을 시작하려 합니다. 저희의 예쁜 시작을 함께 빛내주세요.</p>
        </article>
        <article class="content-card">
            <h3>초대의 말</h3>
            <p>서로에게 가장 편안한 사람이 되어 같은 방향을 바라보며 살아가겠습니다.</p>
        </article>`,
    map: `
        <article class="content-card hero-card">
            <span class="section-kicker">Location</span>
            <h2>오시는 길</h2>
            <p><strong>${weddingInfo.venue}</strong></p>
            <p class="muted">${weddingInfo.address}</p>
        </article>
        <div class="ios-list">
            <button type="button" class="list-row" data-copy="${weddingInfo.address}"><span>주소 복사</span><b>›</b></button>
            <a class="list-row" href="https://map.kakao.com/link/search/${encodeURIComponent(weddingInfo.address)}" target="_blank" rel="noopener"><span>카카오맵으로 보기</span><b>›</b></a>
        </div>`,
    gallery: `
        <article class="content-card hero-card">
            <span class="section-kicker">Gallery</span>
            <h2>갤러리</h2>
            <p class="muted">사진을 넣으면 iOS 사진 앱처럼 카드형으로 보이도록 구성했습니다.</p>
        </article>
        <div class="gallery-grid">
            <div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div>
        </div>`,
    gift: `
        <article class="content-card hero-card">
            <span class="section-kicker">Gift</span>
            <h2>마음 전하실 곳</h2>
            <p class="muted">참석이 어려우신 분들을 위해 계좌 정보를 남겨드립니다.</p>
        </article>
        <div class="ios-list">
            <button type="button" class="list-row" data-copy="국민은행 111-111-1111 이재훈"><span><small>신랑측</small> 국민 111-111-1111</span><b>복사</b></button>
            <button type="button" class="list-row" data-copy="국민은행 111-111-1111 주희은"><span><small>신부측</small> 국민 111-111-1111</span><b>복사</b></button>
        </div>`,
    schedule: `
        <article class="content-card hero-card">
            <span class="section-kicker">Schedule</span>
            <h2>예식 일정</h2>
            <p><strong>2026년 12월 19일 토요일 오후 5시</strong></p>
            <p class="muted">${weddingInfo.venue}</p>
        </article>`,
    guestbook: `
        <article class="content-card hero-card">
            <span class="section-kicker">Guest Book</span>
            <h2>방명록</h2>
            <p class="muted">축하 메시지를 남겨주세요.</p>
        </article>
        <form class="guest-form" id="guestForm">
            <input type="text" id="guestName" placeholder="이름" maxlength="12" required>
            <textarea id="guestMessage" placeholder="축하 메시지" rows="4" maxlength="80" required></textarea>
            <button type="submit">메시지 남기기</button>
        </form>
        <div class="message-list" id="messageList"></div>`,
    share: `
        <article class="content-card hero-card">
            <span class="section-kicker">Share</span>
            <h2>청첩장 공유</h2>
            <p class="muted">현재 페이지 주소를 복사하거나, 지원되는 기기에서는 공유창을 열 수 있습니다.</p>
        </article>
        <div class="ios-list">
            <button type="button" class="list-row" id="shareBtn"><span>공유하기</span><b>›</b></button>
            <button type="button" class="list-row" data-copy="${location.href}"><span>링크 복사</span><b>복사</b></button>
        </div>`
};

let startY = 0;
let activePointerId = null;
let isUnlocked = false;

const $ = (selector) => document.querySelector(selector);
const lockScreen = $('#lockScreen');
const homeScreen = $('#homeScreen');
const appWindow = $('#appWindow');
const appContent = $('#appContent');
const appTitle = $('#appTitle');
const lockHomeBar = $('#lockHomeBar');
const notificationOpenBtn = $('#notificationOpenBtn');
const appHomeBar = $('#appHomeBar');
const closeAppBtn = $('#closeAppBtn');

function updateWeddingCoverInfo() {
    const weddingDate = new Date(weddingInfo.weddingDate);
    const dateString = weddingDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    const lockDate = $('#lockDate');
    if (lockDate) lockDate.textContent = dateString;

    updateDday(new Date());
}

function updateDday(now = new Date()) {
    const target = new Date(weddingInfo.weddingDate);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weddingDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const diff = Math.ceil((weddingDay - today) / 86400000);
    const ddayText = diff > 0 ? `WEDDING D-${diff} ♥` : diff === 0 ? 'WEDDING DAY ♥' : `WEDDING D+${Math.abs(diff)} ♥`;
    const dday = $('#weddingDday');
    if (dday) dday.textContent = ddayText;
}

function unlockIphone() {
    if (isUnlocked) return;
    isUnlocked = true;
    lockScreen.classList.add('unlocked-lock');
    homeScreen.classList.add('unlocked-home');
    setTimeout(() => {
        lockScreen.setAttribute('aria-hidden', 'true');
        lockScreen.style.display = 'none';
    }, 560);
}

function openApp(appId, appName) {
    appTitle.textContent = appName;
    appContent.innerHTML = appContents[appId] || '<article class="content-card"><h2>준비 중입니다</h2></article>';
    appContent.scrollTop = 0;
    appWindow.classList.add('active');
    appWindow.setAttribute('aria-hidden', 'false');
    bindDynamicContentEvents(appId);
}

function closeActiveApp() {
    appWindow.classList.remove('active');
    appWindow.setAttribute('aria-hidden', 'true');
}

function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
}

function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1600);
}

function bindDynamicContentEvents(appId) {
    appContent.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            try {
                await copyText(button.dataset.copy);
                showToast('복사되었습니다');
            } catch (error) {
                showToast('복사에 실패했습니다');
            }
        });
    });

    const shareBtn = $('#shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            try {
                if (navigator.share) {
                    await navigator.share({ title: '모바일 청첩장', text: '저희 결혼식에 초대합니다.', url: location.href });
                } else {
                    await copyText(location.href);
                    showToast('링크가 복사되었습니다');
                }
            } catch (error) {
                showToast('공유가 취소되었습니다');
            }
        });
    }

    const guestForm = $('#guestForm');
    if (guestForm) {
        renderGuestMessages();
        guestForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = $('#guestName').value.trim();
            const message = $('#guestMessage').value.trim();
            if (!name || !message) return;
            const messages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
            messages.unshift({ name, message, createdAt: new Date().toISOString() });
            localStorage.setItem('guestMessages', JSON.stringify(messages.slice(0, 20)));
            guestForm.reset();
            renderGuestMessages();
        });
    }
}

function renderGuestMessages() {
    const list = $('#messageList');
    if (!list) return;
    const messages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
    list.innerHTML = messages.length
        ? messages.map((item) => `<article class="message-card"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.message)}</p></article>`).join('')
        : '<p class="empty-message">아직 남겨진 메시지가 없습니다.</p>';
}

function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function handlePointerStart(event) {
    activePointerId = event.pointerId;
    startY = event.clientY;
}

function handlePointerEnd(event, targetAction) {
    if (activePointerId !== event.pointerId) return;
    const endY = event.clientY;
    if (startY - endY > 55) targetAction();
    activePointerId = null;
}

lockScreen.addEventListener('pointerdown', handlePointerStart);
lockScreen.addEventListener('pointerup', (event) => handlePointerEnd(event, unlockIphone));
lockHomeBar.addEventListener('click', unlockIphone);
notificationOpenBtn.addEventListener('click', unlockIphone);
notificationOpenBtn.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') unlockIphone();
});

document.querySelectorAll('.app-icon').forEach((icon) => {
    icon.addEventListener('click', () => {
        const appId = icon.dataset.app;
        const appName = icon.querySelector('.app-label')?.textContent || '앱';
        openApp(appId, appName);
    });
});

closeAppBtn.addEventListener('click', closeActiveApp);
appHomeBar.addEventListener('click', closeActiveApp);
appHomeBar.addEventListener('pointerdown', handlePointerStart);
appHomeBar.addEventListener('pointerup', (event) => handlePointerEnd(event, closeActiveApp));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeActiveApp();
});

updateWeddingCoverInfo();
