// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {

    // Run JS once the document is ready
    $(document).ready(function() {

        // Start the game
        function start() {
            hide($("#start"));
            unhide($("#time"));
            unhide($("#question"));
            unhide($(".option"));
            unhide($("#reset"));
        }

        // Reset the game
        function reset() {
            unhide($("#start"));
            hide($("#time"));
            hide($("#question"));
            hide($(".option"));
            hide($("#reset"));
        }

        // Hide jQuery element
        function hide(el) {
            el.addClass("hidden");
        }

        // Unhide jQuery element
        function unhide(el) {
            el.removeClass("hidden");
        }

        // Start the game when the start button is clicked
        $("#start").on("click", start);

        // Reset the game when the reset button is clicked
        $("#reset").on("click", reset);
    });
})();