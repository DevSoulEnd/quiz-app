const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".quit")
const continue_btn = document.querySelector(".restart")
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timerCount = document.querySelector(".timer_sec");

start_btn.addEventListener("click", ()=>{
    info_box.classList.add("active");
});


exit_btn.addEventListener("click" , ()=>{
    info_box.classList.remove("active");
});

continue_btn.addEventListener("click" , ()=>{
    info_box.classList.remove("active");
    quiz_box.classList.add("active")
    loadQuestions(0);
    footerCount(1);
    countdownTimer(20);
    next_btn.style.display = "none";
});



let que_count = 0;
let que_numb = 1;
let counter;
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector("._result_box");

next_btn.addEventListener("click" , ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        loadQuestions(que_count);
        footerCount(que_numb);
        clearInterval(counter);
        countdownTimer(20);
        next_btn.style.display = "none";
    }
    else{
        console.log("questions are finished")
        showResult();
    }
});

function loadQuestions(index){
    const question_text = document.querySelector(".que_text");
    const question_tag = `<span>` + questions[index].numb + "." + questions[index].question +`</span>`;
    option_tag = `<div class="option"><span>`+ questions[index].options[0] +`</span></div>` +
                `<div class="option"><span>`+ questions[index].options[1] +`</span></div>` +
                `<div class="option"><span>`+ questions[index].options[2] +`</span></div>` +
                `<div class="option"><span>`+ questions[index].options[3] +`</span></div>`;
    
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const options = option_list.querySelectorAll(".option");

    options.forEach(function(option){
        option.setAttribute("onclick", "optionSelected(this)");
    });
}

let iconTick =  `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let iconCross = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer){
    clearInterval(counter)
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if (userAns == correctAns){
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", iconTick)
        console.log("answer is correct")
    }
    else{
        answer.classList.add("wrong")
        answer.insertAdjacentHTML("beforeend", iconCross)
        for (i=0; i < allOptions ; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class" , "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", iconTick)
            }
            
        }
    }

    for (i=0; i < allOptions ; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";

    
}

function showResult(){
    info_box.classList.remove("active")
    quiz_box.classList.remove("active");
    result_box.classList.add("active");
}


function countdownTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timerCount.textContent = time;
        time--;
        if(time<9){
            let addZero = timerCount.textContent;
            timerCount.textContent = "0" + addZero;
        }
        if(time<0){
            clearInterval(counter);
            timerCount.textContent = "0";
            
        }
    }
}


function footerCount(footer){
    const footerQuestions = quiz_box.querySelector(".total_que");
    const footerTag =  `<span><p>`+ que_numb +`</p> of <p>`+ questions.length+`</p> Questions</span>`;
    footerQuestions.innerHTML = footerTag;
}