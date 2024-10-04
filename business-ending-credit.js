    window.addEventListener('DOMContentLoaded', function() {
        var scrollingText = document.querySelector('.scrolling-text');
        var scrollingTextHeight = scrollingText.clientHeight;
        var containerHeight = scrollingText.parentElement.clientHeight;
        var animationDuration = scrollingTextHeight / containerHeight * 10;

        scrollingText.style.animationDuration = animationDuration + 's';
    });