// Declared the UIs
const guessedNum = document.querySelector("#num");
const guessedList = document.querySelector('.guessedList');
const enterGuess = document.querySelector('.enterGuess');
const display = document.querySelector('.display');

// Added an onclick listener to the button
enterGuess.addEventListener('click', enter);