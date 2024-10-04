    window.addEventListener('scroll', function() {
        var button = document.querySelector('.top-button');
        var scrollPosition = window.scrollY;
        var threshold = 250; // 스크롤 위치 임계값 (100px)

        // 스크롤 위치가 threshold 이상이면 버튼 보이기
        if (scrollPosition > threshold) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });