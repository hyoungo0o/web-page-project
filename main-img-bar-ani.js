    document.addEventListener('DOMContentLoaded', function() {
        // Select all the fill bars
        const space1Bars = document.querySelectorAll('.animation-bar.space1-bar .fill-bar');
        const space2Bars = document.querySelectorAll('.animation-bar.space2-bar .fill-bar');
        const outsourcingBars = document.querySelectorAll('.animation-bar.outsourcing-bar .fill-bar');

        const intervalTime = 9000; // Total cycle time set to 9 seconds
        const delayTime = 3000; // Delay space2-bar start by 3 seconds
        const delayTimeOutsourcing = 6000; // Delay outsourcing start by 6 seconds

        function startAnimation(space1Bar, space2Bar, outsourcingBar) {
            // Start space1-bar animation
            space1Bar.style.animation = 'none'; // Reset animation
            space1Bar.offsetHeight; // Trigger reflow to restart animation
            space1Bar.style.animation = 'fillBarColor1 3s linear';

            setTimeout(function() {
                // Start space2-bar animation
                space2Bar.style.animation = 'none'; // Reset animation
                space2Bar.offsetHeight; // Trigger reflow to restart animation
                space2Bar.style.animation = 'fillBarColor2 3s linear';
            }, delayTime); // Delay space2-bar start by 3 seconds

            setTimeout(function() {
                // Start outsourcing-bar animation
                outsourcingBar.style.animation = 'none'; // Reset animation
                outsourcingBar.offsetHeight; // Trigger reflow to restart animation
                outsourcingBar.style.animation = 'fillBarColor2 3s linear';
            }, delayTimeOutsourcing); // Delay outsourcing-bar start by 6 seconds
        }

        function runAnimation() {
            space1Bars.forEach((space1Bar, index) => {
                const space2Bar = space2Bars[index];
                const outsourcingBar = outsourcingBars[index];
                function animate() {
                    startAnimation(space1Bar, space2Bar, outsourcingBar);
                    setTimeout(() => {
                        requestAnimationFrame(animate);
                    }, intervalTime);
                }
                animate();
            });
        }

        runAnimation(); // Initial execution
    });