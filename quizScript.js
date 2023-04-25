//getting all required elements
const start_button = document.querySelector(".start_button button");
const information_box = document.querySelector(".information_box");
const exit_button = information_box.querySelector(".buttons .exit");
const continue_button = information_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_seconds");
const timeLeft = document.getElementById("time_left_seconds");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const answers = document.querySelector(".answer_list");

let remainingTime;
//if start quiz button clicked
start_button.onclick = ()=>{
    information_box.classList.add("activeInfo");//show info box
}

//if exit button clicked
exit_button.onclick = ()=>{
    information_box.classList.remove("activeInfo");//hide info box
}

//if continue button clicked
continue_button.onclick = ()=>{
    information_box.classList.remove("activeInfo");//hide info box
    quiz_box.classList.add("activeQuiz");//show quiz box
    showQuestions(0);
    questionCounter(1);
    startTimer(60);
    startTimerLine(0)
}

let question_count = 0;
let question_number = 1;
let counter;
let counterLine;
let widthValue = 0;
let userScore = 0;

const next_button = quiz_box.querySelector(".next_button");
const result_box = document.querySelector(".result_box");
const continue_quiz = result_box.querySelector(".buttons .continue");
const exit_quiz = result_box.querySelector(".buttons .exit");

// function when replay button click
continue_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    question_count = 0;
    question_number = 1;
    counterLine;
    widthValue = 0;
    userScore = 0;
    showQuestions(question_count);
    questionCounter(question_number);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    startTimer(60);
    next_button.classList.remove("show");
    timeOff.textContent = "Time Left";
}

exit_quiz.onclick = ()=>{
    window.location.reload();
}

//if next button clicked
next_button.onclick = ()=>{
   if (question_count < questions_list.length - 1 ){
    question_count++;
    question_number++;
    showQuestions(question_count);
    questionCounter(question_number);
    // clearInterval(counterLine);
    // startTimerLine(widthValue);
    next_button.style.display = "none";
    timeOff.textContent = "Time Left";
    }else{
    console.log("Questions completed");
    showResultBox();
   }
}

//getting questions and options from array
function showQuestions(index){
    const questions = document.querySelector(".questions");
    let question_tag = '<span>'+ questions_list[index].number + ". " + questions_list[index].question_type +'</span>';
    let answer_tag = '<div class="answers">'+ questions_list[index].options[0] +'<span></span></div>'
                    + '<div class="answers">'+ questions_list[index].options[1] +'<span></span></div>'
                    + '<div class="answers">'+ questions_list[index].options[2] +'<span></span></div>'
                    + '<div class="answers">'+ questions_list[index].options[3] +'<span></span></div>';
    questions.innerHTML =  question_tag;
    answers.innerHTML =  answer_tag;
    const option = answers.querySelectorAll(".answers");
    for(let i =0; i< option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
        
    }
}

let tick = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let cross = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    // clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions_list[question_count].answer;
    let allOptions = answers.children.length;
    if(userAnswer == correctAnswer){
        userScore += 1;
        answer.classList.add("correct");
        console.log("Answer is correct.");
        answer.insertAdjacentHTML("beforeend", tick);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is incorrect.");
        answer.insertAdjacentHTML("beforeend", cross);

        //if answer is incorrect, automatically selected the correct answer
        for(let i = 0; i < allOptions; i++){
            if(answers.children[i].textContent == correctAnswer){
                answers.children[i].setAttribute("class","answers correct");
                answers.children[i].insertAdjacentHTML("beforeend", tick);
            }
        }
    }

    //once user selected a answer disabled all other options
    for(let i = 0; i < allOptions; i++){
        answers.children[i].classList.add("disabled");
    }
    next_button.style.display = "block";
}

function showResultBox(){
    information_box.classList.remove("activeInfo");//hide info box
    quiz_box.classList.remove("activeQuiz");//hide quiz box
    result_box.classList.add("activeResult");//show the result box
    const scoreText = result_box.querySelector(".score_text");
    const scoreIcon = document.querySelector(".icon-img");
    timeLeft.textContent = (60 - remainingTime).toString() + " Seconds.";

    if(userScore > 8 ){
        let scoreTag = '<span>Congratulations!! You got <p>'+ userScore +'</p> out of <p>'+ questions_list.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        scoreText.style.color = "green";
        scoreIcon.classList.add("fa-crown");
        scoreIcon.classList.remove("fa-thumbs-up");
        scoreIcon.classList.remove("fa-face-sad-tear");
    }
    else if(userScore > 5 ){
        let scoreTag = '<span>Good & Keep Working!! You got <p>'+ userScore +'</p> out of <p>'+ questions_list.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        scoreText.style.color = "orange";
        scoreIcon.classList.add("fa-thumbs-up");
        scoreIcon.classList.remove("fa-crown");
        scoreIcon.classList.remove("fa-face-sad-tear");
    }
    else{
        let scoreTag = '<span>OOPS! & sorry  You got only <p>'+ userScore +'</p> out of <p>'+ questions_list.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        scoreText.style.color = "red";
        scoreIcon.classList.remove("fa-crown");
        scoreIcon.classList.remove("fa-thumbs-up");
        scoreIcon.classList.add("fa-face-sad-tear");
        
        
    }

}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        remainingTime = time;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            // let correctAnswer = questions_list[question_count].answer;
            let allOptions = answers.children.length;

            // for(let i = 0; i < allOptions; i++){
            //     if(answers.children[i].textContent == correctAnswer){
            //         answers.children[i].setAttribute("class","answers correct");
            //         answers.children[i].insertAdjacentHTML("beforeend", tick);
            //     }
            // }
           

            for(let i = 0; i < allOptions; i++){
                answers.children[i].classList.add("disabled");
            }
            showResultBox();
            next_button.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer,110);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
           clearInterval(counterLine);
        }
    }
}

function questionCounter(index){
    const bottom_question_counter = quiz_box.querySelector(".total_questions");
    let totalQuestionCountTag = '<span><p>'+ index +'</p>of<p>'+ questions_list.length +'</p>Questions</span>';
    bottom_question_counter.innerHTML = totalQuestionCountTag;
}