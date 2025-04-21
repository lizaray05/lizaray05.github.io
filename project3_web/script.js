const digitZone = document.getElementById("digit-zone");
const progressDisplay = document.getElementById("progress");
const submitBtn = document.getElementById("submit-btn");

let phoneDigits = [];
let currentDigit = 0;
let escapeMode = true;

function resetForm() {
  phoneDigits = [];
  currentDigit = 0;
  escapeMode = true;
  progressDisplay.textContent = `Progress: 0 / 10 digits`;
  digitZone.innerHTML = ""; // clear any leftover dropdowns or messages
  submitBtn.style.display = "none";
  submitBtn.style.transform = "translate(0, 0)";
  createDropdown();
}

function createDropdown() {
  const oldDropdown = digitZone.querySelector("select");
  if (oldDropdown) oldDropdown.remove();

  const dropdown = document.createElement("select");

  // Create the initial "Select number" option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select number";
  dropdown.appendChild(defaultOption);

  // Create the options for 0-9
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

  const timeout = setTimeout(() => {
    if (!dropdown.disabled) {
      alert("Too slow. Start over.");
      resetForm();
    }
  }, 3000); // Timer increased to 3 seconds

  dropdown.addEventListener("change", () => {
    clearTimeout(timeout);
    const selected = parseInt(dropdown.value);
    if (!isNaN(selected)) {
      phoneDigits.push(selected);
      currentDigit++;
      progressDisplay.textContent = `Progress: ${currentDigit} / 10 digits`;

      if (currentDigit === 10) {
        digitZone.innerHTML = `<p class="completion-msg">Wow. You did it. You entered: ${phoneDigits.join('')}</p>`;
        submitBtn.style.display = "inline-block";

        // Allow button to run away for 5 seconds
        escapeMode = true;
        setTimeout(() => {
          escapeMode = false;
          submitBtn.style.transform = "translate(0, 0)";
        }, 5000);
      } else {
        createDropdown();
      }
    }
  });
}

createDropdown();

// Submit button hover — allow more movement
submitBtn.addEventListener("mouseover", () => {
  if (escapeMode) {
    const maxOffsetX = Math.min(400, window.innerWidth - submitBtn.offsetWidth); // increased movement range horizontally
    const maxOffsetY = Math.min(200, window.innerHeight - submitBtn.offsetHeight); // increased movement range vertically
    const offsetX = Math.random() * maxOffsetX - maxOffsetX / 2; // random movement, restricted within the screen
    const offsetY = Math.random() * maxOffsetY - maxOffsetY / 2;

    submitBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});

submitBtn.addEventListener("mouseout", () => {
  if (!escapeMode) {
    submitBtn.style.transform = `translate(0, 0)`;
  }
});

// On click — show final message, then restart
submitBtn.addEventListener("click", () => {
  alert("Thanks! You entered: " + phoneDigits.join(''));
  resetForm();
});