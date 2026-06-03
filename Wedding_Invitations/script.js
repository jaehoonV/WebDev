const CHEVRON = `<svg style="margin-left: auto;" class="list-chevron" viewBox="0 0 16 16" aria-hidden="true"><polyline points="6,3 11,8 6,13"/></svg>`;

const weddingInfo = {
    groom: '재훈',
    bride: '희은',
    weddingDate: '2026-12-19T17:00:00+09:00',
    venue: '루이비스 컨벤션 강서점',
    address: '서울특별시 강서구 양천로 476 7층, 8층'
};

const galleryImages = [
    { src: 'img/gallery/gallery1.jpg', alt: '웨딩 사진 1' },
    { src: 'img/gallery/gallery2.jpg', alt: '웨딩 사진 2' },
    { src: 'img/gallery/gallery3.jpg', alt: '웨딩 사진 3' },
    { src: 'img/gallery/gallery4.jpg', alt: '웨딩 사진 4' },
    { src: 'img/gallery/gallery5.jpg', alt: '웨딩 사진 5' },
    { src: 'img/gallery/gallery6.jpg', alt: '웨딩 사진 6' }
];

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
            <button type="button" class="list-row" data-copy="${weddingInfo.address}"><span>주소 복사</span>${CHEVRON}</button>
            <a class="list-row" style="justify-content: normal;" href="https://map.kakao.com/link/search/${encodeURIComponent(weddingInfo.venue)}" target="_blank" rel="noopener"><img src="img/kakao_icon.png" alt="카카오맵 아이콘" style="width: 30px;"><span>카카오맵으로 보기</span>${CHEVRON}</a>            <a class="list-row" style="justify-content: normal;" href="https://map.naver.com/p/search/${encodeURIComponent(weddingInfo.venue)}" target="_blank" rel="noopener"><img src="img/navermap_icon_2.png" alt="네이버지도 아이콘" style="width: 30px;"><span>네이버지도로 보기</span>${CHEVRON}</a>
            <a class="list-row" style="justify-content: normal;" href="https://maps.app.goo.gl/g6hqGHi88NvpFDeK9" target="_blank" rel="noopener"><img src="img/googlemap_icon.png" alt="구글지도 아이콘" style="width: 30px;"><span>구글지도로 보기</span>${CHEVRON}</a>
        </div>`,
    gallery: `
        <article class="content-card hero-card">
            <span class="section-kicker">Gallery</span>
            <h2>갤러리</h2>
            <p class="muted">사진</p>
        </article>
        <div class="gallery-grid">
             ${galleryImages.map((image, index) => `
                <button class="photo-tile" type="button" data-gallery-index="${index}" aria-label="${image.alt}">
                    <img src="${image.src}" alt="${image.alt}">
                </button>
            `).join('')}
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
        <article class="content-card schedule-calendar-card">
            <div class="schedule-cal-header">
                <span class="schedule-cal-year">2026</span>
                <span class="schedule-cal-month">12월</span>
            </div>
            <div class="schedule-cal-grid">
                <span class="cal-dow sun">일</span>
                <span class="cal-dow">월</span>
                <span class="cal-dow">화</span>
                <span class="cal-dow">수</span>
                <span class="cal-dow">목</span>
                <span class="cal-dow">금</span>
                <span class="cal-dow sat">토</span>

                <span class="cal-day empty"></span>
                <span class="cal-day empty"></span>
                <span class="cal-day">1</span>
                <span class="cal-day">2</span>
                <span class="cal-day">3</span>
                <span class="cal-day">4</span>
                <span class="cal-day sat">5</span>

                <span class="cal-day sun">6</span>
                <span class="cal-day">7</span>
                <span class="cal-day">8</span>
                <span class="cal-day">9</span>
                <span class="cal-day">10</span>
                <span class="cal-day">11</span>
                <span class="cal-day sat">12</span>

                <span class="cal-day sun">13</span>
                <span class="cal-day">14</span>
                <span class="cal-day">15</span>
                <span class="cal-day">16</span>
                <span class="cal-day">17</span>
                <span class="cal-day">18</span>
                <span class="cal-day sat wedding-day">19</span>

                <span class="cal-day sun">20</span>
                <span class="cal-day">21</span>
                <span class="cal-day">22</span>
                <span class="cal-day">23</span>
                <span class="cal-day">24</span>
                <span class="cal-day">25</span>
                <span class="cal-day sat">26</span>

                <span class="cal-day sun">27</span>
                <span class="cal-day">28</span>
                <span class="cal-day">29</span>
                <span class="cal-day">30</span>
                <span class="cal-day">31</span>
                <span class="cal-day empty"></span>
                <span class="cal-day empty"></span>
            </div>
            <div class="schedule-cal-badge">💒 결혼식 오후 5시</div>
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
            <button type="button" class="list-row" id="shareBtn"><span>공유하기</span>${CHEVRON}</button>
            <button type="button" class="list-row" data-copy="${location.href}"><span>링크 복사</span>${CHEVRON}</button>
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
const lockHomeGuide = $('.lock-home-guide');
const notificationOpenBtn = $('#notificationOpenBtn');
const appHomeBar = $('#appHomeBar');
const closeAppBtn = $('#closeAppBtn');
let notificationTimer = null;
let notificationSoundPlayed = false;
let appGesture = null;
let lockGesture = null;

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
    const widgetDday = $('#widgetDday');
    if (widgetDday) widgetDday.textContent = ddayText;
}

