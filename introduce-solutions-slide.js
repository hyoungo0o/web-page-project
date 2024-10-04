// 페이지 로드 시 초기 슬라이드 설정 및 자동 슬라이드 변경 시작
window.onload = function() {
    // 슬라이드와 도트 요소를 선택합니다.
    const slides = document.querySelectorAll('.introduce-sol-slider .introduce-sol-sliders .introduce-sol-slide');
    const dots = document.querySelectorAll('.introduce-sol-slideDot .dot');
    const totalSlides = slides.length; // 슬라이드 길이 설정
    let currentIndex = 0; // 현재 슬라이드 번호
    let slideIntervalId; // 자동 슬라이드 변경 인터벌 ID

// 슬라이드 변경 함수
function updateSlide(index) {
    if (slides.length === 0) return; // 슬라이드가 없으면 종료

    slides.forEach((slide, idx) => {
        slide.classList.remove('prev', 'next', 'current');
        if (dots[idx]) {
            dots[idx].classList.remove('active'); // 도트의 클래스 제거
            dots[idx].classList.remove('animating'); // 모든 도트에서 애니메이션 제거
        }
        if (idx === index) {
            slide.classList.add('current');
            if (dots[idx]) {
                dots[idx].classList.add('active'); // 현재 슬라이드에 해당하는 도트 활성화
                dots[idx].classList.add('animating'); // 활성화된 도트에만 애니메이션 추가
            }
        } else if (idx === (index - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
        } else if (idx === (index + 1) % totalSlides) {
            slide.classList.add('next');
        }
    });

    const currentSlide = slides[index];
    if (currentSlide) { // currentSlide가 유효한 경우에만 높이 조정
        const slidersContainer = document.querySelector('.introduce-sol-slider .introduce-sol-sliders');
        slidersContainer.style.height = currentSlide.offsetHeight + 'px';
    }
}


    // 자동 슬라이드 변경 함수
    function autoSlideChange() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide(currentIndex);
    }

    // 도트 클릭 시 슬라이드 변경
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            clearInterval(slideIntervalId); // 자동 슬라이드 변경 중지
            updateSlide(currentIndex);
            slideIntervalId = setInterval(autoSlideChange, 4000); // 자동 슬라이드 변경 재시작
        });
    });

    if (slides.length > 0) {
        updateSlide(0);
        slideIntervalId = setInterval(autoSlideChange, 4000); // 자동 슬라이드 변경 시작
    }
};
