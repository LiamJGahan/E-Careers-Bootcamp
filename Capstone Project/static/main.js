let totalQuestions = 0
let score = 0
let quizSelection = 1
let currentQuestion = 0
let currentViewID = 1
let questionsAndChoices = []
let answers = []
let currentOptionA = []
let currentOptionB = []
let currentOptionC = []


// populate quiz selection buttons in home
function getQuiz(){
    const url = 'http://localhost:5002/api/quizzes'
    fetch(url)
    .then(response => response.json())
     .then(data => {
         if(data.length > 0){
            quizOptions = document.getElementById('quizzes')
            quizOptions.innerHTML = ""
            data.forEach((quiz) =>{

                let postElement = document.createElement('div')
                postElement.className = 'card mb-3'

                postElement.innerHTML = '<button onclick="selectQuiz('+ quiz.id +')" class="btn btn-primary">'+ quiz.title +'</button>'    

                quizOptions.appendChild(postElement)
            })
         }
     })
    .catch(error => {
        console.log(error)
    })
}

// change html page to quiz page with chosen quiz loaded
function selectQuiz(quizID){
    localStorage.quizSelection = quizID
    document.location.href = 
    'file:///C:/Users/Liam/Desktop/E-Careers-Bootcamp/Capstone%20Project/templates/quiz.html?'
}

// get/store question and choices
function getQuestions(){
    const url = 'http://localhost:5002/api/quizzes/'+ localStorage.quizSelection + '/questions'
    fetch(url)
    .then(response => response.json())
     .then(data => {
         if(data.length > 0){
            questionsAndChoices = data     
            calcTotalNumberOfQuestions()         
         }
         renderQuestions()
     })
    .catch(error => {
        console.log(error)
    })
}

function calcTotalNumberOfQuestions(){
    uniqueIDCount = []
    questionsAndChoices.forEach((choice) => {
        if (!uniqueIDCount.includes(choice.question_id)){
            uniqueIDCount.push(choice.question_id)
        }
    })
    localStorage.totalQuestions = uniqueIDCount.length
}

// render question and choices to quiz
function renderQuestions(){
    let questionText = document.getElementById('question')
    let choiceA = document.getElementById('choiceA')
    let choiceB = document.getElementById('choiceB')
    let choiceC = document.getElementById('choiceC')
    let choiceCounter = 1

    if(currentQuestion == 0){
        currentQuestion = questionsAndChoices[0].question_id
    }

    questionsAndChoices.forEach((question) =>{
        if(currentQuestion == question.question_id){
            if(choiceCounter == 1){
                questionText.innerHTML = question.question_text
                choiceA.innerHTML = question.choice_text
                currentOptionA = {'question_id':question.question_id, 'choice_id':question.id}
            }
            if(choiceCounter == 2){
                choiceB.innerHTML = question.choice_text
                currentOptionB = {'question_id':question.question_id, 'choice_id':question.id}
            }
            if(choiceCounter == 3){
                choiceC.innerHTML = question.choice_text
                currentOptionC = {'question_id':question.question_id, 'choice_id':question.id}
            }

            choiceCounter += 1
        }
    })
}

// add a choice selection to answers array
function setAnswer(choice){
    switch(choice){
        case 1:
            answers.push(currentOptionA)
            break;
        case 2:
            answers.push(currentOptionB)
            break;
        case 3:
            answers.push(currentOptionC)
            break;        
    }
 
    nextQuestion()
}

// select next question in quiz for rendering
function nextQuestion(){
    if (currentViewID < localStorage.totalQuestions){
        currentQuestion += 1
        currentViewID += 1
        renderQuestions()
    }
    else{
        submitAnswers()
    }
} // ensure the next is not allowed till selection

// create answers JSON object and send to API for return calculation 
function submitAnswers(){
    fetch('http://localhost:5002/api/submit', {
        method: "POST",
        body: JSON.stringify({
            'quiz_id': localStorage.quizSelection,
            'user_answers': answers
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => {
        if (!response.ok) {
            console.error('Request Error', response.status)
            return;
        }
        return response.json();
    })
    .then((json) =>  openScore(json))
    .catch((error) => console.error('Fetch Error:', error))

} // check the answers given are not more or less then questions

function openScore(json){
    localStorage.score = json
    document.location.href = 
    'file:///C:/Users/Liam/Desktop/E-Careers-Bootcamp/Capstone%20Project/templates/score.html?'
}

function renderScore(){
    document.getElementById('score').innerHTML = 
    '<h1 class="mt-5">'+ localStorage.totalQuestions +'' + '/' + ''+ localStorage.score +'</h1>' +
    '<button onclick="returnHome()" class="btn btn-primary">Home</button>'
}

function returnHome(){
    localStorage.quizSelection = 1
    localStorage.totalQuestions = 0
    localStorage.score = 0
    document.location.href = 
    'file:///C:/Users/Liam/Desktop/E-Careers-Bootcamp/Capstone%20Project/templates/home.html?'
}