function unlockIphone() {
    if (isUnlocked) return;

    clearTimeout(notificationTimer);

    isUnlocked = true;
    lockGesture = null;

    lockScreen.classList.remove('gesture-dragging');
    lockScreen.style.transform = '';
    lockScreen.style.opacity = '';
    homeScreen.style.transform = '';
    homeScreen.style.filter = '';
    homeScreen.style.opacity = '';

    requestAnimationFrame(() => {
        homeScreen.classList.add('unlocked-home');
        lockScreen.classList.add('unlocked-lock');
    });

    setTimeout(() => {
        lockScreen.setAttribute('aria-hidden', 'true');
        lockScreen.style.display = 'none';
    }, 760);
}

function finishLockHomeGesture() {
    if (isUnlocked) return;

    clearTimeout(notificationTimer);
    isUnlocked = true;
    lockGesture = null;

    lockScreen.classList.remove('gesture-dragging');
    lockScreen.classList.add('unlocked-lock');
    homeScreen.classList.add('unlocked-home');

    lockScreen.style.transform = '';
    lockScreen.style.opacity = '';
    homeScreen.style.transform = '';
    homeScreen.style.filter = '';
    homeScreen.style.opacity = '';

    setTimeout(() => {
        lockScreen.setAttribute('aria-hidden', 'true');
        lockScreen.style.display = 'none';
    }, 760);
}

function resetLockHomeGesture() {
    lockScreen.classList.remove('gesture-dragging');
    lockScreen.style.transform = '';
    lockScreen.style.opacity = '';
    homeScreen.style.transform = '';
    homeScreen.style.filter = '';
    homeScreen.style.opacity = '';
    lockGesture = null;
}

function handleLockHomeGestureStart(event) {
    if (isUnlocked) return;

    lockGesture = {
        pointerId: event.pointerId,
        startY: event.clientY,
        lastY: event.clientY,
        startTime: performance.now(),
        dragging: false
    };

    lockHomeGuide.setPointerCapture?.(event.pointerId);
}

function handleLockHomeGestureMove(event) {
    if (!lockGesture || lockGesture.pointerId !== event.pointerId || isUnlocked) return;

    const dragDistance = Math.max(0, lockGesture.startY - event.clientY);
    if (dragDistance < 4) return;

    event.preventDefault();
    lockGesture.dragging = true;
    lockGesture.lastY = event.clientY;

    const progress = Math.min(dragDistance / 220, 1);
    const lockMoveY = -dragDistance;
    const lockOpacity = 1 - progress * 0.12;
    const homeScale = 1.05 - progress * 0.05;
    const homeBlur = 8 - progress * 8;

    lockScreen.classList.add('gesture-dragging');
    lockScreen.style.transform = `translate3d(0, ${lockMoveY}px, 0)`;
    lockScreen.style.opacity = lockOpacity;
    homeScreen.style.transform = `scale(${homeScale}) translateZ(0)`;
    homeScreen.style.filter = `blur(${homeBlur}px)`;
    homeScreen.style.opacity = 1;
}

function handleLockHomeGestureEnd(event) {
    if (!lockGesture || lockGesture.pointerId !== event.pointerId || isUnlocked) return;

    const dragDistance = Math.max(0, lockGesture.startY - event.clientY);
    const elapsed = Math.max(performance.now() - lockGesture.startTime, 1);
    const velocity = dragDistance / elapsed;
    const shouldUnlock = lockGesture.dragging && (dragDistance > 95 || velocity > 0.6);

    lockHomeGuide.releasePointerCapture?.(event.pointerId);

    if (shouldUnlock) {
        finishLockHomeGesture();
        return;
    }

    resetLockHomeGesture();
}

