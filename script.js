var questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
      correct: 0
    },
    {
      question: "What does CSS stand for?",
      choices: ["Counter Strike: Source", "Corrective Style Sheet", "Cascading Style Sheet"],
      correct: 2
    },
    {
      question: "Which of the following is a JavaScript framework?",
      choices: ["React", "Angular", "Vue", "All of the above"],
      correct: 3
    }
  ];

  let currentQuestionIndex = 0;
  let timer;
  let score = 0;
  let timeLeft = 60;

  var startBtn = document.getElementById('start');
  var quizContainer = document.getElementById('questions');
  var questionElement = document.getElementById('question-title');
  var choicesElement = document.getElementById('choices');
  var feedbackElement = document.getElementById('feedback');
  var timerElement = document.getElementById('time');
  var submitBtn = document.getElementById('submit');
  var endScreen = document.getElementById('end-screen');
  var finalScoreElement = document.getElementById('final-score');
  var initialsElement = document.getElementById('initials');

  startBtn.addEventListener('click', startQuiz);
  submitBtn.addEventListener('click', saveScore);

  function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    startTimer();
    showQuestion();
  }

  function startTimer() {
    timer = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach(function(choice, index) {
      const button = document.createElement('button');
      button.textContent = choice;
      button.addEventListener('click', function() {
        checkAnswer(index);
      });
      choicesElement.appendChild(button);
    });
  }

  function checkAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choiceIndex === currentQuestion.correct) {
      feedbackElement.textContent = 'Correct!';
      score++;
    } else {
      feedbackElement.textContent = 'Incorrect!';
      timeLeft -= 10; // Penalty for incorrect answer
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }

  function endGame() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    endScreen.style.display = 'block';
    finalScoreElement.textContent = score;
  }

  function saveScore() {
    const initials = initialsElement.value.toUpperCase();
    if (initials) {
      // You can save the score or perform further actions here
      alert(`Score saved for ${initials}: ${score}`);
      // For simplicity, just reset the game for now
      resetGame();
    } else {
      alert("Please enter your initials.");
    }
  }

  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    startBtn.style.display = 'block';
    quizContainer.style.display = 'none';
    endScreen.style.display = 'none';
    timerElement.textContent = timeLeft;
    initialsElement.value = '';
  }