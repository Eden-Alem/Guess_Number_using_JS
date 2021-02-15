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

    // Applied the concept of closures:
    // The idea: An inner function enjoys the context even after the parent functions have returned. Set of variables of the
    // inner function encloses the set of variables of the outer function that is why its named closure. The first language to bring this idea to the main stream was JS.
    // In the implementation below the inner function will continue to have access to the outer function (array) even after the outer has returned.
    // Behind the scenes of closures: Everything is moved to the heap and the process is as follows:
    // Activation record - will contain the return address, all the input parameters and might also contain local arguments or variables
    // In Js a functional language, a function object will contain a pointer to the code so it executes it when the function is invoked
    // and the function object will contain a reference to the activation of the function that created it.
    // Through the activation connection the below implementation for example will have access to the array variable and will continue to have it 
    // as long as it survives. As an example if undefined was placed as an argument all of it can get garbage collected but until then as long as
    // the inner function survives and needs that activation it'll keep it and the garbage collector won't touch it.
    let result = (function() {
        let array = [
            correctness.get('less than 10'),
            correctness.get('less than 20'),
            correctness.get('less than 30'),
            correctness.get('less than 40'),
            correctness.get('less than 50'),
            correctness.get('greater than 50'),
            correctness.get('greater than 60'),
            correctness.get('greater than 70'),
            correctness.get('greater than 80'),
            correctness.get('greater than 90')
        ];

        return function() {            
            if (Reflect.get(magicNumber, 'number') === Number(Reflect.get(magicNumber, 'guessedNumber'))) {
                document.location.reload();   
                return alert(`Awesome you guessed the number`);
            } else if (0 >= Reflect.get(magicNumber, 'guessedNumber') || Reflect.get(magicNumber, 'guessedNumber')  >= 100) {
                return (display.textContent = `Guess again :D Please submit a number within the specified range. Thank you!!`);
            } else if ((Reflect.get(magicNumber, 'guessedNumber') <= Number(Reflect.get(magicNumber, 'number'))) ) {
                for (let index = 0; index < array.length; index++) {
                    if (Reflect.get(magicNumber, 'number') <= array[index].end) {
                        return (display.textContent = `Guess again :D Hint: The number satisfies the following conditions: x <= ${array[index].end} and x >= ${array[index].start}`);
                    }       
                }
            } else if ((Reflect.get(magicNumber, 'guessedNumber') >= Number(Reflect.get(magicNumber, 'number'))) ) {
                for (let index = array.length-1; index > 0; index--) {
                    if (Reflect.get(magicNumber, 'number') >= array[index].start) {
                        return (display.textContent = `Guess again :D Hint: The number satisfies the following conditions: x >= ${array[index].start} and x <= ${array[index].end}`);
                    }        
                }                       
            } else {
                document.location.reload();  
                return alert(`Please enter numbers only`);
            }
        };
    

    }());

    result();
    
    // A function that returns a function by adding one to the argument passed (First class function)
    function addOne(number) {
        return function () {
            return number += 1;
        };
    }

    // First class function(returns a function and accepts a function as an argument), factory function - a function that returns a new object.
    // Factory functions do not require the use of the new keyword, but can still be used to initialize an object, like a constructor.
    function to(generator, wish_no) {
        return function () {
            var value = generator();
            if (value < wish_no) {
                return value;
            }
            return undefined;
        };
    }

    // Invoked the function by passing the addOne function and the chances the user have
    let generate = to(addOne(turns), 7);
    
    // Checks for the value of the function each time its called and in returning undefined the users chances are over.
    if (isNaN(turns)) {
        document.location.reload();        
        return alert(`Limit exceeded you can't guess any more :(, try again!!`);  
       
    } 

    // Update the value of the user's chance and pass it as an argument to the function thats being passed to the factory function
    // cause each time a new object is being created
    turns = generate();

    
    
};