function handleLockHomeGestureCancel(event) {
    if (!lockGesture || lockGesture.pointerId !== event.pointerId) return;
    resetLockHomeGesture();
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
    appWindow.classList.remove('gesture-dragging', 'home-gesture-closing');
    appWindow.style.transform = '';
    appWindow.style.opacity = '';
    appWindow.setAttribute('aria-hidden', 'true');
}

function closeActiveAppWithGesture() {
    appWindow.classList.remove('gesture-dragging');
    appWindow.style.transform = '';
    appWindow.style.opacity = '';
    appWindow.classList.add('home-gesture-closing');
    appWindow.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
        appWindow.classList.remove('active', 'home-gesture-closing');
    }, 320);
}

function resetAppHomeGesture() {
    appWindow.classList.remove('gesture-dragging');
    appWindow.style.transform = '';
    appWindow.style.opacity = '';
    appGesture = null;
}

function handleAppHomeGestureStart(event) {
    if (!appWindow.classList.contains('active')) return;

    const rect = appWindow.getBoundingClientRect();
    const gestureAreaHeight = 120;

    if (event.clientY < rect.bottom - gestureAreaHeight) return;

    appGesture = {
        pointerId: event.pointerId,
        startY: event.clientY,
        lastY: event.clientY,
        startTime: performance.now(),
        dragging: false
    };

    appWindow.setPointerCapture?.(event.pointerId);
}

function handleAppHomeGestureMove(event) {
    if (!appGesture || appGesture.pointerId !== event.pointerId) return;

    const dragDistance = Math.max(0, appGesture.startY - event.clientY);
    if (dragDistance < 4) return;

    event.preventDefault();
    appGesture.dragging = true;
    appGesture.lastY = event.clientY;

    const progress = Math.min(dragDistance / 180, 1);
    const moveY = -dragDistance * 0.32;
    const scale = 1 - progress * 0.12;
    const opacity = 1 - progress * 0.28;

    appWindow.classList.add('gesture-dragging');
    appWindow.style.transform = `translate3d(0, ${moveY}px, 0) scale(${scale})`;
    appWindow.style.opacity = opacity;
}

function handleAppHomeGestureEnd(event) {
    if (!appGesture || appGesture.pointerId !== event.pointerId) return;

    const dragDistance = Math.max(0, appGesture.startY - event.clientY);
    const elapsed = Math.max(performance.now() - appGesture.startTime, 1);
    const velocity = dragDistance / elapsed;
    const shouldClose = appGesture.dragging && (dragDistance > 78 || velocity > 0.55);

    appWindow.releasePointerCapture?.(event.pointerId);

    if (shouldClose) {
        appGesture = null;
        closeActiveAppWithGesture();
        return;
    }

    resetAppHomeGesture();
}

