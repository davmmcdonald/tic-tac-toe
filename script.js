const player = (marker) => {
    return {marker};
}

const gameBoard = (() => {
    // Initialize game board array
    let grid = ['', '', '', '', '', '', '', '', ''];
    
    // Set specific cell to marker
    const setCell = (index, marker) => grid[index] = marker;

    // Returns entire grid
    const getGrid = () => grid;

    // Resets entire grid
    const reset = () => grid = ['', '', '', '', '', '', '', '', ''];

    return {setCell, getGrid, reset};
})();

const control = (() => {
    // Initialize players, round counter, document selectors, and win conditions
    const playerX = player('X');
    const playerO = player('O');
    let round = 0;
    let gameover = false;
    const cell = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const resetBtn = document.querySelector('.reset');
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Run through turn cycle when a empty cell is pressed
    cell.forEach(element => element.addEventListener('click', event => {
        if (event.target.innerText === '' && gameover = false) {
            gameBoard.setCell(event.target.getAttribute('data-index'), currentPlayer());
            event.target.innerText = currentPlayer();
            if (checkWin(gameBoard.getGrid(), currentPlayer())) {
                message.innerText = `Player ${currentPlayer()} wins!`;
                gameover = true;
            } else {
                round++;
                if (round !== 9) {
                    message.innerText = `It's ${currentPlayer()}'s Turn`;
                } else {
                    message.innerText = `It's a draw!`
                    gameover = true;
                }
            }
        }
    }));

    // Add event listener to reset button
    resetBtn.addEventListener('click', event => {
        gameBoard.reset();
        cell.forEach(element => element.innerText = '');
        round = 0;
        gameover = false;
        message.innerText = `It's ${currentPlayer()}'s Turn`;
    });

    // Get current player based on round counter
    const currentPlayer = () => round % 2 === 0 ? playerX.marker : playerO.marker;

    // Check if the latest turn won the game
    const checkWin = (grid, marker) => {
        return winConditions.some(condition => {
            return condition.every(index => {
                return grid[index] === marker;
            });
        });
    };

})();