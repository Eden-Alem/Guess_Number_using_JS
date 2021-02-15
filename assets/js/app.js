// Declared the UIs
const guessedNum = document.querySelector("#num");
const guessedList = document.querySelector('.guessedList');
const enterGuess = document.querySelector('.enterGuess');
const display = document.querySelector('.display');

// Added an onclick listener to the button
enterGuess.addEventListener('click', enter);

// Generated a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Declared a variable to count the number of chances a user has
let turns = 1;
