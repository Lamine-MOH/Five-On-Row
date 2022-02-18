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
    let curvedLeftValue = 10;
    let curvedRightValue = 10;

    // horizontal //
    for (let i = x - 1; i >= 0; i--) {
        if (boardInfo[i][y] != boardInfo[x][y]) break;

        horizontalValue += 10;
    }
    for (let i = x + 1; i < boardWidth; i++) {
        if (boardInfo[i][y] != boardInfo[x][y]) break;

        horizontalValue += 10;
    }

    // vertical //
    for (let i = y - 1; i >= 0; i--) {
        if (boardInfo[x][i] != boardInfo[x][y]) break;

        verticalValue += 10;
    }
    for (let i = y + 1; i < boardWidth; i++) {
        if (boardInfo[x][i] != boardInfo[x][y]) break;

        verticalValue += 10;
    }
    //  //

    let i;
    let j;
    // curved left //
    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) break;

        curvedLeftValue += 10;

        i--;
        j--;
    }

    i = x + 1;
    j = y + 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) break;

        curvedLeftValue += 10;

        i++;
        j++;
    }

    // curved right //
    i = x - 1;
    j = y + 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) break;

        curvedRightValue += 10;

        i--;
        j++;
    }

    i = x + 1;
    j = y - 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) break;

        curvedRightValue += 10;

        i++;
        j--;
    }

    if (
        horizontalValue >= 50 ||
        verticalValue >= 50 ||
        curvedLeftValue >= 50 ||
        curvedRightValue >= 50
    )
        return true;
    else return false;
}

//  //

function calc_score(boardInfo) {
    let white = 0;
    let black = 0;

    boardInfo.forEach((row) => {
        row.forEach((place) => {
            if (place == "white") {
                white++;
            } else if (place == "black") {
                black++;
            }
        });
    });

    return { white, black };
}

//  //
let bootTeam = "black";
function add_stone(index) {
    if (restTurns < 0) {
        return;
    }

    if (restTurns == 0) {
        currentTurnContent.classList.add("draw");

        // let score = calc_score(boardInfo);

        // if(score.white>score.black)
        // currentTurnContent.classList.toggle("game-over");
    }

    let x = Math.floor(index / boardWidth);
    let y = index % boardWidth;

    if (boardInfo[x][y] != "empty") return;

    boardPlaces[index].classList.add(currentTurn);
    boardInfo[x][y] = currentTurn;

    currentTurn = currentTurn == "black" ? "white" : "black";
    currentTurnContent.classList.toggle("black");
    restTurns--;

    // game over //
    if (game_over(x, y)) {
        restTurns = -5;
        currentTurnContent.classList.add("game-over");
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
