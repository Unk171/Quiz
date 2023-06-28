
// www.tutorialspoint.com

var questions = [
  {
    question: "1. Which of the following is true about variable naming conventions in JavaScript?",
    answ: ["A - JavaScript variable names must begin with a letter or the underscore character.",
      "B - JavaScript variable names are case sensitive.", "C - Both of the above.!", "D - None of the above."],
    correct: 2
  },
  {
    question: "2. JavaScript File Has An Extension of:",
    answ: ["A - .Java", "B - .Js", "C - .javascript", "D - .xml"],
    correct: 1
  },
  {
    question: "3. Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
    answ: ["A - last()", "B - put()", "C - push()!", "D - None of the above."],
    correct: 2
  },
  {
    question: "4. Which built-in method returns the calling string value converted to lower case?",
    answ: ["A - toLowerCase()!", "B - toLower()", "C - changeCase(case)", "D - None of the above."],
    correct: 0
  },
  {
    question: "5. Which of the following function of Number object returns the number's value?",
    answ: ["A - toString()", "B - valueOf()!", "C - toLocaleString()", "D - toPrecision()"],
    correct: 1
  },
  {
    question: "6. Which of the following function of String object is used to match a regular expression against a string?",
    answ: ["A - concat()", "B - match()!", "C - search()", "D - replace()"],
    correct: 1
  },
  {
    question: "7. Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
    answ: ["A - anchor()", "B - big()!", "C - blink()", "D - italics()"],
    correct: 1
  },
  {
    question: "8. Which of the following function of String object creates an HTML hypertext link that requests another URL?",
    answ: ["A - link()!", "B - sub()", "C - sup()", "D - small()"],
    correct: 0
  },
  {
    question: "9. Which of the following function of Array object removes the last element from an array and returns that element?",
    answ: ["A - pop()!", "B - push()", "C - join()", "D - map()"],
    correct: 0
  },
  {
    question: "10. Which of the following function of Array object adds and/or removes elements from an array?",
    answ: ["A - toSource()", "B - sort()", "C - splice()!", "D - unshift()"],
    correct: 2
  }];

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
var scores = 0;
var endgame = false;



// function run() { showQuest() };
var i = 0;

function showQuest() {
  console.log("showQuest");
  if (i < questions.length && !endgame) {
    // console.log(i);
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



function startTime() {
  // Sets timer
  timer = setInterval(function() {
    if (timeRem > 0) {
      timeRem--;
      time.textContent = timeRem;
      // Tests if win condition is met
    } else {
        // Clears interval and stops timer
        endgame = true
        showQuest();
      }
    }, 1000);
    // Tests if time has run out
    
}




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
      scores = scores - 2;
      
    }
    event.stopPropagation();
    event.bubbles = false;
    i++;
    showQuest();
    console.log("🚀 ~ file: script.js:82 ~ scores:", scores);
  }, { once: true });
};

var cor = questions[i].correct;



function storeScores() {
  var initStore1 = localStorage.getItem("initStore");
  initStore = (initStore1 + " - " + scores);
  initStoreFull.push(initStore);
  localStorage.setItem("initStoreFull", JSON.stringify(initStoreFull));
}


scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var initials = initials1.value.trim();
  console.log("🚀 ~ file: script.js:137 ~ scoreForm.addEventListener ~ initials:", JSON.stringify(initials))
  JSON.stringify(initials);
  // Return from function early if submitted todoText is blank
  if (initials === "") {
    alert("Please, enter initials");
    return;
  }

  // Add new todoText to todos array, clear the input
  
  initials1.value = "";
 // Store updated todos in localStorage, re-render the list
 localStorage.setItem("initStore", initials); 
 scoreForm.style.display = "none";
 alert("Refresh page, please");
 storeScores();
 });



function play() {
  start.addEventListener("click", function () {
    cover.style.display = "none";
    quiz.style.display = "flex";
    // scoreForm.style.display = "none";

    showQuest();
    startTime();
  })
};


scoreButton.addEventListener("click", function ScoresTable(event) {
  // Clear todoList element and update todoCountSpan
  event.preventDefault();
  var scoresT = JSON.parse(localStorage.getItem("initStoreFull"));
  closeScores.style.display = "flex";

  // Render a new li for each todo
  for (var i = 0; i < scoresT.length; i++) {
    
    var li = document.createElement("li");
    li.textContent = scoresT[i];
    

    

    // li.appendChild(scoreCard);
    scoreCard.appendChild(li);
  }
})

closeScores.addEventListener("click", function closeSc(event){
  event.preventDefault();
  // scoreCard.children.remove();
  closeScores.style.display = "none"
        scoreCard.innerHTML = "";
      
    
})


play();