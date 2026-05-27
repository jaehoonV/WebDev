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
        <article class="content-card map-card">
            <div id="weddingMap" class="wedding-map"></div>
        </article>
        <div class="ios-list">
            <button type="button" class="list-row" data-copy="${weddingInfo.address}"><span>주소 복사</span><b>›</b></button>
            <a class="list-row" href="https://map.kakao.com/link/search/${encodeURIComponent(weddingInfo.venue)}" target="_blank" rel="noopener"><span>카카오맵으로 보기</span><b>›</b></a>
            <a class="list-row" href="https://map.naver.com/p/search/${encodeURIComponent(weddingInfo.venue)}" target="_blank" rel="noopener"><span>네이버지도로 보기</span><b>›</b></a>
        </div>`,
    gallery: `
        <article class="content-card hero-card">
            <span class="section-kicker">Gallery</span>
            <h2>갤러리</h2>
            <p class="muted">사진</p>
        </article>
        <div class="gallery-grid">
            <div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div><div class="photo-tile">PHOTO</div>
        </div>`,
    mail: `
        <article class="content-card hero-card">
            <span class="section-kicker"></span>
            <h2>마음 전하실 곳</h2>
            <p class="muted">참석이 어려우신 분들을 위해 계좌 정보를 남겨드립니다.</p>
        </article>
        <div class="ios-list">
            <button type="button" class="list-row" data-copy="국민은행 639602-04-111645 이재훈"><span><small>신랑측</small> 국민은행 639602-04-111645 이재훈</span><b>복사</b></button>
            <button type="button" class="list-row" data-copy="우리은행 1002-861-211410 주희은"><span><small>신부측</small> 우리은행 1002-861-211410 주희은</span><b>복사</b></button>
        </div>`,
    schedule: `
        <article class="content-card hero-card">
            <span class="section-kicker">Schedule</span>
            <h2>예식 일정</h2>
            <p><strong>2026년 12월 19일 토요일 오후 5시</strong></p>
            <p class="muted">${weddingInfo.venue}</p>
        </article>
        <article class="content-card hero-card" style="padding: 0;">
            <div class="venue-img"></div>
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
let notificationTimer = null;
let notificationSoundPlayed = false;

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

    clearTimeout(notificationTimer);

    isUnlocked = true;

    requestAnimationFrame(() => {
        homeScreen.classList.add('unlocked-home');
        lockScreen.classList.add('unlocked-lock');
    });

    setTimeout(() => {
        lockScreen.setAttribute('aria-hidden', 'true');
        lockScreen.style.display = 'none';
    }, 760);
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
    if (appId === 'map') {
        renderWeddingMap();
    }
    
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

function renderWeddingMap() {
    const mapContainer = document.getElementById('weddingMap');

    if (!mapContainer || !window.kakao || !kakao.maps) {
        return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(weddingInfo.address, function(result, status) {
        if (status !== kakao.maps.services.Status.OK || !result[0]) {
            mapContainer.innerHTML = '<p class="map-error">지도를 불러오지 못했습니다.</p>';
            return;
        }

        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const map = new kakao.maps.Map(mapContainer, {
            center: coords,
            level: 3
        });

        const marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        const infoWindow = new kakao.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <strong>${weddingInfo.venue}</strong>
                    <span>${weddingInfo.address}</span>
                </div>
            `
        });

        infoWindow.open(map, marker);

        setTimeout(() => {
            map.relayout();
            map.setCenter(coords);
        }, 100);
    });
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

function playNotificationSound() {
    if (notificationSoundPlayed) return;
    notificationSoundPlayed = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    try {
        const audioContext = new AudioContext();

        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {});
        }

        const now = audioContext.currentTime;

        [880, 1174].forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const startTime = now + index * 0.13;

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, startTime);

            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.16, startTime + 0.018);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.18);
        });

        setTimeout(() => audioContext.close().catch(() => {}), 700);
    } catch (error) {
        // 모바일 브라우저 자동 재생 정책에 막히면 알림 카드만 표시
    }
}

function showInitialNotification() {
    if (!notificationOpenBtn || isUnlocked) return;

    notificationOpenBtn.classList.add('show');
    playNotificationSound();
}

function scheduleInitialNotification() {
    if (!notificationOpenBtn) return;

    notificationTimer = setTimeout(showInitialNotification, 1500);
}

updateWeddingCoverInfo();
scheduleInitialNotification();