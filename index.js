console.log("This is index.js file");
let UIData = {
    'UI': { 'form': '.form', 'guessValue': '#guessField', 'previousGuess': '.guesses', 'guessRemaining': 10, 'remainingGuessesSpan': '.lastResult', 'hintUser': '.lowOrHi', 'isSubmitGuess': true, },
}
const UI = UIData.UI;
let previousGuessValueArray = [];
let randomValue = Math.floor((Math.random() * 100) + 1);
console.log("randomValue",randomValue);
if (UI.isSubmitGuess) {
    document.querySelector(UI.form).addEventListener("submit", generateUserValue);
}
function generateUserValue(e) {

    e.preventDefault();
    let userValue = document.querySelector(UI.guessValue).value;
    // console.log(userValue);
    validation(userValue);
    reset();
}
function validation(userValue) {
    if (isNaN(userValue)) {
        alert("Please input number")
    } else if (userValue == "") {
        alert("please input some value");
    } else if (userValue <= 0 || userValue > 100) {
        alert("Please input value which is in range");

    } else {
        calculateAndShowHintMsg(userValue);
        storePreviousGuessValue(userValue);
        calculateAndShowRemainingGuesses(userValue);
    }
}
function reset() {
    document.querySelector(UI.guessValue).value = "";
}
function calculateAndShowRemainingGuesses(userValue) {
    UI.guessRemaining--;
    document.querySelector(UI.remainingGuessesSpan).innerHTML = UI.guessRemaining;
    if (UI.guessRemaining <= 0) {
        UI.isSubmitGuess = false;
        if (UI.isSubmitGuess === false) {
            endGame()
        }
    }
}
function endGame() {
    let userInput = document.querySelector(UI.guessValue);
    userInput.value = "";
    userInput.setAttribute('disabled', '');
    document.querySelector(".guessSubmit").disabled = true;
    document.querySelector(UI.remainingGuessesSpan).innerHTML = `Your guess chances are over correct answer is ${randomValue}`;
    let button = document.createElement("button");
    button.className = "newGame"
    button.textContent = `Play Again`;
    let container = document.querySelector(".resultParas");
    let hintMsg = document.querySelector(UI.hintUser);
    container.insertBefore(button, hintMsg);
    UI.isSubmitGuess = false;
    if (UI.isSubmitGuess === false) {
        newGame(userInput);
    }
}


function newGame(userInput) {
    document.querySelector(".newGame").addEventListener("click", () => {
        randomValue = Math.floor((Math.random() * 100) + 1);
        previousGuessValueArray = [];
        document.querySelector(UI.remainingGuessesSpan).innerHTML = 2;
        UI.guessRemaining = 10;
        document.querySelector(UI.previousGuess).innerHTML = "";
        document.querySelector(UI.hintUser).innerHTML = '';
        //  document.querySelector(UI.remainingGuessesSpan).innerHTML ='';
        userInput.removeAttribute('disabled');
        document.querySelector(".guessSubmit").disabled = false;
        document.querySelector(".newGame").remove();
        UI.isSubmitGuess = true;
    })
}

function storePreviousGuessValue(userValue) {
    previousGuessValueArray.push(userValue);
    document.querySelector(UI.previousGuess).innerHTML = previousGuessValueArray;
}
function calculateAndShowHintMsg(userValue) {
    let difference = randomValue - userValue
    if (difference <= 20 && difference > 0) {
        // console.log("thoda sa low try somewhat high")
        document.querySelector(UI.hintUser).innerHTML = `you are lower than just 20 or less number increase accordingly`;
    } else if (difference > 20) {
        // console.log("jyada low need to increase much")
        document.querySelector(UI.hintUser).innerHTML = `Too low need to increase much`;
    } else if (difference >= -20 && difference < 0) {
        // console.log("Thoda sa high TRy someehat low")
        document.querySelector(UI.hintUser).innerHTML = `you are higher than just 20 or less number try reducing accordingly`;
    } else if (difference < -20) {
        document.querySelector(UI.hintUser).innerHTML = `Too high need to decrease much`;
    }
    else {
        document.querySelector(UI.hintUser).innerHTML = "congrats you guess it correctly";
        endGame();
    }

}

