// Array of words for the game
const words = ["hangman", "javascript", "programming", "computer", "developer", "code", "algorithm", "internet", "web"];

// Randomly choose a word from the array
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = "_".repeat(chosenWord.length);

// Display the word to be guessed
document.getElementById('word-display').textContent = guessedWord;

// Track the number of incorrect guesses
let incorrectGuesses = 0;

function checkGuess() {
  const letter = document.getElementById('guess-input').value.toLowerCase();
  if (!letter || letter.length !== 1 || !/^[a-zA-Z]+$/.test(letter)) {
    document.getElementById('message').textContent = "Please enter a valid letter.";
    return;
  }

  if (chosenWord.includes(letter)) {
    // Update guessedWord with correctly guessed letters
    guessedWord = guessedWord.split('').map((char, index) => chosenWord[index] === letter ? letter : char).join('');
    document.getElementById('word-display').textContent = guessedWord;

    // Check if the word has been fully guessed
    if (guessedWord === chosenWord) {
      document.getElementById('message').textContent = "Congratulations! You guessed the word correctly.";
      document.getElementById('guess-input').setAttribute('disabled', true);
    } else {
      document.getElementById('message').textContent = "Good guess! Keep going.";
    }
  } else {
    incorrectGuesses++;
    updateHangmanDrawing(incorrectGuesses);
    document.getElementById('message').textContent = `Incorrect guess. You have ${6 - incorrectGuesses} attempts left.`;

    // Display game over if too many incorrect guesses
    if (incorrectGuesses === 6) {
      document.getElementById('message').textContent = `Game over! The word was "${chosenWord}".`;
      document.getElementById('guess-input').setAttribute('disabled', true);
    }
  }

  // Clear input field after guess
  document.getElementById('guess-input').value = '';
}

function updateHangmanDrawing(incorrectGuesses) {
  const hangmanDrawing = [
    `
     _______
    |/      |
    |      ( )
    |      /|\\
    |      / \\
    |       
  __|__
  `,
    `
     _______
    |/      |
    |      ( )
    |      /|\\
    |        \\
    |       
  __|__
  `,
    `
     _______
    |/      |
    |      ( )
    |      /|
    |        \\
    |       
  __|__
  `,
    `
     _______
    |/      |
    |      ( )
    |       |
    |        \\
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
    |       
    |        
    |       
  __|__
  `,
    `
     _______
    |/      
    |      
    |      
    |        
    |       
  __|__
  `
  ];

  document.getElementById('hangman-drawing').textContent = hangmanDrawing[incorrectGuesses];
}