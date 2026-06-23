const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонталі
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикалі
    [0, 4, 8], [2, 4, 6]             // Діагоналі
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetButton.addEventListener('click', restartGame);
    statusText.textContent = `Хід гравця: ${currentPlayer}`;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');
    if (board[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#d9534f" : "#5cb85c";
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Хід гравця: ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Переміг гравець ${currentPlayer}!`;
        running = false;
    } else if (!board.includes("")) {
        statusText.textContent = `Нічия!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Хід гравця: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "#333";
    });
    running = true;
}

initializeGame();