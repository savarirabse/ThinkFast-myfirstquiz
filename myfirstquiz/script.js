const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container'); 
const scoreText = document.getElementById('final-score'); 

let shuffleQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  scoreContainer.classList.add('hide'); 
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  quizScore = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  if (correct) {
    quizScore++;
  }

  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showFinalScore(); 
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showFinalScore() {
  questionContainerElement.classList.add('hide');
  scoreText.innerText = `You scored ${quizScore} out of ${questions.length}!`;
  scoreContainer.classList.remove('hide');
  startButton.innerText = "Restart";
  startButton.classList.remove('hide');
}

const questions = [
  {
    question: 'Square of 5?',
    answers: [
      { text: '65', correct: false },
      { text: '15', correct: false },
      { text: '25', correct: true },
      { text: '85', correct: false }
    ]
  },
  {
    question: 'Which one is JS Framework?',
    answers: [
      { text: 'React', correct: true },
      { text: 'Django', correct: false },
      { text: 'Python', correct: false },
      { text: 'Eclipse', correct: false }
    ]
  },
  {
    question: 'Capital of India?',
    answers: [
      { text: 'Karnataka', correct: false },
      { text: 'Uttar Pradesh', correct: false },
      { text: 'Mumbai', correct: false },
      { text: 'Delhi', correct: true }
    ]
  },
  {
    question: 'Prime Minister of India?',
    answers: [
      { text: 'Mahatma Gandhi', correct: false },
      { text: 'Indira Gandhi', correct: false },
      { text: 'Rahul Gandhi', correct: false },
      { text: 'Narendra Modi', correct: true }
    ]
  }
];
