const digitZone = document.getElementById("digit-zone");
const progressDisplay = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");
const submitBtn = document.getElementById("submit-btn");

let phoneDigits = [];
let currentDigit = 0;
let countdownInterval;
let timeout;

function resetForm() {
  phoneDigits = [];
  currentDigit = 0;
  updateProgress();
  timerDisplay.textContent = "Time left: 3s";
  digitZone.innerHTML = "";
  submitBtn.style.display = "none";
  createDropdown();
}

function updateProgress() {
  const entered = phoneDigits.join('');
  progressDisplay.textContent = `Entered: ${entered}`;
}

function startTimer(duration, onExpire) {
  let timeLeft = duration;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  timeout = setTimeout(() => {
    clearInterval(countdownInterval);
    onExpire();
  }, duration * 1000);
}

function createDropdown() {
  const oldDropdown = digitZone.querySelector("select");
  if (oldDropdown) oldDropdown.remove();

  const dropdown = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select number";
  dropdown.appendChild(defaultOption);

  for (let i = 0; i <= 9; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    dropdown.appendChild(option);
  }

  dropdown.style.position = "absolute";
  dropdown.style.top = Math.random() * 80 + "%";
  dropdown.style.left = Math.random() * 80 + "%";

  digitZone.appendChild(dropdown);

  startTimer(3, () => {
    alert("🔥 Too slow! Start over.");
    resetForm();
  });

  dropdown.addEventListener("change", () => {
    clearTimeout(timeout);
    clearInterval(countdownInterval);

    const selected = parseInt(dropdown.value);
    if (!isNaN(selected)) {
      phoneDigits.push(selected);
      currentDigit++;
      updateProgress();

      if (currentDigit === 10) {
        digitZone.innerHTML = `<p class="completion-msg">🎉 You entered: ${phoneDigits.join('')}</p>`;
        timerDisplay.textContent = "";
        submitBtn.style.display = "inline-block";
      } else {
        createDropdown();
      }
    }
  });
}

createDropdown();

submitBtn.addEventListener("click", () => {
  alert("📞 Thanks! You entered: " + phoneDigits.join(''));
  resetForm();
});