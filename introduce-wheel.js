$(document).ready(function() {
    var div = 0; // 초기 활성화할 섹션의 인덱스
    var isScrolling = false; // 스크롤 중인지 여부를 확인하기 위한 변수
    var divs = $('.introduce-wheel, .contact-bottom-last-container, .contact-bottom-info-container, .main-bottom-container').toArray(); // 스크롤할 섹션들
    var swiperContainer = '.swiper'; // Swiper 컨테이너 선택자

    // Swiper 초기화
/*
inspiration
https://dribbble.com/shots/4684682-Aquatic-Animals
*/

var swiper = new Swiper('.swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true, // 현재 슬라이드를 중앙에 위치시킵니다.
  spaceBetween: 50, // 슬라이드 간의 간격을 조절합니다.
  speed: 600,
  slideToClickedSlide: true,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 'auto' // 슬라이드의 개수를 자동으로 조정합니다.
    },
    768: {
      slidesPerView: 'auto'
    },
    1024: {
      slidesPerView: 'auto'
    },
    1560: {
      slidesPerView: 'auto'
    }
  }
});

    // 페이지 스크롤 이벤트 처리
$(window).on('wheel', function(e) {
    if (isScrolling) return; // 스크롤 중일 때는 무시

    // Swiper 컨테이너 내에서 스크롤 이벤트가 발생하면 Swiper에서 처리하도록 함
    if ($(e.target).closest(swiperContainer).length > 0) {
        return; // Swiper 컨테이너 내에서는 이벤트 전파를 막지 않음
    }

    var delta = e.originalEvent.deltaY || e.originalEvent.wheelDelta;

    // 현재 섹션 인덱스 업데이트
    updateDivIndex();

    // 스크롤이 맨 아래 또는 맨 위에 있을 때 동작 제어
    if (delta < 0 && div > 0) {
        div -= 1; // 스크롤 업
    } else if (delta > 0 && div < divs.length - 1) {
        div += 1; // 스크롤 다운
    } else {
        return; // 맨 위 또는 맨 아래에 도달했을 때 더 이상 이동하지 않음
    }

    isScrolling = true;
    scrollToDiv(div, true); // 애니메이션을 포함한 스크롤 이동
});


    // 스크롤 함수 (100vh 단위로 이동)
    function scrollToDiv(index, animate) {
        if (animate) {
            $('html, body').stop().animate({
                scrollTop: $(divs[index]).offset().top
            }, 1000, function() {
                isScrolling = false; // 애니메이션 완료 후 스크롤 상태 해제
            });
        } else {
            $('html, body').scrollTop($(divs[index]).offset().top);
            isScrolling = false;
        }

        // 점 활성화 처리
        $('.introduce-dot').removeClass('active');
        $('.introduce-dot[data-index="' + index + '"]').addClass('active');
    }

    // 점 클릭 이벤트 처리
    $('.introduce-dot').on('click', function() {
        var index = $(this).data('index');
        if (index !== div && !isScrolling) {
            div = index; // 클릭한 점의 인덱스를 현재 활성화된 섹션으로 설정
            scrollToDiv(div, true);
        }
    });

    // 현재 섹션 인덱스 업데이트 함수
    function updateDivIndex() {
        var scrollTop = $(window).scrollTop();
        var closestIndex = div;

        // 현재 스크롤 위치에 맞는 섹션의 인덱스를 찾아 업데이트
        for (var i = 0; i < divs.length; i++) {
            var offsetTop = $(divs[i]).offset().top;

            // 가장 가까운 섹션의 인덱스를 찾음
            if (Math.abs(scrollTop - offsetTop) < Math.abs(scrollTop - $(divs[closestIndex]).offset().top)) {
                closestIndex = i;
            }
        }

        div = closestIndex; // 가장 가까운 섹션의 인덱스를 설정
    }

    // 수동 스크롤 이벤트 처리
    $(window).on('scroll', function() {
        if (!isScrolling) {
            updateDivIndex(); // 스크롤 위치에 따른 섹션 인덱스 업데이트
        }
    });

    // 페이지 로드 시 초기 스크롤 위치에 따른 애니메이션 처리
    $(window).on('load', function() {
        setTimeout(function() {
            scrollToDiv(div, false); // 페이지 로드 후 초기 위치로 이동
        }, 100); // 페이지 로드 후 애니메이션 적용을 위한 지연
    });

    // 윈도우 리사이즈 이벤트 처리
    $(window).resize(function() {
        $('html, body').scrollTop($(divs[div]).offset().top);
    });
});
