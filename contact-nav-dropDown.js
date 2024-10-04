$(document).ready(function() {
    $("#hlsystem, #updates, #solutions, #recruit").click(function(event) {
        event.stopPropagation(); // 이벤트 버블링 방지

        var $dropdown = $(this).find(".contact-mainDropDown"); // 드롭다운 요소 참조

        // 모든 드롭다운 숨기기
        $(".contact-mainDropDown").not($dropdown).css({
            'opacity': 0,
            'visibility': 'hidden',
            'display': 'none'
        });

        // 클릭한 요소의 좌표를 가져옴
        var navLeft = $(this).offset().left;
        var navTop = $(this).offset().top;
        var navHeight = $(this).outerHeight();
        var navWidth = $(this).outerWidth();

        // 드롭다운 너비와 클릭한 요소의 너비를 고려하여 정확한 위치 계산
        var dropdownWidth = $dropdown.outerWidth();
        var dropdownLeft = navLeft + (navWidth / 2) - (dropdownWidth / 2);
        var dropdownTop = navTop + navHeight;

        // 드롭다운 위치 설정
        $dropdown.css({
            'left': dropdownLeft + 'px',
            'top': dropdownTop + 'px',
//            'margin-top': '10px',
            'opacity': 1,
            'visibility': 'visible',
            'display': 'block'
        });
    });

    // 페이지의 다른 곳을 클릭할 때 모든 드롭다운 숨기기
    $(document).click(function() {
        $(".contact-mainDropDown").css({
            'opacity': 0,
            'visibility': 'hidden',
            'display': 'none'
        });
    });

    // 드롭다운 내 클릭 시 이벤트 버블링 방지
    $(".contact-mainDropDown").click(function(event) {
        event.stopPropagation();
    });

    // 드롭다운 내 <p> 태그 클릭 시 페이지 이동
    $(".contact-mainDropDown p").click(function() {
        var url = $(this).data("url");
        if (url) {
            window.location.href = url;
        }
    });

    // 일반 li 클릭 시 페이지 이동
    $("#contact-nav-1 li").click(function(event) {
        var link = $(this).find("a");
        if (link.length && !$(this).hasClass("contact-mainDropDown")) {
            window.location.href = link.attr("href");
        }
    });
});
