
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



// function run() { showQuest() };
var i = 0;

function showQuest() {
  console.log("!!!!!");
  if (i < questions.length) {
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
  }
}



function check() {
  var answers = document.querySelector(".answers");
  answers.addEventListener("click", function (event) {
    var element = event.target;
    var num = parseFloat(element.dataset.number);
    var cor = questions[i].correct;
    console.log("correct=", cor);
    console.log("i=",i);
    console.log(num, "answer");
    console.log(cor, "correct");
    if (num === cor) {
      console.log("right")
    } else {
      console.log("wrong")
    }
    event.stopPropagation();
    event.bubbles = false;
    i++;
    showQuest();

  }, {once: true});
};

var cor = questions[i].correct;
console.log("correct=", cor);

function play() {
  start.addEventListener("click", function () {
    showQuest();
    // console.log("8");
  })
};
play();