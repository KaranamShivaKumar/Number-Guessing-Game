const randomNumber= parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.getElementById('guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p =document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}
function validateGuess(guess){
    // is guess a number or not?
    if (isNaN(guess)){
        alert('Please enter a valid number')
    }
    else if (guess > 100 || guess < 1){
        alert('Please enter a number between 1 and 100');
    }
    else{
        prevGuess.push(guess);
        if (numGuess === 11){
            displayGuess(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();}
        else{   
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(){
    // is the guessed number correct?
    if (guess === randomNumber){
        displayMessage(`Congratulations! You guessed the number in ${numGuess}!`);
    }
    else if (guess > randomNumber){
        displayMessage('Too High! Try again!');
    }
    else if (guess < randomNumber){
        displayMessage('Too Low! Try again!');}

}

function displayGuess(guess){
    // display the guesses and the result of the guess and update the remaining guesses
    userInput.value = '';
    guessSlot.innerHTML += `${guess} , `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}
function displayMessage(message){
    // displays the message
    lowOrHi.innerHTML = `<h2>${message}</h2>`;


}

function endGame(){
    // end the game
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = '<h2 id="newgame">Start new game</h2>';
    startOver.appendChild(p);
    playGame = false;
    newGame();
}   

function newGame(){
    // reset the game
    document.getElementById('newgame').addEventListener('click', function(){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
