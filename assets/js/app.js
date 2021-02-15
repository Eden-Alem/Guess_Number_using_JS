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

function enter(e) {
    // Declared an object to implement Reflect
    let magicNumber = {};

    // Used Map object to set the key, value pairs
    let correctness = new Map();
    correctness.set('less than 10', {start: 0, end: 10});
    correctness.set('less than 20', {start: 10, end: 20});
    correctness.set('less than 30', {start: 20, end: 30});
    correctness.set('less than 40', {start: 30, end: 40});
    correctness.set('less than 50', {start: 40, end: 50});
    correctness.set('greater than 50', {start: 50, end: 60});
    correctness.set('greater than 60', {start: 60, end: 70});
    correctness.set('greater than 70', {start: 70, end: 80});
    correctness.set('greater than 80', {start: 80, end: 90});
    correctness.set('greater than 90', {start: 90, end: 100});

    // Used Reflect which constitues static properties. Its not a constructor and can't be invoked as a function
    Reflect.set(magicNumber, 'number', randomNumber);
    Reflect.set(magicNumber, 'guessedNumber', guessedNum.value);    

    // Created the node element where the user's guess input will be stored and appended it to the unordered list 
    const guesses = document.createElement('li');
    guesses.className = 'guesses';
    guesses.appendChild(document.createTextNode(guessedNum.value));

    guessedList.appendChild(guesses);

};
