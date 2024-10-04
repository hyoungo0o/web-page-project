    document.addEventListener("DOMContentLoaded", function() {
        const moveUrls = document.querySelectorAll(".move-url");
        const intervalTime = 3000; // 3초

        let currentIndex = 0;
        let lastTimestamp = performance.now();

        function showNextImage() {
            const previousIndex = currentIndex;
            currentIndex = (currentIndex + 1) % moveUrls.length;

            // 비활성화 처리
            moveUrls[previousIndex].classList.remove("active");
            moveUrls[previousIndex].querySelector('.main-img').style.opacity = '0';
            moveUrls[previousIndex].querySelector('.main-img').style.transform = 'scale(1.4)';
            moveUrls[previousIndex].querySelector('.main-img').style.display = 'none';
            moveUrls[previousIndex].querySelector('.animation-title').classList.remove("active");
            moveUrls[previousIndex].querySelector('.animation-content').classList.remove("active");

            // 활성화 처리
            moveUrls[currentIndex].classList.add("active");
            moveUrls[currentIndex].querySelector('.main-img').style.display = 'block';

            // 새로운 이미지의 확대 애니메이션 설정
            setTimeout(() => {
                moveUrls[currentIndex].querySelector('.main-img').style.opacity = '1';
                moveUrls[currentIndex].querySelector('.main-img').style.transform = 'scale(1.0)';
            }, 300); // 약간의 지연을 주어 애니메이션 적용

            // 타이틀과 컨텐츠 활성화 처리
            setTimeout(() => {
                moveUrls[currentIndex].querySelector('.animation-title').classList.add("active");
                moveUrls[currentIndex].querySelector('.animation-content').classList.add("active");
            }, 300); // 필요에 따라 지연 시간 조정 (여기서는 300밀리초)
        }

        function animate(timestamp) {
            if (timestamp - lastTimestamp >= intervalTime) {
                showNextImage();
                lastTimestamp = timestamp;
            }
            requestAnimationFrame(animate);
        }

        // 초기 설정
        moveUrls.forEach((moveUrl, index) => {
            if (index === 0) {
                moveUrl.classList.add("active");
                moveUrl.querySelector('.main-img').style.display = 'block';

                // 초기 확대 애니메이션 설정
                moveUrl.querySelector('.main-img').style.opacity = '0';
                moveUrl.querySelector('.main-img').style.transform = 'scale(1.4)';

                moveUrl.querySelector('.animation-title').classList.add("active");
                moveUrl.querySelector('.animation-content').classList.add("active");

                setTimeout(() => {
                    moveUrl.querySelector('.main-img').style.opacity = '1';
                    moveUrl.querySelector('.main-img').style.transform = 'scale(1.0)';
                }, 50); // 약간의 지연을 주어 애니메이션 적용
            } else {
                moveUrl.querySelector('.main-img').style.display = 'none';
                moveUrl.querySelector('.main-img').style.opacity = '0';
                moveUrl.querySelector('.main-img').style.transform = 'scale(1.4)';
            }
        });

        // 이미지 변경 애니메이션 시작
        requestAnimationFrame(animate);
    });