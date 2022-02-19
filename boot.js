function contains(list, ele) {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].x == ele.x && list[i].y == ele.y) {
            index = i;
            break;
        }
    }
    return index;
}
//  //

let recommendedPlaces = [];

function update_recommended_places(x, y) {
    // remove from recommended places //
    let index = contains(recommendedPlaces, { x, y });
    if (index >= 0) recommendedPlaces.splice(index, 1);
    //  //

    // ----------------------------add the new recommended---------------------------- //
    // top //
    if (
        x > 0 &&
        contains(recommendedPlaces, { x: x - 1, y }) < 0 &&
        boardInfo[x - 1][y] == "empty"
    )
        recommendedPlaces.push({
            x: x - 1,
            y,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });

    // bottom //
    if (
        x < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x + 1, y }) < 0 &&
        boardInfo[x + 1][y] == "empty"
    )
        recommendedPlaces.push({
            x: x + 1,
            y,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });

    // left //
    if (
        y > 0 &&
        contains(recommendedPlaces, { x: x, y: y - 1 }) < 0 &&
        boardInfo[x][y - 1] == "empty"
    )
        recommendedPlaces.push({
            x,
            y: y - 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });

    // right //
    if (
        y < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x, y: y + 1 }) < 0 &&
        boardInfo[x][y + 1] == "empty"
    )
        recommendedPlaces.push({
            x,
            y: y + 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });
    //  //

    // top left //
    if (
        x > 0 &&
        y > 0 &&
        contains(recommendedPlaces, { x: x - 1, y: y - 1 }) < 0 &&
        boardInfo[x - 1][y - 1] == "empty"
    )
        recommendedPlaces.push({
            x: x - 1,
            y: y - 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });
    //  //

    // top right //
    if (
        x > 0 &&
        y < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x - 1, y: y + 1 }) < 0 &&
        boardInfo[x - 1][y + 1] == "empty"
    )
        recommendedPlaces.push({
            x: x - 1,
            y: y + 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });
    //  //

    // bottom left //
    if (
        x < boardWidth - 1 &&
        y > 0 &&
        contains(recommendedPlaces, { x: x + 1, y: y - 1 }) < 0 &&
        boardInfo[x + 1][y - 1] == "empty"
    )
        recommendedPlaces.push({
            x: x + 1,
            y: y - 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });
    //  //

    // bottom right //
    if (
        x < boardWidth - 1 &&
        y < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x + 1, y: y + 1 }) < 0 &&
        boardInfo[x + 1][y + 1] == "empty"
    )
        recommendedPlaces.push({
            x: x + 1,
            y: y + 1,
            value: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0,
            },
        });
    //  //

    // ----------------------------update values---------------------------- //
    let value;

    // horizontal //
    value = 10;
    let top = { index: -1, team: 0 };
    let bottom = { index: -1, team: 0 };

    for (let i = x - 1; i >= 0; i--) {
        if (boardInfo[i][y] != boardInfo[x][y]) {
            if (boardInfo[i][y] == "empty") {
                top.index = contains(recommendedPlaces, { x: i, y });
                top.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;
    }

    for (let i = x + 1; i < boardWidth - 1; i++) {
        if (boardInfo[i][y] != boardInfo[x][y]) {
            if (boardInfo[i][y] == "empty") {
                bottom.index = contains(recommendedPlaces, { x: i, y });
                bottom.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;
    }

    if (top.index >= 0)
        recommendedPlaces[top.index].value.bottom = value * top.team;
    if (bottom.index >= 0)
        recommendedPlaces[bottom.index].value.top = value * bottom.team;
    //  //

    // vertical //
    value = 10;
    let left = { index: -1, team: 0 };
    let right = { index: -1, team: 0 };

    for (let i = y - 1; i >= 0; i--) {
        if (boardInfo[x][i] != boardInfo[x][y]) {
            if (boardInfo[x][i] == "empty") {
                left.index = contains(recommendedPlaces, { x, y: i });
                left.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }
        value += 10;
    }

    for (let i = y + 1; i < boardWidth - 1; i++) {
        if (boardInfo[x][i] != boardInfo[x][y]) {
            if (boardInfo[x][i] == "empty") {
                right.index = contains(recommendedPlaces, { x, y: i });
                right.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }
        value += 10;
    }

    if (left.index >= 0)
        recommendedPlaces[left.index].value.right = value * left.team;
    if (right.index >= 0)
        recommendedPlaces[right.index].value.left = value * right.team;
    //  //

    let i;
    let j;
    // curved left //
    value = 10;
    let topLeft = { index: -1, team: 0 };
    let bottomRight = { index: -1, team: 0 };

    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty") {
                topLeft.index = contains(recommendedPlaces, { x: i, y: j });
                topLeft.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;

        i--;
        j--;
    }

    i = x + 1;
    j = y + 1;
    while (i < boardWidth - 1 && j < boardWidth - 1) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty") {
                bottomRight.index = contains(recommendedPlaces, { x: i, y: j });
                bottomRight.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;

        i++;
        j++;
    }

    if (topLeft.index >= 0)
        recommendedPlaces[topLeft.index].value.bottomRight =
            value * topLeft.team;
    if (bottomRight.index >= 0)
        recommendedPlaces[bottomRight.index].value.topLeft =
            value * bottomRight.team;
    //  //

    // curved right //
    value = 10;
    let topRight = { index: -1, team: 0 };
    let bottomLeft = { index: -1, team: 0 };

    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < boardWidth - 1) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty") {
                topRight.index = contains(recommendedPlaces, { x: i, y: j });
                topRight.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;

        i--;
        j++;
    }

    i = x + 1;
    j = y - 1;
    while (i < boardWidth - 1 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty") {
                bottomLeft.index = contains(recommendedPlaces, { x: i, y: j });
                bottomLeft.team = boardInfo[x][y] == "white" ? 1 : -1;
            }
            break;
        }

        value += 10;

        i++;
        j--;
    }

    if (topRight.index >= 0)
        recommendedPlaces[topRight.index].value.bottomLeft =
            value * topRight.team;
    if (bottomLeft.index >= 0)
        recommendedPlaces[bottomLeft.index].value.topRight =
            value * bottomLeft.team;
    //  //
}

