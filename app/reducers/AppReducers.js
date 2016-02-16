import { Map } from 'immutable';

const initialState = Map(
    {
        currentMazeId: null,
        gameOn: false,
        gameOver: false
    }
);

export default function (state = initialState, action) {
    switch (action.type) {
        case 'END_GAME':
            return state.set('gameOver', true);
        case 'JOIN_GAME':
            return state.set('currentMazeId', action.game);
            break;
        case 'LEAVE_GAME':
            return state.update({
                currentMaze: null,
                gameOn: false,
                gameOver: false
            });
        case 'INIT_GAME':
            return state.set('gameOn', true);
            break;
        default:
            return state;
    }
};
