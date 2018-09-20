//Create an array of gods and goddesses for the user to guess
var gods = [
    "Achilles",
    "Agni",
    "Amaterasu",
    "Anhur",
    "Anubis",
    "Aphrodite",
    "Apollo",
    "Arachne",
    "Ares",
    "Artemis",
    "Artio",
    "Athena",
    "Bacchus",
    "Bakasura",
    "Bastet",
    "Bellona",
    "Camazotz",
    "Cerberus",
    "Cernunnos",
    "Chaac",
    "Chiron",
    "Chronos",
    "Cupid",
    "Fenrir",
    "Freya",
    "Ganesha",
    "Hades",
    "Hel",
    "Hercules",
    "Isis",
    "Izanami",
    "Janus",
    "Kali",
    "Kukulkan",
    "Loki",
    "Medusa",
    "Mercury",
    "Neith",
    "Nemesis",
    "Nike",
    "Nox",
    "Odin",
    "Poseidon",
    "Sobek",
    "Sol",
    "Thanatos",
    "Thor",
    "Ymir",
    "Zeus"
]

//Variables for storing wins, random god, guesses remaining, letters guessed, and blank spaces
var winsNum = 0;
var randomGod;
var guessesNum = 13;
var letters = [];
var blankSpaces;

//Another variable that will determine when the user has won the game
var rightGuesses;

//Will reset the game when the player wins
var reset = false;

//Create variables that hold references to divs in html file
var instructions = document.getElementById("instructions");
var wins = document.getElementById("wins");
var currentWord = document.getElementById("current-word");
var guessesRemaining = document.getElementById("guesses-remaining");
var lettersGuessed = document.getElementById("letters-guessed");

//Write headings for these divs
instructions.textContent = "Press any key to get started!";
wins.textContent = "Wins: " + winsNum;
guessesRemaining.textContent = "Guesses Remaining:";

//Initial game start up
newGame();

//The game begins when the user presses a key
document.onkeyup = function(event) {

    //Start a new game when there are no guesses remaining or the player wins
    if (guessesNum === 0 || reset === true) {
        newGame();
    }

    //Stores the user's guess in the letters array and prints guesses
    var userGuess = event.key;
    letters.push(userGuess + "  ");
    lettersGuessed.textContent = letters.join("");

    //Compare guess to letters in randomGod
    compare(userGuess);

    //Check to see if the user has won or lost the game
    winOrLose();
    
}

function newGame() {
    //Initialize variables and get the random word
    blankSpaces = [];
    guessesNum = 13;
    rightGuesses = 0;
    reset = false;
    letters = [];
    randomGod = gods[Math.floor(Math.random() * gods.length)];

    //Print instructions and guesses
    instructions.textContent = "Press any key to get started!";
    guessesRemaining.textContent = "Guesses Remaining: " + guessesNum;

    //Generate blank spaces
    for (var i = 0; i < randomGod.length; i++) {
        blankSpaces[i] = "_ ";
    }
    currentWord.textContent = blankSpaces.join("");
}

function compare(userGuess) {

    //Variable that stores whether or not the guess was wrong (begins as true)
    var wrongGuess = true;

    for (var i = 0; i < randomGod.length; i++) {
        //If the guess is correct, update the blank spaces
        if (randomGod.charAt(i).toLowerCase() === userGuess.toLowerCase()) {
            blankSpaces[i] = randomGod.charAt(i);
            currentWord.textContent = blankSpaces.join("");
            wrongGuess = false;
            rightGuesses++;
        }
        
    }

    //Decrease guesses remaining if guess was incorrect
    if (wrongGuess === true) {
        guessesNum--;
        guessesRemaining.textContent = "Guesses Remaining: " + guessesNum;
    }
}

function winOrLose() {
    //You win!!
    if (rightGuesses === randomGod.length) {
        //Update wins
        winsNum++;
        //Print new message at the top of the screen and update wins
        instructions.textContent = "You Win! Press any key to play again!";
        wins.textContent = "Wins: " + winsNum;
        //Reset game
        reset = true;
    }

    //You Lose :(
    if (guessesNum === 0) {
        //Print new message at the top of the screen
        instructions.textContent = "You Lose! Sorry! Press any key to play again!";
    }
}