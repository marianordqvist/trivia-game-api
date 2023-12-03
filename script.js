const url = "https://quiz26.p.rapidapi.com/questions";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d4df5d977bmsh318d5d8cb6d3887p11b55ajsnfc34389c54e5",
    "X-RapidAPI-Host": "quiz26.p.rapidapi.com",
  },
};

//state variables
let correctAnswerEl;
let score = parseInt(localStorage.getItem("score")) || 0;
let randomIndex;
let playerGuessValue;

//element variables
let questionEl = document.querySelector("#question");
let answerButtonsEl = document.querySelector(".answer-buttons");
let playAgainButtonEl = document.querySelector(".playAgainBtn");
let submitBtnAEl = document.querySelector("#answerBtnA");
let submitBtnBEl = document.querySelector("#answerBtnB");
let submitBtnCEl = document.querySelector("#answerBtnC");
let submitBtnDEl = document.querySelector("#answerBtnD");
let resultMessage = document.querySelector("#resultMessage");
let scoreMessageEl = document.querySelector("#score");
let clearScoreButtonEl = document.querySelector("#clearScoreBtn");

//logic

//get questions & answers from api

async function getData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);

    randomIndex = Math.floor(Math.random() * result.length);
    console.log("random index: " + randomIndex);

    let questionTextEl = result[randomIndex].question;
    correctAnswerEl = result[randomIndex].answer;
    let answerA = result[randomIndex].A;
    let answerB = result[randomIndex].B;
    let answerC = result[randomIndex].C;
    let answerD = result[randomIndex].D;
    console.log("correct answer:" + correctAnswerEl);

    console.log("Updating question:" + questionTextEl);
    //display question
    questionEl.innerText = "Question: " + questionTextEl;

    // display answers

    submitBtnAEl.textContent = "A: " + answerA;
    submitBtnBEl.textContent = "B: " + answerB;
    submitBtnCEl.textContent = "C: " + answerC;
    submitBtnDEl.textContent = "D: " + answerD;
  } catch (error) {
    console.error(error);
  }
}

getData();

//Check answer
function checkGuess() {
  if (playerGuessValue === correctAnswerEl) {
    resultMessage.innerHTML = "Correct!";
    score += 1;
    localStorage.setItem("score", score);
    let storedScore = localStorage.getItem("score");
    scoreMessageEl.textContent = "Score:" + score;
    stopGuess();
  } else {
    resultMessage.textContent = `Incorrect! The correct answer was ${correctAnswerEl}.`;
    stopGuess();
  }
}

//hides answer buttons and shows play again button
function stopGuess() {
  playAgainButtonEl.classList.toggle("playAgainBtn-show");
}

// eventlisteners

submitBtnAEl.addEventListener("click", function (e) {
  e.preventDefault();
  playerGuessValue = "A";
  checkGuess();
});

submitBtnBEl.addEventListener("click", function (e) {
  e.preventDefault();
  playerGuessValue = "B";
  checkGuess();
});

submitBtnCEl.addEventListener("click", function (e) {
  e.preventDefault();
  playerGuessValue = "C";
  checkGuess();
});

submitBtnDEl.addEventListener("click", function (e) {
  e.preventDefault();
  playerGuessValue = "D";
  checkGuess();
});

playAgainButtonEl.addEventListener("click", function () {
  resultMessage.textContent = "";
  stopGuess();
  getData();
});

clearScoreButtonEl.addEventListener("click", function () {
  score = 0;
  localStorage.setItem("score", score);
  scoreMessageEl.textContent = "Score: " + score;
});
