// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS
const storyText = "Whiskers, the cat, believed he was a fierce lion. One day, he tried to sneak up on :insertx:, his biggest enemy. But as soon as he pounced, it turned on with a terrifying roar. Whiskers froze, then sprinted under the couch faster than any lion ever could.";

const insertX = ["the vacuum cleaner", "the broom", "the laser pointer"]; // The enemy of Whiskers

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION
randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  // Get random item from insertX
  const xItem = randomValueFromArray(insertX);

  // Replace placeholder in the story
  newStory = newStory.replace(":insertx:", xItem);

  // Replace Whiskers with custom name if provided
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Whiskers", name);
  }

  // Check for UK radio button selection
  if (document.getElementById("uk").checked) {
    // Convert to UK units (no conversion needed in this case)
  }

  // Display the generated story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
