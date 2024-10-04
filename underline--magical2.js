const element2 = document.querySelector('.underline--magical2');

// 자동으로 배경 크기를 변경하는 함수
const toggleBackgroundSize2 = () => {
    let isExpanded = false;
    let interval = 500; // 초기 간격은 2초

    const changeBackgroundSize2 = () => {
        if (isExpanded) {
            element2.style.backgroundSize = '28% 0.1em';
        } else {
            element2.style.backgroundSize = '100% 80%';
        }
        isExpanded = !isExpanded;
    };

    changeBackgroundSize2(); // 처음 한 번 실행

    setTimeout(() => {
        interval = 4000; // 2초 후에 간격을 4초로 변경
        setInterval(changeBackgroundSize2, interval);
    }, 1250); // 2초 후에 4초 간격으로 변경
};

// 자동 변경 함수 호출
toggleBackgroundSize2();