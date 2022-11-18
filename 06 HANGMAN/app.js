// *** VARIABLES *** //

//Arrays/objects:

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// const categories = ['films', 'music', 'countries', 'food', 'sports', 'names']
const categories = ['films', 'countries'];
const films = ['pulp fiction', 'titanic', 'interstellar', 'the godfather', 'fight club', 'inception', 'matrix', 'the pianist', 'psycho', 'gladiator', 'alien', 'toy story'];
const countries = ['sweden', 'gambia', 'china', 'colombia', 'brazil', 'croatia', 'ecuador', 'ethiopia', 'kazakhstan', 'luxembourg', 'maldives', 'south korea', 'united kingdom'];
const hints = {
    films: {
        'pulp fiction': 'Grease meets Tarantino', 
        titanic: 'Sea accident', 
        interstellar: 'Space and time travel', 
        'the godfather': 'Italian gangsters', 
        'fight club': "It's all in his head", 
        inception: 'A dream within a dream', 
        matrix: 'Red or blue', 
        'the pianist': 'Music saved him from death', 
        psycho: 'Insane', 
        gladiator: 'Eat or be eaten',
        alien: 'Space creature',
        'toy story': 'Cowboy, space ranger and friends'
    },
    
    countries: {
        sweden: 'Scandinavian country', 
        gambia: 'African country', 
        china: 'East asian country', 
        colombia: 'South american country', 
        brazil: 'South american country', 
        croatia: 'South european country', 
        ecuador: 'South american country', 
        ethiopia: 'African country', 
        kazakhstan: 'West asian and east european country', 
        luxembourg: 'Central european country',
        maldives: 'South east asian country',
        'south korea': 'East asian country',
        'united kingdom': 'West europan country'
    }
}

// DOM elements
const category = document.getElementById('category');
const hold = document.getElementById('hold');
const clue = document.getElementById('clue');
const playAgainBtn = document.getElementById('reset');
const hintBtn = document.getElementById('hint');

// Other
let randomCategory;
let word = [];
let unmodifiedWord = [];
let lifeCount = 10;
let win = false;
let hint;




// *** EVENT LISTENERS *** //
window.addEventListener('load', newGame)

playAgainBtn.addEventListener('click', refreshPage);

hintBtn.addEventListener('click', getHint);


// *** FUNCTIONS *** //
function newGame() {
    createStickmanDefault();
    createAlphabet();
    getCategory();
    getWord();
    createGuess();
    playGame();
    console.log(word);
}

function createStickmanDefault() {
    const canvas = document.getElementById('canvas');
    // ctx = context: getContext('2d' or '3d')
    const ctx = canvas.getContext('2d');

   
    // resize
    canvas.height = 220;
    canvas.width = 400;
}

function createAlphabet() {
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'alphabet');
    
    alphabet.forEach(function(letter) {
        const liEl = document.createElement('li');
        liEl.classList.add('letter');
        liEl.innerText = letter;
        ulEl.appendChild(liEl)
    })
    
    const buttons = document.getElementById('buttons');
    buttons.appendChild(ulEl);
    
}

function getCategory() {
    let randomNum = Math.floor(Math.random() * categories.length);
    randomCategory = categories[randomNum];
    hintCategory = randomCategory;
    category.innerText = randomCategory;
}

function getWord() {
    let item;

    if(randomCategory === 'films') {
        let randomNum = Math.floor(Math.random() * films.length);
        item = films[randomNum];
        hintWord = item;

        for (let i = 0; i < item.length; i++) {
            word.push(item[i]);
            unmodifiedWord.push(item[i]);
        }
        console.log(word);
    


    } else if (randomCategory === 'countries') {
        let randomNum = Math.floor(Math.random() * countries.length);
        item = countries[randomNum];
        hintWord = item;

        for (let i = 0; i < item.length; i++) {
            word.push(item[i]);
            unmodifiedWord.push(item[i]);
            
        }
        console.log(word);
    }
}

function createGuess(){
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'my-word');
    hold.appendChild(ulEl);

    for (let i = 0; i < word.length; i++) {
        const liEl = document.createElement('li');
        liEl.classList.add('guess');
        if(alphabet.includes(word[i])) {
            liEl.innerText = '_';
        } 
        ulEl.appendChild(liEl);
        
    }
}

function playGame(){

    // Choose letters:
    const buttons = document.getElementById('buttons');
    buttons.addEventListener('click', function(e) {
        let element = e.target
        if(!element.classList.contains('letter')) {
            return
        } else {
            // if letter does not exist in word:
            if(word.indexOf(element.innerText) === -1) {
                // lose 1 life:
                lifeCount --;
                // disable button
                element.style.pointerEvents = 'none';
                element.classList.add('disabled');
                console.log(word);

                    // draw stickman:
                    if(lifeCount === 9) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 8) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 7) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 6) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 5) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 4) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 3) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 2) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 1) {
                        createStickman(lifeCount);
                    } else if (lifeCount === 0) {
                        createStickman(lifeCount);
                        // lose game:
                        loseGame();
                    }

            } else  {
                // get index of letter in word
                let wordIndex = word.indexOf(element.innerText);
                // get that li element with the same index
                let liEl = hold.children[0].childNodes[wordIndex];
                // set the inner text of that element to the letter
                liEl.innerText = word[wordIndex];
                // set letter to null from word so that double letters can be used
                word[wordIndex] = null;
                console.log(word);

                // BUG
                winGame(word);

            }
        }
    })

}

