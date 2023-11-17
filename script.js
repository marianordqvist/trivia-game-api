const url = "https://trivia-by-api-ninjas.p.rapidapi.com/v1/trivia";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d4df5d977bmsh318d5d8cb6d3887p11b55ajsnfc34389c54e5",
    "X-RapidAPI-Host": "trivia-by-api-ninjas.p.rapidapi.com",
  },
};

//state variables
let correctAnswerEl;
let score = parseInt(localStorage.getItem("score")) || 0;

//element variables
let questionEl = document.querySelector("#question");
let playersGuessEl = document.querySelector("#answer");
let submitButtonEl = document.querySelector(".submitBtn");
let resultMessage = document.querySelector("#resultMessage");
let playAgainButtonEl = document.querySelector(".playAgainBtn");
let scoreMessageEl = document.querySelector("#score");
scoreMessageEl.textContent = "Score: " + score;
let clearScoreButtonEl = document.querySelector("#clearScoreBtn");

//logic

//get question from api
async function getData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let questionTextEl = result[0].question;
    correctAnswerEl = result[0].answer;

    //add a question mark if there is none from the api
    if (!questionTextEl.endsWith("?")) {
      questionTextEl += "?";
    }

    //display question
    questionEl.innerText = "Question: " + questionTextEl;

    console.log(result[0].answer);
  } catch (error) {
    console.error(error);
  }
}

getData();

//Check answer
function checkGuess() {
  let userGuess = playersGuessEl.value;

  if (userGuess.toLowerCase() === correctAnswerEl.toLowerCase()) {
    resultMessage.innerHTML = "That was the correct answer!";
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

//hides submit button and shows play again button
function stopGuess() {
  submitButtonEl.classList.toggle("submitBtn-hide");
  playAgainButtonEl.classList.toggle("playAgainBtn-show");
}

// eventlisteners

submitButtonEl.addEventListener("click", function (e) {
  e.preventDefault();
  checkGuess();
});

playAgainButtonEl.addEventListener("click", function () {
  getData();
  resultMessage.textContent = "";
  stopGuess();

  // clear input field
  playersGuessEl.value = "";
});

clearScoreButtonEl.addEventListener("click", function () {
  score = 0;
  localStorage.setItem("score", score);
  scoreMessageEl.textContent = "Score: " + score;
});
