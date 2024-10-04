$(document).ready(function() {
    // 드롭다운 버튼 클릭 이벤트 핸들러
    $("#hlsystem, #updates, #solutions").click(function(event) {
        event.stopPropagation(); // 이벤트 버블링 방지

        var dropdown = $(this).find(".mainDropDown");

        // 모든 드롭다운 숨기기
        $(".mainDropDown").not(dropdown).css({
            'opacity': 0,
            'visibility': 'hidden',
            'display': 'none'
        });

        // 클릭한 요소의 좌표를 가져옴
        var navLeft = $(this).offset().left;
        var navWidth = $(this).outerWidth();

        // 드롭다운 너비와 클릭한 요소의 너비를 고려하여 정확한 위치 계산
        var dropdownWidth = dropdown.outerWidth();
        var dropdownLeft = navLeft + (navWidth / 2) - (dropdownWidth / 2);

        // 드롭다운 위치 설정
        dropdown.css({
            'left': dropdownLeft + 'px',
            'transform': 'translateX(0%)', // 필요에 따라 조정
            'margin-top': '10px', // 필요한 만큼 조정
            'opacity': 1,
            'visibility': 'visible',
            'display': 'block'
        });
    });

    // 페이지의 다른 곳을 클릭할 때 모든 드롭다운 숨기기
    $(document).click(function () {
        $(".mainDropDown").css({
            'opacity': 0,
            'visibility': 'hidden',
            'display': 'none'
        });
    });

    // 드롭다운 내 클릭 시 이벤트 버블링 방지
    $(".mainDropDown").click(function (event) {
        event.stopPropagation();
    });

    // 드롭다운 내 <p> 태그 클릭 시 페이지 이동
    $(".mainDropDown p").click(function() {
        var url = $(this).data("url");
        if (url) {
            window.location.href = url;
        }
    });

    // 일반 li 클릭 시 페이지 이동
    $("#nav-1 li").click(function(event) {
        var link = $(this).find("a");
        if (link.length && !$(this).hasClass("dropdown")) {
            window.location.href = link.attr("href");
        }
    });
});
