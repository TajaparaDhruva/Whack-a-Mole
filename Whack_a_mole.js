// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

//Required variable
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var gameId = null;

//Common function

function webLoad(){
    onLoad();
    displayContent();
}

function onLoad(){
    var temp = localStorage.getItem('highScoreMole');
    if(temp != null){
        bestScore = temp;
    }
    else{
        bestScore = 0;
    }
};

function displayContent(){
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}

function endGame(){
    clearInterval(gameId);
    startBtn.disabled = false;
    playGame = false;
    if(score>bestScore){
        localStorage.setItem('highScoreMole',score);
        bestScore = score;
        alert(`you've score max value then previous one : ${score}`);
    }
    else{
        alert(`you're curent score is : ${score}`);
    }
    score = 0;
    displayContent();
}

function randomTime(min,max){
    return Math.floor(Math.random()*(max - min) + max);
}

function randomeHole(){
    var index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function popGame(){
    var timer = randomTime(500,1200);
    var hole =  randomeHole();
    var mole = hole.querySelector('.mole');
    if(playGame){
        mole.classList.add('up');
        setTimeout(function(){
        mole.classList.remove('up');
        popGame();
    },timer);
    }
}

function startGame(){
    time = 30;
    score = 0;
    startBtn.disabled = true;
    playGame =true;
    popGame();
    gameId = setInterval(function(){
        time--;
        if(time == 0){
          endGame();
        }
        displayContent();
    },1000);
}

function bonk(event){
    if(!event.isTrusted) return;
    if(playGame == false) return;
    if(event.target.classList.contains('up')){
        score++;
        displayContent();
        event.target.classList.remove('up');
        event.target.classList.add('bonked');
    }
    setTimeout(function(){
        event.target.classList.remove('bonked');
    },300);
}

webLoad();


moles.forEach((box)=>{
    box.addEventListener('click',bonk);
});

startBtn.addEventListener('click',startGame);

//ye utne time wait karke aek bar call karega


// // DOM Elements
// const scoreDisplay = document.querySelector('#score');
// const timeLeftDisplay = document.querySelector('#timeLeft');
// const maxScoreDisplay = document.querySelector('#maxScore');
// const startBtn = document.querySelector('#startBtn');
// const holes = document.querySelectorAll('.hole');
// const moles = document.querySelectorAll('.mole');

// // Variables
// var score = 0;
// var time = 30;
// var bestScore = 0;
// var life = 3;
// var playGame = false;
// var gameId = null;

// function webLoad() {
//     onLoad();
//     displayContent();
//     updateHearts();
// }

// function onLoad() {
//     var temp = localStorage.getItem('highScoreMole');
//     if (temp != null) bestScore = temp;
// }

// function displayContent() {
//     scoreDisplay.textContent = score;
//     timeLeftDisplay.textContent = time;
//     maxScoreDisplay.textContent = bestScore;
// }

// function updateHearts() {
//     let lifeLeft = document.getElementById("lifeLeft");
//     let hearts = "";

//     for (let i = 1; i <= 3; i++) {
//         if (i <= life) {
//             hearts += `<span>❤️</span>`;
//         } else {
//             hearts += `<span class="heart-lost">❤️</span>`;
//         }
//     }

//     lifeLeft.innerHTML = hearts;
// }

// function endGame() {
//     clearInterval(gameId);
//     playGame = false;
//     startBtn.disabled = false;

//     if (life <= 0) {
//         alert("Game Over! You lost all your lives 😔");
//     } else if (score > bestScore) {
//         localStorage.setItem('highScoreMole', score);
//         bestScore = score;
//         alert(`New High Score: ${score}`);
//     } else {
//         alert(`Your Score: ${score}`);
//     }
//     score = 0;
//     life = 3;
//     displayContent();
//     updateHearts();
// }

// function randomTime(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// function randomeHole() {
//     var index = Math.floor(Math.random() * holes.length);
//     return holes[index];
// }

// function popGame() {
//     var timer = randomTime(500, 1200);
//     var hole = randomeHole();
//     var mole = hole.querySelector('.mole');

//     if (playGame) {
//         mole.classList.add('up');

//         setTimeout(function () {

//             // If player didn't click
//             if (mole.classList.contains('up')) {
//                 mole.classList.remove('up');
//                 life--;
//                 updateHearts();

//                 if (life <= 0) {
//                     endGame();
//                     return;
//                 }
//             }

//             popGame();

//         }, timer);
//     }
// }

// function startGame() {
//     time = 30;
//     score = 0;
//     life = 3;
//     startBtn.disabled = true;
//     playGame = true;

//     displayContent();
//     updateHearts();
//     popGame();

//     gameId = setInterval(function () {
//         time--;
//         displayContent();

//         if (time == 0) {
//             endGame();
//         }

//     }, 1000);
// }

// function bonk(event) {
//     if (!event.isTrusted) return;
//     if (!playGame) return;

//     if (event.target.classList.contains('up')) {
//         score++;
//         event.target.classList.remove('up');
//         event.target.classList.add('bonked');
//         displayContent();
//     }

//     setTimeout(() => {
//         event.target.classList.remove('bonked');
//     }, 300);
// }

// webLoad();

// moles.forEach(mole => {
//     mole.addEventListener('click', bonk);
// });

// startBtn.addEventListener('click', startGame);
