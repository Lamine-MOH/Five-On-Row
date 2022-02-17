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

    // add the nex recommended //
    // top //
    if (
        x > 0 &&
        contains(recommendedPlaces, { x: x - 1, y }) < 0 &&
        boardInfo[x - 1][y] == "empty"
    )
        recommendedPlaces.push({ x: x - 1, y });

    // bottom //
    if (
        x < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x + 1, y }) < 0 &&
        boardInfo[x + 1][y] == "empty"
    )
        recommendedPlaces.push({ x: x + 1, y });

    // left //
    if (
        y > 0 &&
        contains(recommendedPlaces, { x: x, y: y - 1 }) < 0 &&
        boardInfo[x][y - 1] == "empty"
    )
        recommendedPlaces.push({ x, y: y - 1 });

    // right //
    if (
        y < boardWidth - 1 &&
        contains(recommendedPlaces, { x: x, y: y + 1 }) < 0 &&
        boardInfo[x][y + 1] == "empty"
    )
        recommendedPlaces.push({ x, y: y + 1 });
    //  //

    // update values //
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

    if (top >= 0) recommendedPlaces[top].value = value;
    if (bottom >= 0) recommendedPlaces[bottom].value = value;
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

    if (left >= 0) recommendedPlaces[left].value = value;
    if (right >= 0) recommendedPlaces[right].value = value;
    //  //
}

//  //

function get_best_places(recommendedPlaces) {
    let places = [];
    let bestValue = 10;

    recommendedPlaces.forEach((element) => {
        if (element.value > bestValue) {
            bestValue = element.value;
            places = [element];
        } else if (element.value == bestValue) {
            places.push(element);
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
