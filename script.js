//Vars Declarations & Initialization ..

let generateAlphabets = '', char, randomSelectedWord;
let correctLettersArr = [], wrongLettersArr = [];


const clickedAlphabets = document.getElementById('display-clicked-alphabets');
const wrongLettersBox = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-box');
const modalBtn = document.getElementById('modalbtn');
const hangman = document.querySelectorAll(".hangman");
const announceGameResult = document.getElementById('announce');

// Need to build wordbank workflow..
// const wordBank = ['basketball'];
// For testing..
const wordBank = ['test'];
randomSelectedWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
console.log(randomSelectedWord)

function displayTheCorrectWord() {
    clickedAlphabets.innerHTML = `
    ${randomSelectedWord.split('')
            .map(
                letter => `
        <span class="letter"> ${correctLettersArr.includes(letter) ? letter : ''} </span>`)
            .join('')}`;

    checkForWinorLose()

}

function checkForWinorLose() {
    const wrapTheCorrectEnteredWord = clickedAlphabets.innerText.replace(/\n/g, '');

    //Check if won
    if (wrapTheCorrectEnteredWord === randomSelectedWord) showNotification(wrapTheCorrectEnteredWord, 'Congratulations! You won!👏');

    //Check if lose
    if (wrongLettersArr.length === hangman.length) showNotification(wrapTheCorrectEnteredWord, 'Unfortunately you lost 😢');

}

// Update the wrong letters
function updateWrongLetterAction() {
    //Display wrong letters
    wrongLettersBox.innerHTML = `
    ${wrongLettersArr.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLettersArr.map(letter => `<span>${letter}</span>`)}`;


    //Display hangman
    hangman.forEach((shape, index) => {
        const errors = wrongLettersArr.length;

        if (index < errors) {
            shape.style.display = 'block'
        }
        else {
            shape.style.display = 'none';
        }
    });

    checkForWinorLose()

}

function clickedBtn(l) {

    const letter = l;

    if (randomSelectedWord.includes(letter)) {
        if (!correctLettersArr.includes(letter)) {
            correctLettersArr.push(letter);

            displayTheCorrectWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLettersArr.includes(letter)) {
            wrongLettersArr.push(letter);

            updateWrongLetterAction();
        } else {
            showNotification();
        }
    }
}

document.getElementById('play-button').onclick = () => {
     
    wrongLettersBox.innerText = ''

    //Empty the correct span letters
    $("span").html("");

    hangman.forEach((shape) => {
            shape.style.display = 'none';
        }
    );
   
    $('#notificationModal').modal('hide');

    correctLettersArr = [];
    wrongLettersArr = [];

    randomSelectedWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();

}

document.getElementById('close').onclick = () => {
    document.body.classList.add("close");
}

//Generate Alphabets Buttons
for (var i = 65; 90 >= i; i++) {// A-65, Z-90
    char = String.fromCharCode(i);
    generateAlphabets += '<button onclick="clickedBtn(\'' + char + '\');">' + char + '</button>';
}
document.getElementById('box').innerHTML = generateAlphabets;

function showNotification(wrappedCorrectWord, result) {

    if (wrappedCorrectWord === randomSelectedWord || wrongLettersArr.length === hangman.length) {
        modalBtn.click();
        announceGameResult.innerText = result;

    } else {
        notification.classList.add('show');

        setTimeout(() => {
        notification.classList.remove('show');
        }, 2000);
    }

}

displayTheCorrectWord();