//Vars Declarations & Initialization ..

let generateAlphabets = '', char, randomSelectedWord, count = 10;
const correctLettersArr = [], wrongLettersArr = [];


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

//The below code needs to be tested and 
document.getElementById('play-button').onclick = () => {

    document.getElementsByClassName('btn btn-secondary')[0].click()

    //Make the arrays empty .. 
    correctLettersArr.splice(0);
    wrongLettersArr.splice(0);

    randomSelectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    displayTheCorrectWord()
    updateWrongLetterAction();

}

//Generate Alphabets Buttons
for (var i = 65; 90 >= i; i++) {// A-65, Z-90
    char = String.fromCharCode(i);
    generateAlphabets += '<button onclick="clickedBtn(\'' + char + '\');">' + char + '</button>';
}
document.getElementById('box').innerHTML = generateAlphabets;

function timer() {

    count = count - 1;
    if (count <= 0) {
        clearInterval();
        $('#exampleModalCenter').modal('hide');
        return;
    }
    document.getElementById("counter").innerHTML = count + " secs for this window to close !";

}

function showNotification(wrappedCorrectWord, result) {

    if (wrappedCorrectWord === randomSelectedWord || wrongLettersArr.length === hangman.length) {
        timer();
        modalBtn.click();
        setInterval(timer, 1000);
        announceGameResult.innerText = result;

    } else {
        notification.classList.add('show');

        setTimeout(() => {
        notification.classList.remove('show');
        }, 2000);
    }

}

displayTheCorrectWord();