document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.history-item');

    function handleScroll() {
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const viewportHeight = window.innerHeight;

            if (itemCenter >= viewportHeight / 3 && itemCenter <= viewportHeight * 2 / 3) {
                item.style.background = '#D2A3A2';
            } else {
                item.style.background = 'linear-gradient(to bottom right, #ffffff, #ffffff, #ffffff)';
            }
        });
    }

    let requestId;

    function loop() {
        handleScroll();
        requestId = requestAnimationFrame(loop);
    }

    // 초기 상태에서 요소의 위치를 확인하여 배경색 설정
    handleScroll();

    // 스크롤 이벤트 리스너 대신 requestAnimationFrame을 사용하여 부드러운 스크롤 처리
    requestId = requestAnimationFrame(loop);

    // 페이지를 떠날 때 requestAnimationFrame 정리
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(requestId);
    });

    // 페이지가 완전히 로드된 후 애니메이션 시작
    window.addEventListener('load', () => {
        requestId = requestAnimationFrame(loop);
        handleScroll(); // 페이지 로드 시 배경색 설정
    });

    // popstate 이벤트가 발생했을 때 애니메이션을 다시 시작
    window.addEventListener('popstate', () => {
        requestId = requestAnimationFrame(loop);
        handleScroll(); // popstate 이벤트 시 배경색 설정
    });
});

// 캐시 방지
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        location.reload();
    }
});
