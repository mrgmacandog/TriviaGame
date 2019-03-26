// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {

    // Run JS once the document is ready
    $(document).ready(function() {

        // How long each question lasts
        const START_TIME = 5;

        // Initialize array of TriviaQuestion objects
        let questions;

        // TriviaQuestion constructor
        //     Takes in a question and 4 options
        function TriviaQuestion(question, options) {
            this.question = question;
            this.options = options;
        }

        // Time left
        let timeLeft;

        let intervalId;

        // Populate questions array with TriviaQueestion objects
        function createQuestions() {
            questions = [
                new TriviaQuestion("What is the name of bar the gang frequently go to?",
                                   ["MacLaren's",
                                    "MacLoughlin's",
                                    "MacLure's",
                                    "MacMaster's"]),
                new TriviaQuestion("What color and instrument does Ted steal for Robin?",
                                   ["Blue French Horn",
                                    "Blue Trumpet",
                                    "Red French Horn",
                                    "Red Trumpet"]),
                new TriviaQuestion("Which acronym does Barney use to describe his job?",
                                   ["P.L.E.A.S.E.",
                                    "S.E.C.R.E.T.",
                                    "W.O.R.K.",
                                    "S.T.O.P."]),
                new TriviaQuestion("What is the first Robin Sparkles song the gang listens to?",
                                   ["Let's Go To The Mall",
                                    "Sandcastles in the Sand",
                                    "The Beaver Song",
                                    "P.S. I Love You"]),
                new TriviaQuestion("What are the names of Ted's children?",
                                   ["Luke & Penny",
                                    "Adam & Sara",
                                    "David & Jenna",
                                    "Jerry & Emily"]),
                new TriviaQuestion("What do Barney and Ted want to name their bar if they had one?",
                                   ["Puzzles",
                                    "Clues",
                                    "Questions",
                                    "Kisses"]),
                new TriviaQuestion("What year is it when Ted is telling his children how he met their mother?",
                                   ["2030",
                                    "2015",
                                    "2020",
                                    "2025"]),
                new TriviaQuestion("At what occasion does Ted find a goat in his apartment?",
                                   ["His 31th birthday",
                                    "His 30st birthday",
                                    "New Year's Day",
                                    "Halloween"]),
                new TriviaQuestion("Who narrates the show?",
                                   ["Bob Saget",
                                    "Jason Segel",
                                    "Josh Radnor",
                                    "Neil Patrick Harris"]),
                new TriviaQuestion("How many seasons were there?",
                                   ["9",
                                    "7",
                                    "8",
                                    "10"]),
            ]
        }

        // Start the game
        function start() {
            // Get random question
            getNewQuestion();

            // Reset time
            timeLeft = START_TIME;

            // Update what the display shows
            hide($("#start"));
            unhide($("#time"));
            unhide($("#question"));
            unhide($(".option"));
            unhide($("#reset"));

            // Set time interval to countd down every 1 second
            intervalId = setInterval(countDown, 1000);
            
            // Get new question after 15 seconds
            // setTimeout(getNewQuestion, 15000);
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

                // Get random question
                start();
            }
        }

        function getNewQuestion() {
            // Get random question
            let randomQuestion = questions[Math.floor(Math.random() * questions.length)];

            // Update display
            $("#seconds").text(START_TIME + " Seconds");
            $("#question").text(randomQuestion.question);
            for (let i = 0; i < 4; i++) {
                // Get random option from the question's options
                let option = randomQuestion.options[Math.floor(Math.random() * randomQuestion.options.length)];
                
                // Remove the option from the question's options
                randomQuestion.options.splice(randomQuestion.options.indexOf(option), 1);

                // Set the option text to be the rand option
                $("#option" + (i + 1)).text(option);
            }



            // Remove the question for the array of questions
            questions.splice(questions.indexOf(randomQuestion), 1);

            console.log(questions);
        }

        // Reset the game
        function reset() {
            clearInterval(intervalId);

            unhide($("#start"));
            hide($("#time"));
            hide($("#question"));
            hide($(".option"));
            hide($("#reset"));

            // Reset the time to 15 seconds
            timeLeft = START_TIME;
        }

        // Hide jQuery element(s)
        function hide(el) {
            el.addClass("hidden");
        }

        // Unhide jQuery element(s)
        function unhide(el) {
            el.removeClass("hidden");
        }

        // Create TriviaQuestion objects
        createQuestions();

        // Start the game when the start button is clicked
        $("#start").on("click", start);

        // Reset the game when the reset button is clicked
        $("#reset").on("click", reset);
    });
})();