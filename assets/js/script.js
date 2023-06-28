

// quiz qustions 
var questions = [
  {
    question: "1. Which of the following is true about variable naming conventions in JavaScript?",
    answ: ["A - JavaScript variable names must begin with a letter or the underscore character.",
      "B - JavaScript variable names are case sensitive.", "C - Both of the above.", "D - None of the above."],
    correct: 2
  },
  {
    question: "2. JavaScript File Has An Extension of:",
    answ: ["A - .Java", "B - .Js", "C - .javascript", "D - .xml"],
    correct: 1
  },
  {
    question: "3. Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    answ: ["A - last()", "B - put()", "C - push()", "D - None of the above."],
    correct: 2
  },
  {
    question: "4. Which built-in method returns the calling string value converted to lower case?",
    answ: ["A - toLowerCase()", "B - toLower()", "C - changeCase(case)", "D - None of the above."],
    correct: 0
  },
  {
    question: "5. Which of the following function of Number object returns the number's value?",
    answ: ["A - toString()", "B - valueOf()", "C - toLocaleString()", "D - toPrecision()"],
    correct: 1
  },
  {
    question: "6. Which of the following function of String object is used to match a regular expression against a string?",
    answ: ["A - concat()", "B - match()", "C - search()", "D - replace()"],
    correct: 1
  },
  {
    question: "7. Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
    answ: ["A - anchor()", "B - big()", "C - blink()", "D - italics()"],
    correct: 1
  },
  {
    question: "8. Which of the following function of String object creates an HTML hypertext link that requests another URL?",
    answ: ["A - link()", "B - sub()", "C - sup()", "D - small()"],
    correct: 0
  },
  {
    question: "9. Which of the following function of Array object removes the last element from an array and returns that element?",
    answ: ["A - pop()", "B - push()", "C - join()", "D - map()"],
    correct: 0
  },
  {
    question: "10. Which of the following function of Array object adds and/or removes elements from an array?",
    answ: ["A - toSource()", "B - sort()", "C - splice()", "D - unshift()"],
    correct: 2
  }];

// variables 
var start = document.querySelector("#start");
var cover = document.querySelector(".cover");
var quiz = document.querySelector(".quiz");
var scoreForm = document.querySelector(".scoreForm");
var scoreCard = document.querySelector(".scoreCard");
var corAns = document.querySelector(".checkedAnswer");
var initials1 = document.querySelector("#initials");
var scoreButton = document.querySelector("#scoreButton");
var closeCard = document.querySelector(".closeCard");
var closeScores = document.querySelector("#closeScores");
var time = document.querySelector("#timer");
var timer;
var timeRem = 100;
var initStore = "";
var initStoreFull = JSON.parse(localStorage.getItem("initStoreFull"));
console.log("🚀 ~ file: script.js:74 ~ initStoreFull:", initStoreFull)
var scores = 0;
var endgame = false;
var i = 0;
var mistake = false;

if (initStoreFull === null) {
  initStoreFull = [0];
}

// questions render 
function showQuest() {
  console.log("showQuest");
  if (i < questions.length && !endgame) {
    var quest = document.querySelector("#question");
    quest.textContent = questions[i].question;
    var answer = document.querySelectorAll(".answer");
    answer.forEach(function (element, index) {
      element.textContent = questions[i].answ[index];
    })
    check();
  } else {
    console.log("stop");
    quiz.style.display = "none";
    scoreForm.style.display = "flex";
  }
}

// timer 
function startTime() {
  timer = setInterval(function () {
    if (timeRem > 0) {
      timeRem--;
      time.textContent = timeRem;
      if (mistake){
        timeRem = timeRem - 10;
        mistake = false;
      }
    } else {
      endgame = true
      showQuest();
    }
  }, 1000);
}

// check answers 
function check() {
  var answers = document.querySelector(".answers");
  answers.addEventListener("click", function (event) {
    var element = event.target;
    var num = parseFloat(element.dataset.number);
    var cor = questions[i].correct;
    if (num === cor) {
      corAns.textContent = "Correct!"
      corAns.style.background = "green";
      scores = scores + 10;
    } else {
      console.log("wrong");
      corAns.textContent = "Wrong!"
      corAns.style.background = "red";
      timeRem = timeRem - 5;
      mistake = true;
    }
    event.stopPropagation();
    event.bubbles = false;
    i++;
    showQuest();
    console.log("🚀 ~ file: script.js:82 ~ scores:", scores);
  }, { once: true });
};

var cor = questions[i].correct;

// score in local storage 
function storeScores() {
  var initStore1 = localStorage.getItem("initStore");
  initStore = (initStore1 + " - " + scores);
  initStoreFull.push(initStore);
  localStorage.setItem("initStoreFull", JSON.stringify(initStoreFull));
}

// initials input 
scoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var initials = initials1.value.trim();
  if (initials === "") {
    alert("Please, enter initials");
    return;
  }
  initials1.value = "";
  localStorage.setItem("initStore", initials);
  scoreForm.style.display = "none";
  alert("Refresh page, please");
  storeScores();
});

// start button 
function play() {
  start.addEventListener("click", function () {
    cover.style.display = "none";
    quiz.style.display = "flex";
    showQuest();
    startTime();
  })
};

// scores button 
scoreButton.addEventListener("click", function ScoresTable(event) {
  event.preventDefault();
  var scoresT = JSON.parse(localStorage.getItem("initStoreFull"));
  if (scoresT === null) {
    scoresT = [0];
  }
  closeScores.style.display = "flex";
  for (var i = 0; i < scoresT.length; i++) {
    var li = document.createElement("li");
    li.textContent = scoresT[i];
    scoreCard.appendChild(li);
  }
})

// close scores button 
closeScores.addEventListener("click", function closeSc(event) {
  event.preventDefault();
  closeScores.style.display = "none"
  scoreCard.innerHTML = "";
})

play();