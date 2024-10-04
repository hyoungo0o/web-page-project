    const progressBar = document.querySelector('.scroll-progress');

    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollProgress = (window.scrollY / documentHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    }

    window.addEventListener('scroll', updateProgressBar);