function handleAppHomeGestureCancel(event) {
    if (!appGesture || appGesture.pointerId !== event.pointerId) return;
    resetAppHomeGesture();
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

function bindGalleryViewer() {
    appContent.querySelectorAll('[data-gallery-index]').forEach((button) => {
        button.addEventListener('click', () => {
            openGalleryViewer(Number(button.dataset.galleryIndex));
        });
    });
}

function openGalleryViewer(startIndex = 0) {
    let currentIndex = startIndex;

    const viewer = document.createElement('div');
    viewer.className = 'gallery-viewer';
    viewer.innerHTML = `
        <div class="gallery-viewer-stage">
            <div class="gallery-viewer-top">
                <button type="button" class="gallery-viewer-close" aria-label="갤러리 닫기">닫기</button>
                <span class="gallery-viewer-count"></span>
            </div>

            <div class="gallery-viewer-photo-area">
                <div class="gallery-viewer-track">
                    ${galleryImages.map((image) => `
                        <div class="gallery-viewer-slide">
                            <img src="${image.src}" alt="${image.alt}" draggable="false">
                        </div>
                    `).join('')}
                </div>

                <button type="button" class="gallery-viewer-nav prev" aria-label="이전 사진">‹</button>
                <button type="button" class="gallery-viewer-nav next" aria-label="다음 사진">›</button>
            </div>
        </div>
    `;

    appWindow.appendChild(viewer);

    const photoArea = viewer.querySelector('.gallery-viewer-photo-area');
    const track = viewer.querySelector('.gallery-viewer-track');
    const count = viewer.querySelector('.gallery-viewer-count');
    const closeBtn = viewer.querySelector('.gallery-viewer-close');
    const prevBtn = viewer.querySelector('.gallery-viewer-nav.prev');
    const nextBtn = viewer.querySelector('.gallery-viewer-nav.next');

    let viewerGesture = null;

    function updateViewer() {
        const viewerWidth = photoArea.offsetWidth;

        track.style.transform = `translate3d(${-currentIndex * viewerWidth}px, 0, 0)`;
        count.textContent = `${currentIndex + 1} / ${galleryImages.length}`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === galleryImages.length - 1;
    }

    function closeViewer() {
        viewer.classList.remove('active');
        setTimeout(() => viewer.remove(), 220);
    }

    function moveViewer(direction) {
        currentIndex = Math.min(
            Math.max(currentIndex + direction, 0),
            galleryImages.length - 1
        );
        updateViewer();
    }

    closeBtn.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
    });

    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        closeViewer();
    });

    prevBtn.addEventListener('pointerdown', (event) => event.stopPropagation());
    prevBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        moveViewer(-1);
    });

    nextBtn.addEventListener('pointerdown', (event) => event.stopPropagation());
    nextBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        moveViewer(1);
    });

    count.addEventListener('pointerdown', (event) => event.stopPropagation());

    photoArea.addEventListener('pointerdown', (event) => {
        if (event.target.closest('.gallery-viewer-nav')) return;

        viewerGesture = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            diffX: 0,
            dragging: false,
            locked: false
        };

        photoArea.setPointerCapture?.(event.pointerId);
    });

    photoArea.addEventListener('pointermove', (event) => {
        if (!viewerGesture || viewerGesture.pointerId !== event.pointerId) return;

        const diffX = event.clientX - viewerGesture.startX;
        const diffY = event.clientY - viewerGesture.startY;
        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);

        // 아직 방향 판단 전
        if (!viewerGesture.locked) {
            if (absX < 8 && absY < 8) return;

            // 세로 움직임이면 갤러리 슬라이드로 처리하지 않음
            if (absY > absX) {
                viewerGesture = null;
                track.classList.remove('dragging');
                return;
            }

            viewerGesture.locked = true;
            viewerGesture.dragging = true;
            track.classList.add('dragging');
        }

        event.preventDefault();

        viewerGesture.diffX = diffX;

        const viewerWidth = photoArea.offsetWidth;
        const baseX = -currentIndex * viewerWidth;

        let dragX = diffX;

        // 첫 번째 / 마지막 사진에서 저항감
        if (
            (currentIndex === 0 && diffX > 0) ||
            (currentIndex === galleryImages.length - 1 && diffX < 0)
        ) {
            dragX = diffX * 0.28;
        }

        track.style.transform = `translate3d(${baseX + dragX}px, 0, 0)`;
    }, { passive: false });

    photoArea.addEventListener('pointerup', (event) => {
        if (!viewerGesture || viewerGesture.pointerId !== event.pointerId) return;

        const diffX = viewerGesture.diffX;

        photoArea.releasePointerCapture?.(event.pointerId);
        track.classList.remove('dragging');

        const shouldMove = Math.abs(diffX) > 38;

        if (shouldMove) {
            moveViewer(diffX < 0 ? 1 : -1);
        } else {
            updateViewer();
        }

        viewerGesture = null;
    });

    photoArea.addEventListener('pointercancel', () => {
        track.classList.remove('dragging');
        updateViewer();
        viewerGesture = null;
    });

    requestAnimationFrame(() => {
        viewer.classList.add('active');
        updateViewer();
    });
}

function bindDynamicContentEvents(appId) {
    if (appId === 'map') {
        renderWeddingMap();
    }

    if (appId === 'gallery') {
        bindGalleryViewer();
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

lockHomeGuide.addEventListener('pointerdown', handleLockHomeGestureStart);
lockHomeGuide.addEventListener('pointermove', handleLockHomeGestureMove, { passive: false });
lockHomeGuide.addEventListener('pointerup', handleLockHomeGestureEnd);
lockHomeGuide.addEventListener('pointercancel', handleLockHomeGestureCancel);

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
appWindow.addEventListener('pointerdown', handleAppHomeGestureStart);
appWindow.addEventListener('pointermove', handleAppHomeGestureMove, { passive: false });
appWindow.addEventListener('pointerup', handleAppHomeGestureEnd);
appWindow.addEventListener('pointercancel', handleAppHomeGestureCancel);

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