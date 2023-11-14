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
let score = 0;

//element variables
let questionEl = document.querySelector("#question");
let playersGuessEl = document.querySelector("#answer");
let submitButtonEl = document.querySelector("#submitBtn");
let resultMessage = document.querySelector("#resultMessage");
let playAgainButtonEl = document.querySelector("#playAgainBtn");
let scoreMessageEl = document.querySelector("#score");
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
    scoreMessageEl.textContent = "your sscore is:" + score;
  } else {
    resultMessage.innerHTML = "That was incorrect..";
  }
}
//eventlisteners
submitButtonEl.addEventListener("click", function (e) {
  e.preventDefault();
  checkGuess();
});

playAgainButtonEl.addEventListener("click", function () {
  window.location.reload();
});
