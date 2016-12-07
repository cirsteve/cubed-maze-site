export function startGame (game) {
    return {
        type: 'START_GAME',
        game
    };
}

export function endGame () {
    return {
        type: 'END_GAME'
    };
};

export function updatePosition ( position, atGoal ) {
    return {
        type: 'UPDATE_POSITION',
        position,
        atGoal
    };
}

export function addHint (coords, direction) {
    return {
        type: 'ADD_HINT',
        coords,
        direction
    };
}
