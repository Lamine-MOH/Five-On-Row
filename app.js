// start the game //
let boardWidth = 16;
let restTurns = boardWidth * boardWidth;
let boardInfo = [];

const gameBoard = document.querySelector(".game-board");
const gameBoardStyle = window.getComputedStyle(gameBoard);
const currentTurnContent = document.querySelector(".current-turn");

let boardPlaces;
let currentTurn = "white";

function reset_board(boardWidth) {
    gameBoard.innerHTML = "";
    gameBoard.setAttribute("style", `--column: ${boardWidth}`);
    boardInfo = [];

    for (let i = 0; i < boardWidth; i++) {
        let row = [];
        for (let j = 0; j < boardWidth; j++) {
            gameBoard.innerHTML += `<div class="place"></div>`;
            row.push("empty");
        }
        boardInfo.push(row);
    }

    boardPlaces = document.querySelectorAll(".game-board .place");
    boardPlaces.forEach((obj, index) => {
        obj.setAttribute("onclick", `add_stone(${index})`);
    });
}
reset_board(boardWidth);

//  //

function game_over(x, y) {
    let horizontalValue = 10;
    let verticalValue = 10;

    // horizontal //
    for (i = x - 1; i >= 0; i--) {
        if (boardInfo[i][y] != boardInfo[x][y]) break;

        horizontalValue += 10;
    }
    for (i = x + 1; i < boardWidth; i++) {
        if (boardInfo[i][y] != boardInfo[x][y]) break;

        horizontalValue += 10;
    }

    // vertical //
    for (i = y - 1; i >= 0; i--) {
        if (boardInfo[x][i] != boardInfo[x][y]) break;

        verticalValue += 10;
    }
    for (i = y + 1; i < boardWidth; i++) {
        if (boardInfo[x][i] != boardInfo[x][y]) break;

        verticalValue += 10;
    }

    if (horizontalValue >= 50 || verticalValue >= 50) return true;
    else return false;
}

//  //
let bootTeam = "black";
function add_stone(index) {
    let x = Math.floor(index / boardWidth);
    let y = index % boardWidth;

    if (boardInfo[x][y] != "empty" || restTurns <= 0) return;

    boardPlaces[index].classList.add(currentTurn);
    boardInfo[x][y] = currentTurn;

    currentTurn = currentTurn == "black" ? "white" : "black";
    currentTurnContent.classList.toggle("black");
    restTurns--;

    // game over //
    if (game_over(x, y)) {
        restTurns = 0;
        currentTurnContent.classList.toggle("game-over");
    }
    //  //

    // boot turn //
    if (bootTeam != "none") {
        update_recommended_places(x, y);

        if (currentTurn == bootTeam) {
            let place = play_boot();
            add_stone(place.x * boardWidth + place.y);
        }
    }
}

//  //
