//variables
let seconds = 1500;
let interval = null;

const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");

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

  if (seconds <= 0) {
    //if time ends
    seconds = 300; //5min break
  }
}

//event listeners
startButton.addEventListener("click", function () {
  //start clock by calling countdown method
  interval = setInterval(countdown, 1000);
});

pauseButton.addEventListener("click", function () {
  //pause clock
  clearInterval(interval);
});

resetButton.addEventListener("click", function () {
  seconds = 1500; //resetting to 25 mins
  countdown();
});
