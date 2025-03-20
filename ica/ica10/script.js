// First interactive element: Background color change
const colorButton = document.getElementById('colorButton');

colorButton.addEventListener('click', () => {
  // Array of colors to cycle through
  const colors = ['#f5f5f5', '#FFD700', '#ADD8E6', '#90EE90', '#FFB6C1'];
  // Random color selection
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});

// Second interactive element: Image change on click
const changeableImage = document.getElementById('changeableImage');
let imageToggle = true;

// Image URLs
const image1 = "kitty.png";
const image2 = "kitty2.png";  

changeableImage.addEventListener('click', () => {
  if (imageToggle) {
    changeableImage.src = image2;  // Switch to second image
  } else {
    changeableImage.src = image1;  // Switch back to first image
  }
  imageToggle = !imageToggle;
});

