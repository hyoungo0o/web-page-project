    document.addEventListener("DOMContentLoaded", function() {
        // .h 클래스를 가진 div 요소 선택
        const container = document.querySelector('.h');

        // 60개의 .c 클래스를 가진 div 생성
        for (let i = 0; i < 60; i++) {
            const newDiv = document.createElement('div');
            newDiv.className = 'c';
            container.appendChild(newDiv);
        }

        // 생성된 .c 요소들에 대해 애니메이션 속도 조정
        const elements = document.querySelectorAll('.h .c');
        elements.forEach((element, index) => {
            element.style.animationDuration = '1s'; // 초기 속도 설정
            setTimeout(() => {
                element.style.animationDuration = '3s'; // 이후 기본 속도로 전환
            }, 1000); // 1초 후 원래 속도로 변경
        });
    });