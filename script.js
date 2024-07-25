document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restart-btn');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let gameEnded = false;

    // Initialize game
    startGame();

    // Handle cell click
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Handle restart button click
    restartBtn.addEventListener('click', startGame);

    // Function to start the game
    function startGame() {
        currentPlayer = 'X';
        gameEnded = false;
        cells.forEach(cell => {
            cell.textContent = '';
        });
        result.classList.add('hidden');
        restartBtn.classList.add('hidden');
    }

    // Function to handle cell click
    function handleCellClick(event) {
        if (gameEnded) return;

        const cell = event.target;
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                result.textContent = `Player ${currentPlayer} wins!`;
                result.classList.remove('hidden');
                restartBtn.classList.remove('hidden');
                gameEnded = true;
            } else if (checkDraw()) {
                result.textContent = "It's a draw!";
                result.classList.remove('hidden');
                restartBtn.classList.remove('hidden');
                gameEnded = true;
            } else {
                // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
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

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent;
        });
    }

    // Function to check for a draw
    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }
});
