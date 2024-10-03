const playerInput = document.getElementById('player-input');
        const gameBoard = document.getElementById('game-board');
        const submitButton = document.getElementById('submit');
        const messageDiv = document.querySelector('.message');
        const cells = document.querySelectorAll('.cell');

        let player1, player2, currentPlayer;
        let board = ['', '', '', '', '', '', '', '', ''];

        submitButton.addEventListener('click', startGame);

        function startGame() {
            player1 = document.getElementById('player1').value;
            player2 = document.getElementById('player2').value;

            if (player1 && player2) {
                playerInput.style.display = 'none';
                gameBoard.style.display = 'block';
                currentPlayer = player1;
                updateMessage();
            }
        }

        cells.forEach(cell => {
            cell.addEventListener('click', () => makeMove(cell));
        });

        function makeMove(cell) {
            const index = parseInt(cell.id) - 1;
            if (board[index] === '' && !checkWinner()) {
                board[index] = currentPlayer === player1 ? 'x' : 'o';
                cell.textContent = board[index];
                if (checkWinner()) {
                    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    updateMessage();
                }
            }
        }

        function updateMessage() {
            messageDiv.textContent = `${currentPlayer}, you're up`;
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return true;
                }
            }
            return false;
        }