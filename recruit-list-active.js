// JavaScript로 현재 탭에 active 클래스 추가
document.addEventListener('DOMContentLoaded', function() {
    var recruitListTabs = document.querySelectorAll('.recruit-list-wrap-tap');

    recruitListTabs.forEach(function(recruitListTab) {
        recruitListTab.addEventListener('click', function() {
            // 모든 탭에서 active 클래스 제거
            recruitListTabs.forEach(function(item) {
                item.classList.remove('active');
            });

            // 클릭된 탭에 active 클래스 추가
            recruitListTab.classList.add('active');
        });
    });
});
