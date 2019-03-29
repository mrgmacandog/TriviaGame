// Code is executed in strict mode
"use strict";

// Wrap all code in an anonymous function so functions cannot be called externally
(function() {

    // Run JS once the document is ready
    $(document).ready(function() {

        // How long each question lasts
        const START_TIME = 15;

        // Initialize array of TriviaQuestion objects
        let questions;

        // Initialize the current question being guessed
        let currentQuestion;

        // Initialize the button assoiciated with the correct answer
        let answerButton;

        // TriviaQuestion Object Constructor
        // Takes in a question, its answer, and an array of 4 options (including the answer)
        function TriviaQuestion(question, answer, options) {
            this.question = question;
            this.answer = answer;
            this.options = options;
        }

        // Initialize the counters for the outcome of each question
        let numCorrect = 0;
        let numIncorrect = 0;
        let numUnaswered = 0;

        // Time left to answer the question
        let timeLeft;

        // Initialize the variable for the interval object
        let intervalId;

        // Populate questions array with TriviaQuestion objects
        function createQuestions() {
            questions = [
                new TriviaQuestion("What is the name of bar the gang frequently visits?",
                                   "MacLaren's",
                                   ["MacLaren's",
                                    "MacLoughlin's",
                                    "MacLure's",
                                    "MacMaster's"]
                ),
                new TriviaQuestion("What color and instrument does Ted steal for Robin?",
                                   "Blue French Horn",
                                   ["Blue French Horn",
                                    "Blue Trumpet",
                                    "Red French Horn",
                                    "Red Trumpet"]
                ),
                new TriviaQuestion("Which acronym does Barney use to describe his job?",
                                   "P.L.E.A.S.E.",
                                   ["P.L.E.A.S.E.",
                                    "S.E.C.R.E.T.",
                                    "W.O.R.K.",
                                    "S.T.O.P."]
                ),
                new TriviaQuestion("What is the first Robin Sparkles song the gang listens to?",
                                   "Let's Go To The Mall",
                                   ["Let's Go To The Mall",
                                    "Sandcastles in the Sand",
                                    "The Beaver Song",
                                    "P.S. I Love You"]
                ),
                new TriviaQuestion("What are the names of Ted's children?",
                                   "Luke and Penny",
                                   ["Luke and Penny",
                                    "Adam and Sara",
                                    "David and Jenna",
                                    "Jerry and Emily"]
                ),
                new TriviaQuestion("If they owned a bar, what would Ted and Barney name it?",
                                   "Puzzles",
                                   ["Puzzles",
                                    "Clues",
                                    "Questions",
                                    "Kisses"]
                ),
                new TriviaQuestion("What year is it when Ted is telling his children how he met their mother?",
                                   "2030",
                                   ["2030",
                                    "2015",
                                    "2020",
                                    "2025"]
                ),
                new TriviaQuestion("At what occasion does Ted find a goat in his apartment?",
                                   "His 31th birthday",
                                   ["His 31th birthday",
                                    "His 30st birthday",
                                    "New Year's Day",
                                    "Halloween"]
                ),
                new TriviaQuestion("Who narrates the show?",
                                   "Bob Saget",
                                   ["Bob Saget",
                                    "Jason Segel",
                                    "Josh Radnor",
                                    "Neil Patrick Harris"]
                ),
                new TriviaQuestion("How many seasons are in the series?",
                                   "9",
                                   ["9",
                                    "7",
                                    "8",
                                    "10"]
                ),
                new TriviaQuestion("Who is Robin's archenemy?",
                                   "Patrice",
                                   ["Patrice",
                                    "Clarisse",
                                    "Clara",
                                    "Paula"]
                ),
                new TriviaQuestion("Which trio attended the same university together?",
                                   "Ted, Marshall, and Lily",
                                   ["Ted, Marshall, and Lily",
                                    "Marshall, Barney, and Ted",
                                    "Lily, Marshall, and Barney",
                                    "Robin, Lily, and Marshall"]
                ),
                new TriviaQuestion("Which one of these is not one of Barney's catchphrases?",
                                   "Bottom's up!",
                                   ["Bottom's up!",
                                    "Legendary",
                                    "Have you met Ted?",
                                    "Suit up!"]
                ),
                new TriviaQuestion("Which character got a tattoo of a butterfly on his/her lower back?",
                                   "Ted",
                                   ["Ted",
                                    "Barney",
                                    "Marshall",
                                    "Lily"]
                ),
                new TriviaQuestion("Who is Linus?",
                                   "Lily's bartender",
                                   ["Lily's bartender",
                                    "One of Robin's exes",
                                    "Barney's half brother",
                                    "Ted's high school best friend"]
                )
            ]
        }

        // Start the game
        function start() {
            // Get random question
            getNewQuestion();

            // Update what the display shows
            hide("#pre-game");
            unhide("#in-game");
        }

        // Updates the time left and the progress bar every second
        function countDown() {
            // Decrease one second
            timeLeft -= 1;

            // Update the time remaining on the web page
            if (timeLeft === 1) {  // Change "Seconds" to "Second" for 1 secsond remaining
                $("#seconds").text(timeLeft + " Second");
            } else {
                $("#seconds").text(timeLeft + " Seconds");
            }

            // Shorten the bar after each second
            $(".progress-bar").css("width", timeLeft / START_TIME * 100 + "%");

            // Change the bar color to red to inform the user that time is almost up
            if (timeLeft <= 3) {
                $(".progress-bar").removeClass("bg-info");
                $(".progress-bar").addClass("bg-danger");
            }

            // Once the user runs out of time
            if (timeLeft === 0) {
                // Increase the number of unaswered questions
                numUnaswered++;
                console.log("ran out of time");

                // Pause timer and show answer
                showAnswer("time");

                // Highlight correct answer in green
                highlightAnswer();

                // Wait 3 seconds before moving on to the next question
                setTimeout(function() {
                    // Decide if there is still a question that still needs to be answered
                    questionOrStats()
                }, 3000);
            }
        }

        // Checks to see if the option chosen is correct
        function checkOption() {
            // Convert this to a jQuery object and store it in a variable
            let thisButton = $(this);

            // Highlight correct answer in green
            highlightAnswer();

            // If user chooses the right answer
            if (thisButton.text() === currentQuestion.answer) {
                // Increase the number of correct answers
                numCorrect++;
                // Pause timer and show answer
                showAnswer("correct");
            } else {  // If user chooses the wrong answer
                // Highlight the wrong answer chosen in red
                thisButton.removeClass("btn-secondary");
                thisButton.addClass("btn-danger");
                // Increase the number of incorrect answers
                numIncorrect++;
                // Pasue timer and show answer
                showAnswer("incorrect");
            }

            // Wait 3 seconds before moving on to the next question
            setTimeout(function() {
                // Change the red incorrect option back to grey
                thisButton.removeClass("btn-danger");
                thisButton.addClass("btn-secondary");

                // Decide if there is still a question that still needs to be answered
                questionOrStats()
            }, 3000);
        }
        
        // Highlight correct answer in green
        function highlightAnswer() {
            // Disable the ability to make another guess
            $(".option").prop("disabled", true);

            // Show correct answer in green
            answerButton.removeClass("btn-secondary");
            answerButton.addClass("btn-success");
        }

        // Decide if there is still a question that still needs to be answered
        function questionOrStats() {
            // Change the green correct option back to grey
            answerButton.removeClass("btn-success");
            answerButton.addClass("btn-secondary");

            // If there is still a question to be guessed
            if (questions.length >= 1) {
                // Get a new question
                getNewQuestion();
            } else {  // If there are no more questions
                // Go to stats screen
                showStats();
            }
        }

        // Gets a random question to be guessed
        function getNewQuestion() {
            // Reset time
            timeLeft = START_TIME;

            // Enable the buttons to make a guess
            $(".option").prop("disabled", false);

            // Reset the time left bar
            $(".progress-bar").css("width", "100%");
            $(".progress-bar").removeClass("bg-danger");
            $(".progress-bar").addClass("bg-info");

            // Get random question
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];

            // Update display
            $("#seconds").text(START_TIME + " Seconds");
            $("#question").text(currentQuestion.question);
            hide("#answer-outcome");

            // Iterate over all the options, randomly assign it to a button,
            //     and save the button with the correct answer.
            for (let i = 0; i < 4; i++) {
                // Get random option from the question's options
                let option = currentQuestion.options[Math.floor(Math.random() * currentQuestion.options.length)];
                
                // Remove the option from the question's options
                currentQuestion.options.splice(currentQuestion.options.indexOf(option), 1);

                // Save the button with the correct answer as the answerButton
                if (option === currentQuestion.answer) {
                    answerButton = $("#option" + (i + 1));
                }

                // Set the option text to be the random option
                $("#option" + (i + 1)).text(option);
            }

            // Remove the question for the array of questions
            questions.splice(questions.indexOf(currentQuestion), 1);

            // Set time interval to countd down every 1 second
            intervalId = setInterval(countDown, 1000);
        }

        // Takes in the outcome of the question ("correct", "incorrect", or "time")
        //     and shows the user the outcome on the display
        function showAnswer(outcome) {
            // Clear the interval timer
            clearInterval(intervalId);

            // Inform user if they are right or wrong
            unhide("#answer-outcome");

            // Switch case for correct, incorrect, or out of time (time)
            switch(outcome) {
                case "correct":
                    $("#answer-outcome").text("Correct!");
                    break;
                case "incorrect":
                    $("#answer-outcome").text("Incorrect!");
                    break;
                default:
                $("#answer-outcome").text("Out of time!");
            }
        }

        // Show the aggregated outcomes of all the outcomes
        function showStats() {
            // Hide in-game information
            hide("#in-game");

            // Update stats
            $("#num-correct").text(numCorrect);
            $("#num-incorrect").text(numIncorrect);
            $("#num-unanswered").text(numUnaswered);

            // Unhide post-game information
            unhide("#post-game");
        }

        // Reset the game
        function reset() {
            // Clear the interval timer
            clearInterval(intervalId);

            // Update display
            unhide("#pre-game");
            hide("#in-game");
            hide("#answer-outcome");
            hide("#post-game");

            // Reset the time to 15 seconds
            timeLeft = START_TIME;

            // Reset counters to 0
            numCorrect = 0;
            numIncorrect = 0;
            numUnaswered = 0;

            // Create TriviaQuestion objects
            createQuestions();
        }

        // Hide element(s) using css selector
        function hide(el) {
            $(el).addClass("hidden");
        }

        // Unhide element(s) using css selector
        function unhide(el) {
            $(el).removeClass("hidden");
        }

        // Intitally set the game
        reset();

        // Start the game when the start button is clicked
        $("#start").on("click", start);

        // Check if the option clicked is correct
        $(".option").on("click", checkOption);

        // Reset the game when the reset button is clicked
        $("#reset").on("click", reset);
    });
})();