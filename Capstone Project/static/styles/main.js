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

                let element = document.createElement('div')
                element.className = 'card mb-3'

                element.innerHTML = '<button onclick="selectQuiz('+ quiz.id +')" class="btn btn-primary">'+ quiz.title +'</button>'    

                quizOptions.appendChild(element)
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
    './../templates/quiz.html?'
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
    let home = document.getElementById('home')
    let choiceCounter = 1

    if(currentQuestion == 0){
        currentQuestion = questionsAndChoices[0].question_id
    }

    quizPanel = document.getElementById('quizPanel')

    questionsAndChoices.forEach((question) =>{
        if(currentQuestion == question.question_id){
            if(choiceCounter == 1){
                if (questionText == null){
                    let element = document.createElement('div')
                    element.className = "container"
                    element.innerHTML = '<h3 id="question" class="mt-5">'+ question.question_text +'</h3><br><br>'
                    quizPanel.appendChild(element)
                }
                else{
                    questionText.innerHTML = question.question_text
                }
               
                if (choiceA == null){
                    let element = document.createElement('div')
                    element.className = 'card mb-3'                    
                    element.innerHTML = '<button id="choiceA" onclick="setAnswer(1)" class="btn btn-primary">'+ question.choice_text +'</button>'
                    quizPanel.appendChild(element)
                    currentOptionA = {'question_id':question.question_id, 'choice_id':question.id}
                }
                else{
                    choiceA.innerHTML = question.choice_text
                    currentOptionA = {'question_id':question.question_id, 'choice_id':question.id}
                }
            }
            if(choiceCounter == 2){
                if (choiceB == null){
                    let element = document.createElement('div')
                    element.className = 'card mb-3'                    
                    element.innerHTML = '<button id="choiceB" onclick="setAnswer(2)" class="btn btn-primary">'+ question.choice_text +'</button>'
                    quizPanel.appendChild(element)
                    currentOptionB = {'question_id':question.question_id, 'choice_id':question.id}
                }
                else{
                    choiceB.innerHTML = question.choice_text
                    currentOptionB = {'question_id':question.question_id, 'choice_id':question.id}
                }
            }
            if(choiceCounter == 3){
                if (choiceC == null){
                    let element = document.createElement('div')
                    element.className = 'card mb-3'
                    element.innerHTML = '<button id="choiceC" onclick="setAnswer(3)" class="btn btn-primary">'+ question.choice_text +'</button>'
                    quizPanel.appendChild(element)
                    currentOptionC = {'question_id':question.question_id, 'choice_id':question.id}
                }
                else{
                    choiceC.innerHTML = question.choice_text
                    currentOptionC = {'question_id':question.question_id, 'choice_id':question.id}
                }
            }
            choiceCounter += 1
        }
    })

    if (home == null){
        let element = document.createElement('div')
        element.className = "container"
        element.innerHTML = '<br><br><button id="home" onclick="returnHome()" class="btn btn-primary">Home</button> <button id="skip" onclick="skipQuestion()" class="btn btn-primary">Skip</button>'
        quizPanel.appendChild(element)
    }
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

function skipQuestion(){
    answers.push({'question_id':0, 'choice_id':0})
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
    localStorage.score = json.score
    document.location.href = 
    './../templates/score.html'
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
    './../templates/home.html'
}