//  //
function absolute(value) {
    return value >= 0 ? value : value * -1;
}

function get_place_value(placeValue) {
    let horizontal =
        placeValue.top * placeValue.bottom >= 0
            ? absolute(placeValue.top + placeValue.bottom)
            : Math.max(absolute(placeValue.top), absolute(placeValue.bottom));

    let vertical =
        placeValue.left * placeValue.right >= 0
            ? absolute(placeValue.left + placeValue.right)
            : Math.max(absolute(placeValue.left), absolute(placeValue.right));

    let curvedLeft =
        placeValue.topLeft * placeValue.bottomRight >= 0
            ? absolute(placeValue.topLeft + placeValue.bottomRight)
            : Math.max(
                  absolute(placeValue.topLeft),
                  absolute(placeValue.bottomRight)
              );

    let curvedRight =
        placeValue.topRight * placeValue.bottomLeft >= 0
            ? absolute(placeValue.topRight + placeValue.bottomLeft)
            : Math.max(
                  absolute(placeValue.topRight),
                  absolute(placeValue.bottomLeft)
              );

    return {
        best: Math.max(horizontal, vertical, curvedLeft, curvedRight),
        total: horizontal + vertical + curvedLeft + curvedRight,
    };
}

function get_best_places(recommendedPlaces) {
    let places = [];
    let topValue = 10;
    let topTotal = 10;

    recommendedPlaces.forEach((element) => {
        let result = get_place_value(element.value);

        if (result.best > topValue) {
            places = [element];

            topValue = result.best;
            topTotal = result.total;
        } else if (result.best == topValue) {
            if (result.total > topTotal) {
                places = [element];
                topTotal = result.total;
            } else {
                places.push(element);
            }
        }
    });

    return places;
}

function play_boot() {
    if (recommendedPlaces.length == 0)
        return {
            x: Math.floor(Math.random() * boardWidth),
            y: Math.floor(Math.random() * boardWidth),
        };

    let places = get_best_places(recommendedPlaces);
    return places[Math.floor(Math.random() * places.length)];
}
