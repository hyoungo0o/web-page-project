document.addEventListener('DOMContentLoaded', function() {
    // Year 애니메이션
    var typedYear = new Typed('#gradient-text', {
        strings: ["2015 - <br>2024"],
        typeSpeed: 50,
        startDelay: 500,
        showCursor: false,
        onComplete: function(self) {
            // 리스트 애니메이션
            var items = [
                "CLOUDGRAM 협력업체 등록",
                "IBM 파트너 협약",
                "아시아나IDT 파트너 협약",
                "INNO-BIZ 인증"
            ];

            items.forEach(function(item, index) {
                setTimeout(function() {
                    new Typed('.history-year-list li:nth-child(' + (index + 1) + ')', {
                        strings: [item],
                        typeSpeed: 50,
                        showCursor: false
                    });
                }, index * 1000); // 각 항목마다 지연 시간 적용
            });
        }
    });
});