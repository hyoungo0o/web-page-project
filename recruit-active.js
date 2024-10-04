// JavaScript로 현재 탭에 active 클래스 추가
document.addEventListener('DOMContentLoaded', function() {
    var recruitTabs = document.querySelectorAll('.recruit-wrap-tap');

    recruitTabs.forEach(function(recruitTab) {
        recruitTab.addEventListener('click', function() {
            // 모든 탭에서 active 클래스 제거
            recruitTabs.forEach(function(item) {
                item.classList.remove('active');
            });

            // 클릭된 탭에 active 클래스 추가
            recruitTab.classList.add('active');
        });
    });
});
