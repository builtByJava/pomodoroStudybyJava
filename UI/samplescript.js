//variables
let seconds = 1500; //default Pomodoro timer session of 25min increments
let interval = null;
let totalPSessions = 0;
let sessionCount = 0;
let count = 0;
let storedSeconds = 0;

const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");
const takeBreak = document.querySelector("#breakButton");
const totalSessions = document.querySelector("#totalPomodoros");
//sound effects
const bellAlert = document.createElement("audio");
bellAlert.setAttribute("src", "https://www.soundjay.com/misc/bell-ringing-04.mp3");
const buttonSound = document.createElement("audio");
buttonSound.setAttribute("src", "https://www.soundjay.com/buttons/button-1.mp3");


//functions
//countdown clock engine
function countdown() {  
  //Setting up the Pomodoro Clock Timer Elements
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let hours = Math.floor(seconds / 3600);
  //Clock display logic in HH:MM:SS
  minutes = minutes < 10 ? "0" + minutes : minutes;
  remainingSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  hours = hours < 10 ? "0" + hours : hours;
  //output clock display logic to UI
  timeVal.innerText = hours + ":" + minutes + ":" + remainingSeconds;
  //clock starts
  seconds--; 

  //when countdown ends
  if (seconds < 0) {
    //if total completed Pomodoro sessions are more than 4 , then restart cycle count
    totalPSessions > 4 ? (totalPSessions = 0) : totalPSessions + 1;
    //display on UI total pomodoro sessions
    totalPomodoros.innerText = totalPSessions;
    bellAlert.play();
    clearInterval(interval);
    //re-enable start button
    startButton.disabled = false;
  }
}


function pause(){
  //stop countdown
  clearInterval(interval);
  //enable start button to resume countdown
  startButton.disabled = false;
  buttonSound.play();
}

//when clock has already been initiated once, resume countdown
function resume(){
  storedSeconds = seconds; //gather seconds into a new storage variable
  storedSeconds--; //resume countdown and do not drop seconds
}


//event listeners
startButton.addEventListener("click", function () {
  //Start countdown interval with calling countdown function and reduces time 1 second at a time
  interval = setInterval(countdown, 1000);
  buttonSound.play();  
  totalPSessions += sessionCount + 1; //count each completed pomodoro session
 //disable start button after first click to prevent multiple clicks that increases clock speed   
  startButton.disabled = true;
  takeBreak.disabled = true; //cannot take break until completion of Pomodoro cycle
  resume(); //if paused and Start is clicked again, it should not restart the whole 25 mins, but resume where it was paused
});
    

pauseButton.addEventListener("click", function () {
  //invoke pause function when clicked - pause clock
  pause();
});

resetButton.addEventListener("click", function () {
  seconds = 1500; //reset 25min session
  countdown(); //re-invoke function to set countdown clock
  pause(); //keep paused
  buttonSound.play();
});

takeBreak.addEventListener("click", function () {
  
  //For big break after 4 total pomodoros is a 15 min break
  if (totalPSessions == 4) {
    seconds = 900;
    interval = setInterval(countdown, 1000);
    buttonSound.play();
  } else if (totalPSessions === "" || totalPSessions === null || totalPSessions === 0) {
    //if  you didn't complete at least 1 pomodoro session, you cannot take a break yet
    takeBreak.disabled = true;
  } else {
    //less than 4 pomodoro sessions are individual 5 min breaks
    seconds = 300;
    interval = setInterval(countdown, 1000);
    buttonSound.play();
  }
});