function createStickman (lives) {
    const canvas = document.getElementById('canvas');
    // ctx = context: getContext('2d' or '3d')
    const ctx = canvas.getContext('2d');

   
    // resize
    canvas.height = 220;
    canvas.width = 400;

    // style
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;

    if(lifeCount === 9) {
         // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

    } else if (lifeCount === 8) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

    } else if (lifeCount === 7) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

    } else if (lifeCount === 6) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();


    } else if (lifeCount === 5) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

       
    } else if (lifeCount === 4) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

        // 6 (torso)
        ctx.beginPath();
        ctx.moveTo(130, 96);
        ctx.lineTo(130, 150);
        ctx.stroke();

       

    } else if (lifeCount === 3) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

        // 6 (torso)
        ctx.beginPath();
        ctx.moveTo(130, 96);
        ctx.lineTo(130, 150);
        ctx.stroke();

        // 7 (right arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(100, 140);
        ctx.stroke();

       

    } else if (lifeCount === 2) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

        // 6 (torso)
        ctx.beginPath();
        ctx.moveTo(130, 96);
        ctx.lineTo(130, 150);
        ctx.stroke();

        // 7 (right arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(100, 140);
        ctx.stroke();

        // 8 (left arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(160, 140);
        ctx.stroke();

        


    } else if (lifeCount === 1) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

        // 6 (torso)
        ctx.beginPath();
        ctx.moveTo(130, 96);
        ctx.lineTo(130, 150);
        ctx.stroke();

        // 7 (right arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(100, 140);
        ctx.stroke();

        // 8 (left arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(160, 140);
        ctx.stroke();

        // 9 (right leg)
        ctx.beginPath();
        ctx.moveTo(130, 150);
        ctx.lineTo(100, 180);
        ctx.stroke();

    }

    else if (lifeCount === 0) {
        // 1 (platform)
        ctx.beginPath();
        ctx.moveTo(10, 210);
        ctx.lineTo(200, 210);
        ctx.stroke();

        // 2 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 210);
        ctx.lineTo(30, 20);
        ctx.stroke();

        // 3 (rod)
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(130, 30);
        ctx.stroke();

        // 4 (line)
        ctx.beginPath();
        ctx.moveTo(130, 30);
        ctx.lineTo(130, 65);
        ctx.stroke();

        // 5 (head)
        ctx.beginPath();
        ctx.arc(130, 80, 16, 0, 2 * Math.PI);
        ctx.stroke();

        // 6 (torso)
        ctx.beginPath();
        ctx.moveTo(130, 96);
        ctx.lineTo(130, 150);
        ctx.stroke();

        // 7 (right arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(100, 140);
        ctx.stroke();

        // 8 (left arm)
        ctx.beginPath();
        ctx.moveTo(130, 100);
        ctx.lineTo(160, 140);
        ctx.stroke();

        // 9 (right leg)
        ctx.beginPath();
        ctx.moveTo(130, 150);
        ctx.lineTo(100, 180);
        ctx.stroke();

        // 10 (left leg)
        ctx.beginPath();
        ctx.moveTo(130, 150);
        ctx.lineTo(160, 180);
        ctx.stroke();
    }
   
}


function winGame(arr){
    
    let winState = arr.every((word) => {
        return word === null;
    })

    if(winState === true) {
        win = true;
        console.log(win);

        const letters = document.querySelectorAll('.letter');
        letters.forEach(function(letter) {
            letter.style.pointerEvents = 'none';
            letter.classList.add('disabled');
        })
    
    category.parentElement.children[0].innerText = 'You won!';
    category.parentElement.children[1].innerText = '';

    } else {
        win = false;
        console.log(win);
    }

    


}

function loseGame(){
    const letters = document.querySelectorAll('.letter');
        letters.forEach(function(letter) {
            letter.style.pointerEvents = 'none';
            letter.classList.add('disabled');
        })
    
        category.parentElement.children[0].innerText = 'You lost!';
        category.parentElement.children[1].innerText = '';

        // show right word:
        const underscores = document.querySelectorAll('.guess');
        let index = 0;
        underscores.forEach(function(underscore) {
            underscore.innerHTML = unmodifiedWord[index];
            underscore.style.color = 'red';
            index++;
        })
    
   
}

function getHint() {
    let hint;


    if(randomCategory === 'films') {
        hint = hints.films[hintWord];
    } else if(randomCategory === 'countries') {
        hint = hints.countries[hintWord];
    }

    clue.innerText = hint;
    hintBtn.style.pointerEvents = 'none';
    hintBtn.classList.add('disabled');
}

function resetGame(){
    // enable buttons: 
    const letters = document.querySelectorAll('.letter');
        letters.forEach(function(letter) {
            letter.style.pointerEvents = 'auto';
            letter.classList.remove('disabled');
        })

    // new category:
    category.parentElement.children[0].innerText = 'the chosen category is: ';
    getCategory();


    // new word:
    word = [];
    getWord();

    // remove clue:
    clue.innerText = 'Clue -';
    hintBtn.style.pointerEvents = 'auto';
    hintBtn.classList.remove('disabled');

    // reset hidden word:
    const hiddenWord = document.querySelectorAll('.guess');
    hiddenWord.forEach(function(letter) {
        letter.remove();
    })

    createGuess();

    // stickman:
    createStickmanDefault();

    // reset life count:
    lifeCount = 10;


    // restart game:
    playGame();
}

function refreshPage () {
    location.reload();
  }

