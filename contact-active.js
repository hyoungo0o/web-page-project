// JavaScript로 현재 탭에 active 클래스 추가
document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.contact-wrap-tap');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 모든 탭에서 active 클래스 제거
            tabs.forEach(function(item) {
                item.classList.remove('active');
            });

            // 클릭된 탭에 active 클래스 추가
            tab.classList.add('active');
        });
    });
});
