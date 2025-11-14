const cells = document.querySelectorAll('.cell');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-btn');
const closeButton = document.getElementById('close-btn');
let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
closeButton.addEventListener('click', closeModal);

function handleClick() {
    const cellIndex = parseInt(this.id.split('-')[1]);
    if (cells[cellIndex].textContent === '' && gameActive) {
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add('clicked');
        if (checkWin()) {
            showModal(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            showModal('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('clicked');
    });
    closeModal();
    currentPlayer = 'X';
    gameActive = true;
}

function showModal(message) {
    winnerMessage.textContent = message;
    modal.style.display = 'block';
    modalContent.classList.add('animate');
}

function closeModal() {
    modal.style.display = 'none';
    modalContent.classList.remove('animate');
}
