//Vars Declarations & Initialization ..

let generateAlphabets = '' , char , selectedWord , count=10;
const correctLettersArr = [] , wrongLettersArr = [];

const displayClickedAlphabets = document.getElementById('display-clicked-alphabets');
const wrongLettersBox = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-box');
const announce = document.getElementById('announce');
const modalBtn = document.getElementById('modalbtn');
const hangman= document.querySelectorAll(".hangman");


// Need to build wordbank workflow..
const wordBank = ['basketball'];
selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
console.log(selectedWord)


//Show hidden word
function displayWord(){
    displayClickedAlphabets.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLettersArr.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const wrapTheCorrectEnteredWord = displayClickedAlphabets.innerText.replace(/\n/g, '');

    if(wrapTheCorrectEnteredWord === selectedWord){
        modalBtn.click();
        let counter = setInterval(timer, 1000);
        announce.innerText = 'Congratulations! You won! 👏';
        
    }
}

// Update the wrong letters
function updateWrongLetter(){
    //Display wrong letters
    wrongLettersBox.innerHTML = `
    ${wrongLettersArr.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLettersArr.map(letter => `<span>${letter}</span>`)}`;


    //Display hangman
    hangman.forEach((shape,index) => {
        const errors = wrongLettersArr.length;

        if(index < errors) {
            shape.style.display = 'block'
        }
        else{
            shape.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLettersArr.length === hangman.length){
        modalBtn.click();
        let counter = setInterval(timer, 1000);
        announce.innerText = 'Unfortunately you lost 😢';
    }
}

function clickedBtn(l){
    
        const letter = l;

        if(selectedWord.includes(letter)){
            if(!correctLettersArr.includes(letter)){
                correctLettersArr.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLettersArr.includes(letter)){
                wrongLettersArr.push(letter);

                updateWrongLetter();
            } else{
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

selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

displayWord();
updateWrongLetter();

    }

    //Generate Alphabets Buttons
    for (var i = 65; 90 >= i; i++) {// A-65, Z-90
        char = String.fromCharCode(i);
        generateAlphabets += '<button onclick="clickedBtn(\'' + char + '\');">' + char + '</button>';
      }
      document.getElementById('box').innerHTML = generateAlphabets;

function timer() {
    
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     $('#exampleModalCenter').modal('hide');
     return;
  }
  document.getElementById("counter").innerHTML=count + " secs for this window to close !"; 

}

//Show you have clicked duplicate alphabet notification 
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

displayWord();
