export function startGame (game) {
    return {
        type: 'START_GAME',
        game
    };
}

export function updatePosition ( game, player, position) {
    return {
        type: 'UPDATE_POSITION',
        game,
        player,
        position
    };
}
