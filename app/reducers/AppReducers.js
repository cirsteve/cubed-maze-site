import { Map } from 'immutable';

const initialState = Map(
    {
        currentMazeId: null,
        screen: 'config'
    }
);

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SCREEN':
            return state.set('action', action.screen);
            break;
        case 'JOIN_GAME':
            return state.set('currentMazeId', action.game);
            break;
        case 'LEAVE_GAME':
            return state.set({
                currentMazeId: null
            });
            break;
        default:
            return state;
    }
};
