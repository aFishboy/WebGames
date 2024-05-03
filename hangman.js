// Array of words for the game
const words = [
    "cat",
    "hangman",
    "javascript",
    "programming",
    "computer",
    "developer",
    "code",
    "algorithm",
    "internet",
    "web",
];

// Randomly choose a word from the array
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array.from(chosenWord)
    .map(() => "_")
    .join(" ");
let guessedLetters = [];

// Display the word to be guessed
document.getElementById("word-display").textContent = guessedWord;

// Track the number of incorrect guesses
let incorrectGuesses = 0;
const button = document.getElementById("button");
button.addEventListener("click", checkGuess);

// Add event listener for keydown on input field
document
    .getElementById("guess-input")
    .addEventListener("keydown", function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
            // Prevent the default action of submitting the form
            event.preventDefault();
            // Trigger the checkGuess function
            checkGuess();
        }
    });

function checkGuess() {
    const letter = document.getElementById("guess-input").value.toLowerCase();
    if (!letter || letter.length !== 1 || !/^[a-zA-Z]+$/.test(letter)) {
        document.getElementById("message").textContent =
            "Please enter a valid letter.";
        document.getElementById("guess-input").value = "";
        return;
    }

    if (guessedLetters.includes(letter)) {
        document.getElementById("guess-input").value = "";
        document.getElementById(
            "message"
        ).textContent = `${letter.toUpperCase()} has already been guessed! You have ${
            6 - incorrectGuesses
        } attempts left.`;
        return;
    }
    guessedLetters.push(letter);
    guessedLetters.sort();

    if (chosenWord.includes(letter)) {
        // Update guessedWord with correctly guessed letters
        guessedWord = Array.from(chosenWord)
            .map((char) => (guessedLetters.includes(char) ? char : "_"))
            .join(" ");
        document.getElementById("word-display").textContent = guessedWord;

        // Check if the word has been fully guessed
        if (guessedWord.replace(/\s/g, "") === chosenWord) {
            document.getElementById("message").textContent =
                "Congratulations! You guessed the word correctly.\n" +
                "Press any key to play again!";
            document
                .getElementById("guess-input")
                .setAttribute("disabled", true);
            setTimeout(
                () => document.addEventListener("keydown", startGame),
                3000
            );
        } else {
            document.getElementById("message").textContent =
                "Good guess! Keep going.";
        }
    } else {
        incorrectGuesses++;
        updateHangmanDrawing(incorrectGuesses);
        document.getElementById(
            "message"
        ).textContent = `Incorrect guess. You have ${
            6 - incorrectGuesses
        } attempts left.`;

        // Display game over if too many incorrect guesses
        if (incorrectGuesses === 6) {
            document.getElementById("message").textContent =
                `Game over! The word was "${chosenWord}".\n` +
                "Press any key to play again!";
            document
                .getElementById("guess-input")
                .setAttribute("disabled", true);
            setTimeout(
                () => document.addEventListener("keydown", startGame),
                3000
            );
        }
    }

    // Clear input field after guess
    document.getElementById("guess-input").value = "";
}

function startGame() {
    // Remove event listener for keydown
    document.removeEventListener("keydown", startGame);

    // Remove event listener for button click
    button.removeEventListener("click", checkGuess);

    // Reset game variables
    incorrectGuesses = 0;
    guessedLetters = [];
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array.from(chosenWord)
        .map(() => "_")
        .join(" ");

    // Update displayed elements
    document.getElementById("guess-input").removeAttribute("disabled");
    document.getElementById("word-display").textContent = guessedWord;
    document.getElementById("hangman").textContent = "";

    // Clear message
    document.getElementById("message").textContent = "";

    // Add event listener for checkGuess function
    button.addEventListener("click", checkGuess);
    // Add event listener for keydown on input field
    document
        .getElementById("guess-input")
        .addEventListener("keydown", function (event) {
            // Check if the pressed key is Enter (key code 13)
            if (event.key === "Enter") {
                // Prevent the default action of submitting the form
                event.preventDefault();
                // Trigger the checkGuess function
                checkGuess();
            }
        });

    updateHangmanDrawing(incorrectGuesses);
}

function updateHangmanDrawing(incorrectGuesses) {
    document.getElementById("hangman").textContent =
        hangmanDrawings[incorrectGuesses];
}

const hangmanDrawings = [
    `
  _______
  |/      |
  |      
  |      
  |        
  |       
__|__
`,

    `
  _______
  |/      |
  |      ( )
  |       
  |        
  |       
__|__
`,
    `
  _______
  |/      |
  |      ( )
  |       |
  |        
  |       
__|__
`,
    `
  _______
  |/      |
  |      ( )
  |      /|
  |        
  |       
__|__
`,
    `
  _______
  |/      |
  |      ( )
  |      /|\\
  |        
  |       
__|__
`,
    `
  _______
  |/      |
  |      ( )
  |      /|\\
  |      / 
  |       
__|__
`,
    `
  _______
  |/      |
  |      ( )
  |      /|\\
  |      / \\
  |       
__|__
`,
];

updateHangmanDrawing(incorrectGuesses);
