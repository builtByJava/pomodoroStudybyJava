//variables
let seconds = 0;
let interval = null;
let totalPSessions = 0;
let sessionCount = 0;

const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");
const takeBreak = document.querySelector("#breakButton");
const totalSessions = document.querySelector("#totalPomodoros");

//functions

function countdown() {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let hours = Math.floor(seconds / 3600);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  hours = hours < 10 ? "0" + hours : hours;
  timeVal.innerText = hours + ":" + minutes + ":" + remainingSeconds;
  //clock starts
  seconds--;

  if (seconds < 0) {
    //if time ends
    //if total Pomodoro sessions are more than 4 , then restart cycle count
    if (totalPSessions > 4) {
      totalPSessions = 0;
    }
    //display on UI total pomodoro sessions
    totalPomodoros.innerText = totalPSessions;
    clearInterval(interval);
  }
}

//event listeners
startButton.addEventListener("click", function () {
  //start clock by calling countdown method, each session -- 25 mins
  seconds = 1500; //25 min session
  interval = setInterval(countdown, 1000);
  totalPSessions += sessionCount + 1;
});

pauseButton.addEventListener("click", function () {
  //pause clock
  clearInterval(interval);
});

resetButton.addEventListener("click", function () {
  seconds = 1500; //resetting to 25 mins
  countdown();
});

takeBreak.addEventListener("click", function () {
  //For big break after 4 total pomodoros is a 15 min break
  if (totalPSessions == 4) {
    seconds = 900;
    interval = setInterval(countdown, 1000);
  } else {
    //less than 4 pomodoro sessions are individual 5 min breaks
    seconds = 300;
    interval = setInterval(countdown, 1000);
  }
});
