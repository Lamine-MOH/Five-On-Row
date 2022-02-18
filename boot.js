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

    // ----------------------------add the nex recommended---------------------------- //
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
    let top = -1;
    let bottom = -1;

    for (let i = x - 1; i >= 0; i--) {
        if (boardInfo[i][y] != boardInfo[x][y]) {
            if (boardInfo[i][y] == "empty")
                top = contains(recommendedPlaces, { x: i, y });

            break;
        }

        value += 10;
    }

    for (let i = x + 1; i < boardWidth - 1; i++) {
        if (boardInfo[i][y] != boardInfo[x][y]) {
            if (boardInfo[i][y] == "empty")
                bottom = contains(recommendedPlaces, { x: i, y });

            break;
        }

        value += 10;
    }

    if (top >= 0) recommendedPlaces[top].value.bottom += value;
    if (bottom >= 0) recommendedPlaces[bottom].value.top += value;
    //  //

    // vertical //
    value = 10;
    let left = -1;
    let right = -1;

    for (let i = y - 1; i >= 0; i--) {
        if (boardInfo[x][i] != boardInfo[x][y]) {
            if (boardInfo[x][i] == "empty")
                left = contains(recommendedPlaces, { x, y: i });
            break;
        }

        value += 10;
    }

    for (let i = y + 1; i < boardWidth - 1; i++) {
        if (boardInfo[x][i] != boardInfo[x][y]) {
            if (boardInfo[x][i] == "empty")
                right = contains(recommendedPlaces, { x, y: i });
            break;
        }

        value += 10;
    }

    if (left >= 0) recommendedPlaces[left].value.right += value;
    if (right >= 0) recommendedPlaces[right].value.left += value;
    //  //

    let i;
    let j;
    // curved left //
    value = 10;
    let topLeft = -1;
    let bottomRight = -1;

    i = x - 1;
    j = y - 1;
    while (i >= 0 && j >= 0) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty")
                topLeft = contains(recommendedPlaces, { x: i, y: j });

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
            if (boardInfo[i][j] == "empty")
                bottomRight = contains(recommendedPlaces, { x: i, y: j });

            break;
        }

        value += 10;

        i++;
        j++;
    }

    if (topLeft >= 0) recommendedPlaces[topLeft].value.bottomRight += value;
    if (bottomRight >= 0) recommendedPlaces[bottomRight].value.topLeft += value;
    //  //

    // curved right //
    value = 10;
    let topRight = -1;
    let bottomLeft = -1;

    i = x - 1;
    j = y + 1;
    while (i >= 0 && j < boardWidth - 1) {
        if (boardInfo[i][j] != boardInfo[x][y]) {
            if (boardInfo[i][j] == "empty")
                topRight = contains(recommendedPlaces, { x: i, y: j });

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
            if (boardInfo[i][j] == "empty")
                bottomLeft = contains(recommendedPlaces, { x: i, y: j });

            break;
        }

        value += 10;

        i++;
        j--;
    }

    if (topRight >= 0) recommendedPlaces[topRight].value.bottomLeft += value;
    if (bottomLeft >= 0) recommendedPlaces[bottomLeft].value.topRight += value;
    //  //
}

//  //

function get_best_places(recommendedPlaces) {
    let places = [];
    let topValue = 10;
    let topTotal = 10;

    recommendedPlaces.forEach((element) => {
        let bestValue = 0;
        let totalValue = 0;

        for (value of Object.values(element.value)) {
            totalValue += value;
            if (value > bestValue) bestValue = value;
        }

        if (bestValue > topValue) {
            places = [element];

            topValue = bestValue;
            topTotal = totalValue;
        } else if (bestValue == topValue) {
            if (totalValue > topTotal) {
                places = [element];
                topTotal = totalValue;
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
