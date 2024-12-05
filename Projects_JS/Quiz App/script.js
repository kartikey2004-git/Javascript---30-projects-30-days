const questions = [
    {
        question: "What is the first thing that comes to mind when you think of me?",
        answers: [
            { text: "bhai hai tu", correct: true},
            { text: "careless", correct: false},
            { text: "dost hu", correct: false},
            { text: "bestfriend", correct: false},
        ]
    },
    {
        question: "Is there an area where you think I could improve? If yes! what would it be",
        answers: [
            { text: "self learning", correct: true},
            { text: "anger", correct: false},
            { text: "ego", correct: false},
            { text: " be kind ", correct: false},
        ]
    },
    {
        question: "Have you noticed any changes in me recently? If so, what they are",
        answers: [
            { text: "no", correct: false},
            { text: "yes", correct: false},
            { text: "a little bit", correct: false},
            { text: "everyone try to grown up", correct: true},
        ]
    },
    {
        question: "Describe me in one word",
        answers: [
            { text: "bhai", correct: false},
            { text: "best friend", correct: true},
            { text: "careless", correct: false},
            { text: "retarded", correct: false},
        ]
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();