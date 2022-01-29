let examples = [
    "The Quick Brown Fox Jumps Over The Lazy Dog",
    "Bleed",
    "Macbook"
]

let correctArray = []
let incorrectArray = []
let untypedArray = []
let correctSpan = document.querySelector(".correct")
let incorrectSpan = document.querySelector(".incorrect");
let untypedSpan = document.querySelector(".untyped");
let wpmEl = document.getElementById("wpm");

let lettersTyped = 0;
let startTime;

function startTest(){
  resetTest()

  document.onkeydown = typeTest
  startTime = new Date();
  document.querySelector('button').disabled = true;
  let textToType = examples[Math.floor(Math.random()*examples.length)]

  untypedArray = textToType.split("");
  untypedSpan.innerHTML = textToType;
}

function typeTest(event){
  if (event.key.length<2){
    checkLetter(event)
  }else if (event.key === "Backspace" && incorrectArray.length >0){
    untypedArray.unshift(incorrectArray.pop())
  }
  printToScreen();
}

function checkLetter(event){
  let letter = event.key;
  if (event.shiftKey){
    letter = letter.toUpperCase();
  }
  if(letter === untypedArray[0] && incorrectArray.length ===0){
    correctArray.push(untypedArray.shift())
    lettersTyped++
    checkFinished()
  }else{
    incorrectArray.push(untypedArray.shift())
  }
}

function printToScreen(){
  correctSpan.innerHTML = correctArray.join("");

  incorrectSpan.innerHTML = incorrectArray.join("");

  untypedSpan.innerHTML = untypedArray.join("");

  let timeElapsed = (new Date() -startTime)/1000
  let wordsTyped = lettersTyped/4;
  let wpm = Math.floor((wordsTyped/timeElapsed)*60)
  wpmEl.innerHTML = "WPM: " +wpm;
}

function checkFinished(){
    if(untypedArray.length === 0 && incorrectArray.length ===0){
      document.onkeydown = null;
      document.querySelector("button").disabled = false;
    }
}

function resetTest() {
  lettersTyped = 0;
  correctArray = [];
  incorrectArray = [];
  untypedArray = [];
  correctSpan.innerHTML = "";
  incorrectSpan.innerhtml = "";
  untypedSpan.innerHTML = "";
  wpmEl.innerHTML = "";

}