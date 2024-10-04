document.addEventListener('DOMContentLoaded', function() {
    const text = ": 디지털 혁신을 주도하다.";
    const typingElement = document.getElementById("changing-ending-sub-typing");
    const cursorElement = document.getElementById("changing-ending-sub-cursor");
    typingElement.innerHTML = ""; // 기존 텍스트 초기화

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 120);  // 글자 타이핑 속도 조절 (0.15초 간격)
        }
//        else {
//            cursorElement.style.display = "none"; // 타이핑 완료 후 커서 제거
//        }
    }

    // 8.6초 지연 후 타이핑 시작
    setTimeout(function() {
        typeWriter();
    }, 10500);
});

