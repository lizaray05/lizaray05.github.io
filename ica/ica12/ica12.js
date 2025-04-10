const newQuoteButton = document.querySelector('#js-new-quote');

newQuoteButton.addEventListener('click', getQuote);

const apiEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

function getQuote() {
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayQuote(data);
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      alert('Failed to fetch trivia. Please try again later.');
    });
}

function displayQuote(data) {
  const quoteTextElement = document.getElementById('js-quote-text');
  const answerTextElement = document.getElementById('js-answer-text');
  
  quoteTextElement.textContent = data.question;
  answerTextElement.textContent = ''; 

  const showAnswerButton = document.querySelector('#js-tweet');
  showAnswerButton.addEventListener('click', () => {
    answerTextElement.textContent = `Answer: ${data.answer}`;
  });
}

window.addEventListener('DOMContentLoaded', getQuote);
