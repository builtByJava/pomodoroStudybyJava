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
//sound effects
const bellAlert = document.createElement("audio");
bellAlert.setAttribute("src", "./bell-ringing-04.wav");
const buttonSound = document.createElement("audio");
buttonSound.setAttribute("src", "./button-1.wav");
const clockTickingSound = document.createElement("audio");
clockTickingSound.setAttribute("src", "./clock-ticking-1.wav");

//functions

function countdown() {
  //Setting up the Pomodoro Clock Timer Elements
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let hours = Math.floor(seconds / 3600);
  //Clock logic
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  hours = hours < 10 ? "0" + hours : hours;
  timeVal.innerText = hours + ":" + minutes + ":" + remainingSeconds;
  //clock starts
  seconds--;

  //clock ticking sound lasts fully for duration of pomodoro session
  // clockTickingSound.play();
  if (seconds < 0) {
    //if total completed Pomodoro sessions are more than 4 , then restart cycle count
    totalPSessions > 4 ? (totalPSessions = 0) : totalPSessions + 1;
    //display on UI total pomodoro sessions
    totalPomodoros.innerText = totalPSessions;
    bellAlert.play();
    clearInterval(interval);
  }
}
//event listeners
startButton.addEventListener("click", function () {
  //start clock by calling countdown method, each session -- 25 mins
  seconds = 1500; //25 min session
  buttonSound.play();
  interval = setInterval(countdown, 1000);
  totalPSessions += sessionCount + 1; //count each completed pomodoro session
});

pauseButton.addEventListener("click", function () {
  //pause clock
  buttonSound.play();
  clearInterval(interval);
});

resetButton.addEventListener("click", function () {
  seconds = 1500; //resetting to 25 mins
  buttonSound.play();
  clearInterval(interval);
});

takeBreak.addEventListener("click", function () {
  buttonSound.play();
  //For big break after 4 total pomodoros is a 15 min break
  if (totalPSessions == 4) {
    seconds = 900;
    interval = setInterval(countdown, 1000);
  } else if (totalPSessions == "") {
    //if  you didn't complete at least 1 pomodoro session, you cannot take a break yet
    takeBreak.disabled = true;
  } else {
    //less than 4 pomodoro sessions are individual 5 min breaks
    seconds = 300;
    interval = setInterval(countdown, 1000);
  }
});
