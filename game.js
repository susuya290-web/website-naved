// game.js - Game Tebak Angka (Versi baru dengan ID unik)

document.addEventListener('DOMContentLoaded', () => {
    // ⬇️ SEMUA ID DI SINI TELAH DIPERBARUI
    const guessInput = document.getElementById('number-guess-input');
    const guessButton = document.getElementById('number-guess-button');
    const messageDisplay = document.getElementById('number-game-message');
    const countDisplay = document.getElementById('number-guess-count');
    const restartButton = document.getElementById('number-restart-button');

    // Pastikan elemen ada sebelum melanjutkan (mencegah error jika di halaman lain)
    if (!guessInput) return;

    let secretNumber;
    let guessCount;

    function initGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        guessCount = 0;
        
        messageDisplay.textContent = 'Silakan mulai menebak!';
        messageDisplay.classList.remove('success', 'error');
        countDisplay.textContent = 'Jumlah tebakan: 0';
        guessInput.value = '';
        guessInput.disabled = false;
        guessButton.disabled = false;
        restartButton.style.display = 'none';
    }

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            showMessage('Masukkan angka yang valid antara 1 dan 100.', 'error');
            return;
        }

        guessCount++;
        countDisplay.textContent = `Jumlah tebakan: ${guessCount}`;

        if (userGuess === secretNumber) {
            showMessage(`Selamat! Kamu benar. Angkanya adalah ${secretNumber}!`, 'success');
            endGame();
        } else if (userGuess < secretNumber) {
            showMessage('Terlalu rendah! Coba lagi.', 'error');
        } else {
            showMessage('Terlalu tinggi! Coba lagi.', 'error');
        }
        
        guessInput.value = '';
        guessInput.focus();
    }

    function showMessage(msg, type) {
        messageDisplay.textContent = msg;
        messageDisplay.classList.remove('success', 'error');
        if (type) {
            messageDisplay.classList.add(type);
        }
    }

    function endGame() {
        guessInput.disabled = true;
        guessButton.disabled = true;
        restartButton.style.display = 'inline-block';
    }

    guessButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
    restartButton.addEventListener('click', initGame);

    initGame();
});

// memory-game.js (Versi baru dengan ID unik)
document.addEventListener('DOMContentLoaded', () => {
    // ⬇️ SEMUA ID DI SINI TELAH DIPERBARUI
    const gameBoard = document.getElementById('memory-game-board');
    const movesCountSpan = document.getElementById('memory-moves-count');
    const restartButton = document.getElementById('memory-restart-button');
    const winMessage = document.getElementById('memory-win-message');

    // Pastikan elemen ada sebelum melanjutkan (mencegah error jika di halaman lain)
    if (!gameBoard) return;

    const cardIcons = [
        'fa-star', 'fa-heart', 'fa-cloud', 'fa-sun',
        'fa-bolt', 'fa-leaf', 'fa-anchor', 'fa-bomb'
    ];

    let cardsArray = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matchedPairs = 0;

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        winMessage.style.display = 'none';
        moves = 0;
        matchedPairs = 0;
        movesCountSpan.textContent = `Moves: 0`;
        
        cardsArray = [...cardIcons, ...cardIcons];
        shuffle(cardsArray);

        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.icon = cardsArray[i];

            const frontFace = document.createElement('div');
            frontFace.classList.add('memory-card-face', 'memory-card-front');
            const icon = document.createElement('i');
            icon.className = `fas ${cardsArray[i]}`;
            frontFace.appendChild(icon);

            const backFace = document.createElement('div');
            backFace.classList.add('memory-card-face', 'memory-card-back');
            const questionIcon = document.createElement('i');
            questionIcon.className = 'fas fa-question';
            backFace.appendChild(questionIcon);

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('is-flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        incrementMoves();
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        matchedPairs++;
        resetBoard();
        
        if (matchedPairs === cardIcons.length) {
            winMessage.textContent = `Kamu Menang! Selesai dalam ${moves} gerakan.`;
            winMessage.style.display = 'block';
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetBoard();
        }, 1200);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
    
    function incrementMoves() {
        moves++;
        movesCountSpan.textContent = `Moves: ${moves}`;
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
});
