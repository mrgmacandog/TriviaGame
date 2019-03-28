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

        let currentQuestion;

        let answerButton;

        // TriviaQuestion constructor
        //     Takes in a question and 4 options
        function TriviaQuestion(question, answer, options) {
            this.question = question;
            this.answer = answer;
            this.options = options;
        }

        let numCorrect = 0;
        let numIncorrect = 0;
        let numUnaswered = 0;


        // Time left
        let timeLeft;

        let intervalId;

        // Populate questions array with TriviaQueestion objects
        function createQuestions() {
            questions = [
                new TriviaQuestion("What is the name of bar the gang frequently goes to?",
                                   "MacLaren's",
                                   ["MacLaren's",
                                    "MacLoughlin's",
                                    "MacLure's",
                                    "MacMaster's"]),
                new TriviaQuestion("What color and instrument does Ted steal for Robin?",
                                   "Blue French Horn",
                                   ["Blue French Horn",
                                    "Blue Trumpet",
                                    "Red French Horn",
                                    "Red Trumpet"]),
                new TriviaQuestion("Which acronym does Barney use to describe his job?",
                                   "P.L.E.A.S.E.",
                                   ["P.L.E.A.S.E.",
                                    "S.E.C.R.E.T.",
                                    "W.O.R.K.",
                                    "S.T.O.P."]),
                new TriviaQuestion("What is the first Robin Sparkles song the gang listens to?",
                                   "Let's Go To The Mall",
                                   ["Let's Go To The Mall",
                                    "Sandcastles in the Sand",
                                    "The Beaver Song",
                                    "P.S. I Love You"]),
                new TriviaQuestion("What are the names of Ted's children?",
                                   "Luke & Penny",
                                   ["Luke & Penny",
                                    "Adam & Sara",
                                    "David & Jenna",
                                    "Jerry & Emily"]),
                new TriviaQuestion("What do Barney and Ted want to name their bar if they had one?",
                                   "Puzzles",
                                   ["Puzzles",
                                    "Clues",
                                    "Questions",
                                    "Kisses"]),
                new TriviaQuestion("What year is it when Ted is telling his children how he met their mother?",
                                   "2030",
                                   ["2030",
                                    "2015",
                                    "2020",
                                    "2025"]),
                new TriviaQuestion("At what occasion does Ted find a goat in his apartment?",
                                   "His 31th birthday",
                                   ["His 31th birthday",
                                    "His 30st birthday",
                                    "New Year's Day",
                                    "Halloween"]),
                new TriviaQuestion("Who narrates the show?",
                                   "Bob Saget",
                                   ["Bob Saget",
                                    "Jason Segel",
                                    "Josh Radnor",
                                    "Neil Patrick Harris"]),
                new TriviaQuestion("How many seasons are there?",
                                   "9",
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

            

            // Update what the display shows
            hide("#start");
            unhide("#in-game");

            
            
            // Get new question after 15 seconds
            // setTimeout(getNewQuestion, 15000);
        }

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

            if (timeLeft <= 3) {
                $(".progress-bar").removeClass("bg-info");
                $(".progress-bar").addClass("bg-danger");
            }

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
                    
                    
                    questionOrStats()
                }, 3000);
            }
            // if (timeLeft > 0) {
            //     // Decrease one second
            //     timeLeft -= 1;

            //     // Update the time remaining on the web page
            //     if (timeLeft === 1) {  // Change "Seconds" to "Second" for 1 secsond remaining
            //         $("#seconds").text(timeLeft + " Second");
            //     } else {
            //         $("#seconds").text(timeLeft + " Seconds");
            //     }

            //     console.log(timeLeft);
            // } else {
            //     // Increase the number of unaswered questions
            //     numUnaswered++;
            //     console.log("ran out of time");

            //     // Pause timer and show answer
            //     showAnswer("time");

            //     // Highlight correct answer in green
            //     highlightAnswer();

            //     // Wait 3 seconds before moving on to the next question
            //     setTimeout(function() {
                    
                    
            //         questionOrStats()
            //     }, 3000);
            // }
        }

        function checkOption() {
            let thisButton = $(this);

            // Highlight correct answer in green
            highlightAnswer();

            if (thisButton.text() === currentQuestion.answer) {
                // Increase the number of correct answers
                numCorrect++;
                // Pause timer and show answer
                showAnswer("correct");

            } else {
                thisButton.removeClass("btn-dark");
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
                thisButton.addClass("btn-dark");

                questionOrStats()
            }, 3000);
        }
        
        // Highlight correct answer in green
        function highlightAnswer() {
            // Disable the ability to make another guess
            $(".option").prop("disabled", true);

            console.log(answerButton);
            // Show correct answer in green
            answerButton.removeClass("btn-dark");
            answerButton.addClass("btn-success");
        }

        function questionOrStats() {
            answerButton.removeClass("btn-success");
            answerButton.addClass("btn-dark");
            if (questions.length >= 1) {
                getNewQuestion();
            } else {
                showStats();
            }
        }

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
            hide("#answer-outcome");
            $("#question").text(currentQuestion.question);
            for (let i = 0; i < 4; i++) {
                // Get random option from the question's options
                let option = currentQuestion.options[Math.floor(Math.random() * currentQuestion.options.length)];
                
                // Remove the option from the question's options
                currentQuestion.options.splice(currentQuestion.options.indexOf(option), 1);

                // Save the button with the correct answer as the answerButton
                if (option === currentQuestion.answer) {
                    answerButton = $("#option" + (i + 1));
                }

                // Set the option text to be the rand option
                $("#option" + (i + 1)).text(option);
            }

            // Remove the question for the array of questions
            questions.splice(questions.indexOf(currentQuestion), 1);

            // Set time interval to countd down every 1 second
            intervalId = setInterval(countDown, 1000);

            console.log(answerButton);
        }

        function showAnswer(outcome) {
            // Clear the interval timer
            clearInterval(intervalId);

            // Inform user if they are right or wrong
            unhide("#answer-outcome");

            switch(outcome) {
                case "correct":
                    // switch case for correct, incorrect, 
                    // $("#answer-outcome").css("color", "#28A745");
                    $("#answer-outcome").text("Correct!");
                    break;
                case "incorrect":
                    // $("#answer-outcome").css("color", "#DC3545");
                    $("#answer-outcome").text("Incorrect!");
                    break;
                default:
                // $("#answer-outcome").css("color", "#DC3545");
                $("#answer-outcome").text("Out of time!");
            }
        }

        function showStats() {
            console.log(numCorrect, numIncorrect);
            hide("#in-game");

            $("#num-correct").text(numCorrect);
            $("#num-incorrect").text(numIncorrect);
            $("#num-unanswered").text(numUnaswered);
            unhide("#post-game");
        }

        // Reset the game
        function reset() {
            clearInterval(intervalId);

            unhide("#start");
            hide("#in-game");
            hide("#answer-outcome");
            hide("#post-game");

            // Reset the time to 15 seconds
            timeLeft = START_TIME;

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