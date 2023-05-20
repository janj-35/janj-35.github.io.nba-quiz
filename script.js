const questions = [
    {
        question: "Who is the all-time leading scorer?",
        options: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Kobe Bryant"],
        correctIndex: 2},
    {
        question: "Which player had the best free-throw percentage in a single season?",
        options: ["Stephen Curry", "José Calderón", "Damian Lillard", "Steve Nash"],
        correctIndex: 1
    },
    {
        question: "Who was selected 41st in the 2014 NBA Draft?",
        options: ["Aaron Gordon", "Edy Tavares", "Nikola Jokic", "Andrew Wiggins"],
        correctIndex: 2
    },
    {
        question: "Who is the all-time leader in 3 pointers made?",
        options: ["Ray Allen", "James Harden", "Reggie Miller", "Stephen Curry"],
        correctIndex: 3
    },
    {
        question: "Which team achieved a record of 73 wins and 9 loses in a regular season?",
        options: ["2016 G.S Warriors", "2007 D. Mavericks", "1972 L.A Lakers", "1996 C. Bulls"],
        correctIndex: 0
    },
    {
        question: "Who was the first european player to win the MVP award?",
        options: ["Pau Gasol", "Dirk Nowitzki", "Nikola Jokic", "Giannis Antetokounmpo"],
        correctIndex: 1
    },
    {
        question: "Which of the following cities used to host an NBA team?",
        options: ["Las Vegas", "Austin", "Seattle", "Mississippi"],
        correctIndex: 2
    },
    {
        question: "Which team doesn't wear a red jersey?",
        options: ["Philadelphia 76ers", "Chicago Bulls", "New Orleans Pelicans", "Phoenix Suns"],
        correctIndex: 3
    },
    {
        question: "Which of the following spanish players hasn't been in the NBA?",
        options: ["Chacho Rodriguez", "Victor Claver", "Rudy Fernandez", "Sergio Llull"],
        correctIndex: 3
    },
    {
        question: "Who scored 81 points in a single game?",
        options: ["Devin Booker", "Carmelo Anthony", "Damian Lillard", "Kobe Bryant"],
        correctIndex: 3
    },
    {
        question: "Who is the G.O.A.T?",
        options: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Kevin Durant"],
        correctIndex: 0
    },
];

let currentQuestionIndex = 0;
let correctCount = 0;
let timerInterval;

const startButton = document.getElementById("start-button");
const instructionsTab = document.getElementById("instructions");
const quizSection = document.querySelector(".quiz");

startButton.addEventListener("click", startGame);

function startGame() {
  instructionsTab.style.display = "none";
  quizSection.style.display = "block";
  presentQuestion();
  startTimer();
}

function startTimer() {
  const shotClock = document.getElementById("shotClock");
  let time = 24;

  shotClock.textContent = time;

  timerInterval = setInterval(function() {
    time--;
    shotClock.textContent = time;

    if (time === 0) {
      stopTimer();
      markAnswerAsWrong();
      setTimeout(presentNextQuestion, 3000);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function presentQuestion() {
  const questionElement = document.getElementById("question");
  const optionButtons = document.querySelectorAll(".option-box");

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].textContent = currentQuestion.options[i];
    optionButtons[i].style.backgroundColor = "";
    optionButtons[i].disabled = false;
    optionButtons[i].addEventListener("click", function() {
      stopTimer();
      checkAnswer(i);
    });
  }
}

function checkAnswer(selectedOption) {
  const isCorrect = selectedOption === questions[currentQuestionIndex].correctIndex;
  showAnswer(selectedOption, isCorrect);

  setTimeout(presentNextQuestion, 3000);
}

function showAnswer(selectedOption, isCorrect) {
  const optionButtons = document.querySelectorAll(".option-box");

  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = true;

    if (i === selectedOption) {
      optionButtons[i].style.backgroundColor = isCorrect ? "green" : "red";
    }

    if (i === questions[currentQuestionIndex].correctIndex) {
      optionButtons[i].style.backgroundColor = "green";
    }
  }

  if (isCorrect) {
    correctCount++;
    document.getElementById("correctCount").textContent = correctCount;
  }
}

function markAnswerAsWrong() {
  const optionButtons = document.querySelectorAll(".option-box");

  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = true;

    if (i === questions[currentQuestionIndex].correctIndex) {
      optionButtons[i].style.backgroundColor = "green";
    }
  }
}

function presentNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex <= questions.length) {
    presentQuestion();
    startTimer();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  alert("Final Score: " + correctCount);
}