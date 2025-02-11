let targetNumber;
let attempts = 0;
let gameOver = false;

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');
const newGameButton = document.getElementById('newGame');

function initializeGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;
    attemptsElement.textContent = `Attempts: ${attempts}`;
    messageElement.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    newGameButton.classList.add('hidden');
}

function checkGuess() {
    if (gameOver) return;

    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100';
        messageElement.style.color = 'red';
        return;
    }

    attempts++;
    attemptsElement.textContent = `Attempts: ${attempts}`;

    if (userGuess === targetNumber) {
        messageElement.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        messageElement.style.color = '#4CAF50';
        gameOver = true;
        guessInput.disabled = true;
        submitButton.disabled = true;
        newGameButton.classList.remove('hidden');
    } else if (userGuess < targetNumber) {
        messageElement.textContent = 'Too low! Try a higher number.';
        messageElement.style.color = '#2196F3';
    } else {
        messageElement.textContent = 'Too high! Try a lower number.';
        messageElement.style.color = '#2196F3';
    }

    guessInput.value = '';
    guessInput.focus();
}

submitButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});
newGameButton.addEventListener('click', initializeGame);

// Initialize the game when the page loads
initializeGame();