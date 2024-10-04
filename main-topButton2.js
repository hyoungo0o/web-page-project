    // TOP 버튼을 클릭했을 때 동작하는 함수
    document.querySelector('.top-button').addEventListener('click', function(e) {
        e.preventDefault(); // 기본 동작(링크 이동) 방지

        // 페이지 상단으로 스크롤 부드럽게 이동
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });