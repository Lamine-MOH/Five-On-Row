// start the game //
let boardWidth = 16;
let restTurns = boardWidth * boardWidth;
let boardInfo = [];

const gameBoard = document.querySelector(".game-board");
const gameBoardStyle = window.getComputedStyle(gameBoard);
const currentTurnContent = document.querySelector(".current-turn");

let boardPlaces;
let currentTurn = "white";

function reset_board(boardWidth, way = "build") {
    if (way == "build") {
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
    } else if (way == "reset") {
        for (let i = 0; i < boardWidth; i++) {
            for (let j = 0; j < boardWidth; j++) {
                boardInfo[i][j] = "empty";

                boardPlaces[i * boardWidth + j].classList.remove("white");
                boardPlaces[i * boardWidth + j].classList.remove("black");
            }
        }
    }

    currentTurn = "white";
    restTurns = boardWidth * boardWidth;
    recommendedPlaces = [];

    currentTurnContent.classList.remove("game-over");
    currentTurnContent.classList.remove("black");
    currentTurnContent.classList.remove("boot");
    currentTurnContent.classList.remove("player");
    currentTurnContent.classList.remove("player-1");
    currentTurnContent.classList.remove("player-2");
    currentTurnContent.classList.remove("draw");

    boardPlaces.forEach((obj) => {
        obj.classList.remove("game-over");
    });
}
reset_board(boardWidth);

//  //

function game_over_animation(start, end, mode) {
    if (mode == "horizontal") {
        for (let i = start.x; i <= end.x; i++) {
            boardPlaces[i * boardWidth + start.y].classList.add("game-over");
        }
    } else if (mode == "vertical") {
        for (let j = start.y; j <= end.y; j++) {
            boardPlaces[start.x * boardWidth + j].classList.add("game-over");
        }
    } else if (mode == "curvedLeft") {
        let i = start.x;
        let j = start.y;
        while (i <= end.x && j <= end.y) {
            boardPlaces[i * boardWidth + j].classList.add("game-over");

            i++;
            j++;
        }
    } else if (mode == "curvedRight") {
        let i = start.x;
        let j = start.y;
        while (i <= end.x && j >= end.y) {
            boardPlaces[i * boardWidth + j].classList.add("game-over");

            i++;
            j--;
        }
    }
}

let winValue = 5;
function game_over(x, y) {
    let horizontalValue = 10;
    let verticalValue = 10;
    let curvedLeftValue = 10;
    let curvedRightValue = 10;

    let top = { x, y };
    let bottom = { x, y };
    let left = { x, y };
    let right = { x, y };
    let topLeft = { x, y };
    let topRight = { x, y };
    let bottomLeft = { x, y };
    let bottomRight = { x, y };

    // horizontal //
    for (let i = x - 1; i >= 0; i--) {
        top = { x: i, y };

        if (boardInfo[i][y] != boardInfo[x][y]) {
            top = { x: i + 1, y };
            break;
        }

        horizontalValue += 10;
    }
    for (let i = x + 1; i < boardWidth; i++) {
        bottom = { x: i, y };

        if (boardInfo[i][y] != boardInfo[x][y]) {
            bottom = { x: i - 1, y };
            break;
        }

        horizontalValue += 10;
    }

    // vertical //
    for (let i = y - 1; i >= 0; i--) {
        left = { x, y: i };

        if (boardInfo[x][i] != boardInfo[x][y]) {
            left = { x, y: i + 1 };
            break;
        }

        verticalValue += 10;
    }
    for (let i = y + 1; i < boardWidth; i++) {
        right = { x, y: i - 1 };

        if (boardInfo[x][i] != boardInfo[x][y]) {
            right = { x, y: i - 1 };
            break;
        }

        verticalValue += 10;
    }
    //  //

    let i;
    let j;
    // curved left //
    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0) {
        topLeft = { x: i, y: j };

        if (boardInfo[i][j] != boardInfo[x][y]) {
            topLeft = { x: i + 1, y: j + 1 };
            break;
        }

        curvedLeftValue += 10;

        i--;
        j--;
    }

    i = x + 1;
    j = y + 1;
    while (i < boardWidth - 1 && j < boardWidth - 1) {
        bottomRight = { x: i, y: j };

        if (boardInfo[i][j] != boardInfo[x][y]) {
            bottomRight = { x: i - 1, y: j - 1 };
            break;
        }

        curvedLeftValue += 10;

        i++;
        j++;
    }

    // curved right //
    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < boardWidth - 1) {
        topRight = { x: i, y: j };

        if (boardInfo[i][j] != boardInfo[x][y]) {
            topRight = { x: i + 1, y: j - 1 };
            break;
        }

        curvedRightValue += 10;

        i--;
        j++;
    }

    i = x + 1;
    j = y - 1;
    while (i < boardWidth - 1 && j >= 0) {
        bottomLeft = { x: i, y: j };

        if (boardInfo[i][j] != boardInfo[x][y]) {
            bottomLeft = { x: i - 1, y: j + 1 };
            break;
        }

        curvedRightValue += 10;

        i++;
        j--;
    }

    if (
        horizontalValue >= winValue * 10 ||
        verticalValue >= winValue * 10 ||
        curvedLeftValue >= winValue * 10 ||
        curvedRightValue >= winValue * 10
    ) {
        if (horizontalValue >= winValue * 10) {
            game_over_animation(top, bottom, "horizontal");
        } else if (verticalValue >= winValue * 10) {
            game_over_animation(left, right, "vertical");
        } else if (curvedLeftValue >= winValue * 10) {
            game_over_animation(topLeft, bottomRight, "curvedLeft");
        } else if (curvedRightValue >= winValue * 10) {
            game_over_animation(topRight, bottomLeft, "curvedRight");
        }

        return true;
    } else return false;
}

//  //
let bootTeam = "none";
function add_stone(index) {
    if (restTurns <= 0) {
        return;
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
        if (bootTeam != "none") {
            if (currentTurn != bootTeam) {
                currentTurnContent.classList.add("boot");
            } else {
                currentTurnContent.classList.add("player");
            }
        } else {
            if (currentTurn == "black") {
                currentTurnContent.classList.add("player-1");
            } else {
                currentTurnContent.classList.add("player-2");
            }
        }
    }
    //  //

    if (restTurns == 0) {
        currentTurnContent.classList.add("draw");
        return;
    }

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
