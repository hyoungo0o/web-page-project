$(document).ready(function() {
  // 초기에 화살표를 아래로 설정
  $("#contact-nav-1 a .contact-nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");

  // 현재 페이지 경로에 따른 슬라이드 효과 적용
  var currentPath = window.location.pathname;

  // 초기화 함수
  function initializeSlide(menuItem) {
    if (menuItem) {
      var position = menuItem.position();
      var width = menuItem.width();
      $("#contact-nav-1 .slide1").css({ opacity: 1, left: position.left, width: width }).removeClass("squeeze");
      $("#contact-nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");
    } else {
      $("#contact-nav-1 .slide1").css({ opacity: 0 });
      $("#contact-nav-1 .slide2").css({ opacity: 0 });
    }
  }

  // 경로에 따른 메뉴 선택
  var initialMenuItem;
  if (currentPath.startsWith("/hlsystem/about")) {
    initialMenuItem = $("#hlsystem");
    initializeSlide(initialMenuItem);
    $("#hlsystem a .contact-nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
  }

  else if (currentPath === "/hlsystem/solutions") {
    initialMenuItem = $("#solutions");
    initializeSlide(initialMenuItem);
    $("#solutions a .contact-nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
  }

  else if (currentPath === "/hlsystem/business") {
    initialMenuItem = $("#contact-nav-1 a[href='/hlsystem/business']").parent();
    initializeSlide(initialMenuItem);
  }

  else if (currentPath === "/hlsystem/recruit") {
    initialMenuItem = $("#recruit");
    initializeSlide(initialMenuItem);
    $("#recruit a .contact-nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
  }
  var currentMenuItem = initialMenuItem;

  // 네비게이션 메뉴 클릭 시
  $("#contact-nav-1 a").on("click", function(e) {
    e.preventDefault(); // 기본 링크 이벤트 제거

    // 현재 클릭된 요소의 화살표를 위로 변경
    $(this).find(".contact-nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");

    // 나머지 메뉴 아이템의 화살표를 아래로 변경
    $("#contact-nav-1 a").not(this).find(".contact-nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");

    // slide1, slide2 초기화는 클릭한 요소만 처리
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#contact-nav-1 .slide1").css({ opacity: 1, left: position.left, width: width }).removeClass("squeeze");
    $("#contact-nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");

    // 현재 메뉴 아이템 업데이트
    currentMenuItem = $(this).parent();
  });

  // 네비게이션 메뉴 호버 시
  $("#contact-nav-1 a").on("mouseenter", function() {
    // 현재 호버된 요소의 슬라이드 효과 처리
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#contact-nav-1 .slide2").css({
      opacity: 1,
      left: position.left,
      width: width
    }).addClass("squeeze");
  }).on("mouseleave", function() {
    // 호버를 떠난 경우 슬라이드 효과 초기화
    $("#contact-nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");
  });

  // 다른 곳을 클릭했을 때
  $(document).on("click", function(event) {
    // 클릭된 요소가 #contact-nav-1 내부의 요소가 아니라면
    if (!$(event.target).closest("#contact-nav-1").length) {
      // 현재 페이지에 맞는 메뉴 아이템으로 슬라이드 되돌림
      initializeSlide(initialMenuItem);
      $("#contact-nav-1 a .contact-nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");
      if (initialMenuItem) {
        initialMenuItem.find(".contact-nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
      }
    }
  });
});
