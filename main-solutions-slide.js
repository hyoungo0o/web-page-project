    const slides = document.querySelectorAll('.slider .sliders > .slide');
    const dots = document.querySelectorAll('.main-slideDot .dot');
    const slideLength = slides.length;
    let imgNum = 0;
    let intervalId;

    function changeSlide(num) {
        slides.forEach(function(slide, index) {
            slide.classList.remove('prev', 'next', 'current');
            dots[index].classList.remove('active');
            if (index === num) {
                slide.classList.add('current');
                dots[index].classList.add('active');
            } else if (index === (num - 1 + slideLength) % slideLength) {
                slide.classList.add('prev');
            } else if (index === (num + 1) % slideLength) {
                slide.classList.add('next');
            }
        });

        const curImg = slides[num];
        const sliders = document.querySelector('.slider .sliders');
        sliders.style.height = curImg.offsetHeight + 'px';
    }

    function autoChangeSlide() {
        imgNum = (imgNum + 1) % slideLength;
        changeSlide(imgNum);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            imgNum = index;
            clearInterval(intervalId); // Clear the interval on manual interaction
            changeSlide(imgNum);
            intervalId = setInterval(autoChangeSlide, 5000); // Restart interval after manual interaction
        });
    });

    window.onload = function() {
        changeSlide(0);
        intervalId = setInterval(autoChangeSlide, 5000); // Start automatic slide change
    };
