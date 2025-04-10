const newQuoteButton = document.querySelector('#js-new-quote');
const quoteTextElement = document.getElementById('js-quote-text');
const authorTextElement = document.getElementById('js-author-text');
const authorImage = document.getElementById('author-img');
const loadingSpinner = document.getElementById('loading');

// Array of quotes
const quotes = [
  { text: "Bitterness is like a cancer that enters the soul.", author: "Sir Terry Waite" },
  { text: "The true test of character is not how much we know how to do, but how we behave when we don’t know what to do.", author: "John Holt" },
  { text: "It’s better to be at the bottom of a ladder you want to climb than halfway up one you don’t.", author: "Ricky Gervais" },
  { text: "The biggest temptation is to settle for too little.", author: "Thomas Merton" },
  { text: "Everybody wants to be famous, but nobody wants to do the work. You grind hard so you can play hard. Eventually, your hard work will pay off.", author: "Michael Hart" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "You pray for the hungry. Then you feed them. That’s how prayer works.", author: "Pope Francis" },
  { text: "I would like to show the world today as an ant sees it, and tomorrow as the moon sees it.", author: "Hannah Hoch" },
  { text: "Write this down, young man. Life has been extremely, I say extremely, kind.", author: "Margaret Gorman" },
  { text: "What you are, you are by accident of birth; what I am, I am by myself.", author: "Ludwig van Beethoven" },
  { text: "Never allow a person to tell you no who doesn’t have the power to say yes.", author: "Eleanor Roosevelt" },
  { text: "When I hear somebody sigh, ‘Life is hard,’ I am always tempted to ask, ‘Compared to what?'", author: "Sydney J. Harris" },
  { text: "If you do every job like you’re going to do it for the rest of your life, that’s when you get noticed.", author: "Mary Barra" },
  { text: "Anyone who has spent any time in space will love it for the rest of their lives. I achieved my childhood dream of the sky.", author: "Valentina Tereshkova" },
  { text: "Your messaging should convey, ‘Here’s why you would be so lucky if you got me,’ instead of ‘I really wanted it,’ which we all tend to do.", author: "Barbara Corcoran" },
  { text: "I know you’ve heard it a thousand times before. But it’s true—hard work pays off. If you want to be good, you have to practice, practice, practice. If you don’t love something, then don’t do it.", author: "Ray Bradbury" }
];

// Filtered quotes (only the specified authors)
const filteredQuotes = quotes.filter(quote => 
  ["Sir Terry Waite", "Ricky Gervais", "Pope Francis", "Eleanor Roosevelt", "Valentina Tereshkova", "Ray Bradbury"].includes(quote.author)
);

// Object mapping authors to their image URLs
const authorImages = {
  "Sir Terry Waite": "https://www.eastcheshirehospice.org.uk/wp-content/uploads/2020/06/IMG_1370.jpg",
  "Ricky Gervais": "https://image.tmdb.org/t/p/w500/zv50aVyBVDBOsMHXpeUYLi4kBhn.jpg",
  "Pope Francis": "https://upload.wikimedia.org/wikipedia/commons/9/95/Portrait_of_Pope_Francis_%282021%29_FXD.jpg",
  "Eleanor Roosevelt": "https://cdn.britannica.com/78/19578-050-E720BE72/Eleanor-Roosevelt-1950.jpg",
  "Valentina Tereshkova": "https://cdn.britannica.com/96/177496-050-481E5616/Valentina-Tereshkova.jpg",
  "Ray Bradbury": "https://cdn.britannica.com/23/200923-050-510EBC89/Ray-Bradbury-1982.jpg"
};

function getRandomQuote() {
  loadingSpinner.style.display = 'block';
  quoteTextElement.textContent = '';
  authorTextElement.textContent = '';
  authorImage.style.display = 'none';

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const { text, author } = filteredQuotes[randomIndex];

    quoteTextElement.textContent = `"${text}"`;
    authorTextElement.textContent = `— ${author}`;

    if (authorImages[author]) {
      authorImage.src = authorImages[author];  // Dynamically set the image source
      authorImage.style.display = 'block';  // Make the image visible
    }

    loadingSpinner.style.display = 'none';
  }, 500); // Simulate loading delay
}

newQuoteButton.addEventListener('click', getRandomQuote);
window.addEventListener('DOMContentLoaded', getRandomQuote);
