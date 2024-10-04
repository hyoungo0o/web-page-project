$(document).ready(function() {
  // 초기에 화살표를 아래로 설정
  $("#nav-1 a .nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");

  // 현재 페이지 경로에 따른 슬라이드 효과 적용
  var currentPath = window.location.pathname;

  // 초기화 함수
  function initializeSlide(menuItem) {
    if (menuItem) {
      var position = menuItem.position();
      var width = menuItem.width();
      $("#nav-1 .slide1").css({ opacity: 1, left: position.left, width: width }).removeClass("squeeze");
      $("#nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");
    } else {
      $("#nav-1 .slide1").css({ opacity: 0 });
      $("#nav-1 .slide2").css({ opacity: 0 });
    }
  }

  // 경로에 따른 메뉴 선택
  var initialMenuItem;
  if (currentPath === "/hlsystem") {
    // 메인 페이지의 경우 초기 메뉴 아이템 설정을 하지 않음
    initialMenuItem = null;
  } else if (currentPath.startsWith("/hlsystem/about")) {
    initialMenuItem = $("#hlsystem");
    $("#hlsystem a .nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
    $("#hlsystem .mainDropDown").show();  // 해당 드롭다운을 표시
  } else if (currentPath.startsWith("/hlsystem/solutions")) {
    initialMenuItem = $("#solutions");
    $("#solutions a .nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
    $("#solutions .mainDropDown").show();  // 해당 드롭다운을 표시
  } else if (currentPath === "/hlsystem/business") {
    initialMenuItem = $("#nav-1 a[href='/hlsystem/business']").parent();
  } else if (currentPath.startsWith("/hlsystem/updates")) {
    initialMenuItem = $("#updates");
    $("#updates a .nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
    $("#updates .mainDropDown").show();  // 해당 드롭다운을 표시
  } else if (currentPath === "/hlsystem/recruit") {
    initialMenuItem = $("#nav-1 a[href='/hlsystem/recruit']").parent();
  }

  // 초기화 함수 호출
  initializeSlide(initialMenuItem);

  var currentMenuItem = initialMenuItem;

  // 네비게이션 메뉴 클릭 시
  $("#nav-1 a").on("click", function(e) {
    e.preventDefault(); // 기본 링크 이벤트 제거

    // 현재 클릭된 요소의 화살표를 위로 변경
    $(this).find(".nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");

    // 나머지 메뉴 아이템의 화살표를 아래로 변경
    $("#nav-1 a").not(this).find(".nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");

    // slide1, slide2 초기화는 클릭한 요소만 처리
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav-1 .slide1").css({ opacity: 1, left: position.left, width: width }).removeClass("squeeze");
    $("#nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");

    // 드롭다운 메뉴 토글
    var dropdown = $(this).siblings(".mainDropDown");
    if (dropdown.is(":visible")) {
      dropdown.hide();
    } else {
      $(".mainDropDown").hide();  // 모든 드롭다운을 숨김
      dropdown.show();  // 해당 드롭다운을 표시
    }

    // 현재 메뉴 아이템 업데이트
    currentMenuItem = $(this).parent();
  });

  // 네비게이션 메뉴 호버 시
  $("#nav-1 a").on("mouseenter", function() {
    // 현재 호버된 요소의 슬라이드 효과 처리
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav-1 .slide2").css({
      opacity: 1,
      left: position.left,
      width: width
    }).addClass("squeeze");
  }).on("mouseleave", function() {
    // 호버를 떠난 경우 슬라이드 효과 초기화
    $("#nav-1 .slide2").css({ opacity: 0 }).removeClass("squeeze");
  });

  // 다른 곳을 클릭했을 때
  $(document).on("click", function(event) {
    // 클릭된 요소가 #nav-1 내부의 요소가 아니라면
    if (!$(event.target).closest("#nav-1").length) {
      // 현재 페이지에 맞는 메뉴 아이템으로 슬라이드 되돌림
      initializeSlide(initialMenuItem);
      $("#nav-1 a .nav-arrow").removeClass("fa-caret-up").addClass("fa-caret-down");
      if (initialMenuItem) {
        initialMenuItem.find(".nav-arrow").removeClass("fa-caret-down").addClass("fa-caret-up");
      }
      // 모든 드롭다운을 숨김
      $(".mainDropDown").hide();
    }
  });

  // 드롭다운 내 클릭 시 이벤트 버블링 방지
  $(".mainDropDown").on("click", function(event) {
    event.stopPropagation();
  });
});
