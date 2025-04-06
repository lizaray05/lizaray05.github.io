const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['raspberries.jpg', 'blueberries.jpg', 'strawberry.jpg', 'blackberries.jpg', 'cranberry.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'raspberries.jpg': 'Closeup of raspberries',
    'blueberries.jpg': 'Closeup of blueberries',
    'strawberry.jpg': 'Closeup of strawberries',
    'blackberries.jpg': 'Closeup of blackberries',
    'cranberry.jpg': 'Closeup of cranberries'
};

/* Looping images */
imageFilenames.forEach(filename => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${filename}`);
    newImage.setAttribute('alt', altTexts[filename]);
    thumbBar.appendChild(newImage);

    // Adding click effect to change image
    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', newImage.getAttribute('src'));
        displayedImage.setAttribute('alt', newImage.getAttribute('alt'));
    });
});

/* Darken/Lighten button */
btn.addEventListener('click', () => {
    if (btn.getAttribute('class') === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
});
