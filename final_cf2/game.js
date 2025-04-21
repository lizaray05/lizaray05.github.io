document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const board = document.getElementById('board');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    const resetBtn = document.getElementById('reset-btn');
    const winScreen = document.getElementById('win-screen');
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    const playAgainBtn = document.getElementById('play-again-btn');

    // Emojis for cards
    const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'];
    
    // Game variables
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let timer;
    let seconds = 0;
    let matchedPairs = 0;
    const totalPairs = 8; // Using 8 pairs out of 12 possible emojis

    // Initialize game
    function initGame() {
        // Reset game state
        moves = 0;
        seconds = 0;
        matchedPairs = 0;
        hasFlippedCard = false;
        lockBoard = false;
        [firstCard, secondCard] = [null, null];
        
        // Clear the board
        board.innerHTML = '';
        movesDisplay.textContent = '0';
        timeDisplay.textContent = '00:00';
        winScreen.classList.add('hidden');
        
        // Create card pairs
        const selectedEmojis = emojis.slice(0, totalPairs);
        const gameCards = [...selectedEmojis, ...selectedEmojis];
        
        // Shuffle cards
        cards = shuffleArray(gameCards);
        
        // Create card elements
        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            
            card.innerHTML = `
                <div class="front-face">${emoji}</div>
                <div class="back-face">♡</div>
            `;
            
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
        
        // Start timer
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }

    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Flip card when clicked
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('matched')) return;
        
        this.classList.add('flip');
        
        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second card flipped
        secondCard = this;
        moves++;
        movesDisplay.textContent = moves;
        
        checkForMatch();
    }

    // Check if cards match
    function checkForMatch() {
        const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            checkWin();
        } else {
            unflipCards();
        }
    }

    // Disable matched cards
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }

    // Unflip unmatched cards
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();
        }, 1000);
    }

    // Reset board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Update timer display
    function updateTimer() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Check if player has won
    function checkWin() {
        if (matchedPairs === totalPairs) {
            clearInterval(timer);
            finalMoves.textContent = moves;
            finalTime.textContent = timeDisplay.textContent;
            setTimeout(() => {
                winScreen.classList.remove('hidden');
            }, 1000);
        }
    }

    // Event listeners
    resetBtn.addEventListener('click', initGame);
    playAgainBtn.addEventListener('click', initGame);

    // Start the game
    initGame();
});