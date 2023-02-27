const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingTime = 1;
let time = startingTime * 60;
let myInterval;
let shuffledQuestions, currentQuestionIndex
const txt1 = document.getElementById('initials');
const inputButton=document.getElementById('inputButton');
const textOutput=document.getElementById('output1');
const countdownEl = document.getElementById('countdown');

// setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
    if(time < 0){
        clearInterval(myInterval)
    }

}

startButton.addEventListener('click', startGame)

function startGame(){

    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    myInterval = setInterval(updateCountdown, 1000);
    // clearInterval(myInterval)
}

function setNextQuestion(){
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    answerButtonsElement.innerHTML= ""
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.append(button)
    })
  }

function selectAnswer(event){
    currentQuestionIndex++ //index =index+1
    if(!event.target.dataset.correct){
        time = time - 10
    }


    if(questions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } else{
        alert("game over")
        'game over' 
        clearInterval(myInterval)
    }
    
}

const questions=[
    {
        question: 'How many rings were given to the Dwarves in The Lord Of The Rings?',
        answers:[
            { text: '7', correct: true },
            { text: '3', correct: false },
            { text: '9', correct: false },
            { text: '1', correct: false }
        ]
    },

    {
        question: 'How many houses are there at Hogworts?',
        answers:[
 
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '0', correct: false }
        ]
    },
    {
        question: 'What color was Has Solos light saber??',
        answers:[
            { text: 'Green', correct: false },
            { text: 'Blue', correct: false },
            { text: 'Red', correct: false },
            { text: 'He didnt have one.', correct: true }
        ]
    },
    {
        question: 'How many dragons did Daenerys Targaryen have in Game of Thrones?',
        answers:[
            { text: '3', correct: true },
            { text: '2', correct: false },
            { text: '17', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'What game do the kids from Stanger Things love to play?',
        answers:[
            { text: 'Uno', correct: false },
            { text: 'Candy Land', correct: false },
            { text: 'Dungeons and Dragons', correct: true },
            { text: 'Texas Hold`em', correct: false }
        ]
    }
]

function inputTextSpot(){
    var initials = txt1.value;
    // console.log('hello')
    localStorage.setItem('score', initials)
    // console.log(score)
    localStorage.setItem('timeLeft', time)
    console.log(time)
}

function displayScore(){
    var score = localStorage.getItem('score')
    var time = localStorage.getItem('timeLeft')
    document.getElementById('high-score').textContent = score + time

}

inputButton.addEventListener('click', inputTextSpot);

document.getElementById('high-score-btn').addEventListener('click', displayScore);