let words = [];
let currentIndex = 0;
let intervalId;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const textInput = document.getElementById("textInput");
const speedInput = document.getElementById("speedInput");
const leftPart = document.getElementById("leftPart");
const orpLetter = document.getElementById("orpLetter");
const rightPart = document.getElementById("rightPart");

startButton.addEventListener("click", () => {
  const text = textInput.value.trim();
  const speed = parseInt(speedInput.value, 10);

  if (!text) {
    alert("Please enter text.");
    return;
  }

  if (words.length === 0 || currentIndex === 0) {
    words = text.split(/\s+/);
    currentIndex = 0;
  }

  if (intervalId) clearInterval(intervalId);

  const intervalDuration = 60000 / speed;

  intervalId = setInterval(() => {
    if (currentIndex >= words.length) {
      clearInterval(intervalId);
      currentIndex = 0;
      
      clearORPDisplay();
      toggleUI(false);
      return;
    }

    displayWordWithORP(words[currentIndex]);
    currentIndex++;
  }, intervalDuration);

  clearORPDisplay();
  toggleUI(true);
});

stopButton.addEventListener("click", () => {
  if (intervalId) clearInterval(intervalId);

  words = [];
  currentIndex = 0;
  clearORPDisplay();
  toggleUI(false);
});

function toggleUI(isRunning) {
  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;

  textInput.disabled = isRunning;
  textInput.classList.toggle("opacity-50", isRunning);
  textInput.classList.toggle("cursor-not-allowed", isRunning);

  speedInput.disabled = isRunning;
  speedInput.classList.toggle("opacity-50", isRunning);
  speedInput.classList.toggle("cursor-not-allowed", isRunning);

  startButton.classList.toggle("opacity-50", isRunning);
  startButton.classList.toggle("cursor-not-allowed", isRunning);

  stopButton.classList.toggle("opacity-50", !isRunning);
  stopButton.classList.toggle("cursor-not-allowed", !isRunning);
}

function displayWordWithORP(word) {
  const ORPIndex = Math.min(Math.floor(word.length / 2), word.length - 1);
  const left = word.substring(0, ORPIndex);
  const orp = word[ORPIndex];
  const right = word.substring(ORPIndex + 1);

  leftPart.textContent = left;
  orpLetter.textContent = orp;
  rightPart.textContent = right;
}

function clearORPDisplay() {
  leftPart.textContent = "";
  orpLetter.textContent = "";
  rightPart.textContent = "";
}