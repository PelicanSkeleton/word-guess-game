//GLOBAL VARIABLES
//========================================================================================================
//Arrays and variables for holding data
var wordOptions = ["menomena", "faraquet", "braid", "battles", "mineral", "fugazi", "jawbox", "cursive"];
var selectedWord = [];
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;


//FUNCTIONS (Reusable blocks of code that I will call upon when needed.)
//========================================================================================================
function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

//Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

//Populate blanks and successes with right number of blanks
    for(i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    };

//Change html to reflect game conditions
    document.getElementById("word-to-guess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);

}

function checkLetters(letter) {
//Check if letter exists in code at all
    var isLetterInWord = false;

    for(i = 0; i < numBlanks; i++) {
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

//Check where in the word the letter exists, then populate our blanksAndSuccesses array.
    if(isLetterInWord) {
        for (i = 0; i < numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    } else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

        
}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " Guesses Left: " + guessesLeft);

    //Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("word-to-guess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    //Check if user won
    if(lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You won!");

        //Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    //Check if user lost
    else if(guessesLeft == 0) {
        lossCount++;
        alert("You lost.");

        //Update the loss counter in the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }
}

//MAIN PROCESS
//========================================================================================================
//Initiates the code for the first time
startGame();

//Registers the key clicks
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    console.log(letterGuessed);
}