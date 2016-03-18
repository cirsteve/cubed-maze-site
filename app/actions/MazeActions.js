export function startGame (game) {
    return {
        type: 'START_GAME',
        game
    };
}

export function evaluateMove ( current, proposed) {
    return {
        type: 'EVALUATE_MOVE',
        current,
        proposed
    };
}

export function updatePosition ( position ) {
    return {
        type: 'UPDATE_POSITION',
        position
    };
}
