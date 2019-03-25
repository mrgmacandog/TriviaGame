// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {

    // Run JS once the document is ready
    $(document).ready(function() {

        const startTime = 15;

        // Time left
        let timeLeft = startTime;

        let intervalId;

        // Start the game
        function start() {
            // Update what the display
            hide($("#start"));
            unhide($("#time"));
            unhide($("#question"));
            unhide($(".option"));
            unhide($("#reset"));

            // Set time interval to countd down every 1 second
            intervalId = setInterval(countDown, 1000);
            
            // Reset after 15 seconds
            //setTimeout(reset, 15000);
        }

        function countDown() {
            if (timeLeft > 0) {
                // Decrease one second
                timeLeft -= 1;

                // Update the time remaining on the web page
                if (timeLeft === 1) {  // Change "Seconds" to "Second" for 1 secsond remaining
                    $("#seconds").text(timeLeft + " Second");
                } else {
                    $("#seconds").text(timeLeft + " Seconds");
                }

                console.log(timeLeft);
            } else {
                // Clear the interval once the time remaining is 0
                clearInterval(intervalId);
                alert("time's up");
            }
        }

        // Reset the game
        function reset() {
            unhide($("#start"));
            hide($("#time"));
            hide($("#question"));
            hide($(".option"));
            hide($("#reset"));

            // Reset the time to 15 seconds
            timeLeft = startTime;
        }

        // Hide jQuery element(s)
        function hide(el) {
            el.addClass("hidden");
        }

        // Unhide jQuery element(s)
        function unhide(el) {
            el.removeClass("hidden");
        }

        // Start the game when the start button is clicked
        $("#start").on("click", start);

        // Reset the game when the reset button is clicked
        $("#reset").on("click", reset);
    });
})();