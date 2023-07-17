//variables assignments
const twentyFive = document.querySelector("25min");
const fortyFive = document.querySelector("45min");
const seventyOne = document.querySelector("71min");

//functions
function countdown(counterId) {
  let newCounterId = parseInt(counterId);
  let elapsedSeconds = 59;
  let newElapsedSeconds = parseInt(elapsedSeconds);
  let intervalSetter = setInterval(function () {
    document.getElementById("timeVal").innerHTML =
      newCounterId + ":" + newElapsedSeconds;
    console.log(newElapsedSeconds--);
    if (newElapsedSeconds == 0) {
      newCounterId--;
      newElapsedSeconds += 59;
    }
    if (counterId == 0 && newElapsedSeconds == 0) {
      alert("Time for a break!");
      resetInterval(intervalSetter);
    }
  }, 1000);
}

//functions

//Event handlers

twentyFive.addEventListener("click", countdown);
fortyFive.addEventListener("click", countdown);
seventyOne.addEventListener("click", countdown);
