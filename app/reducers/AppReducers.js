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
        case 'INIT_GAME':
            return state.merge({
                currentMazeId: action.id,
                screen: 'maze'
            });
            break;
        case 'LEAVE_GAME':
            return state.merge({
                currentMazeId: null,
                screen: 'config'
            });
            break;
        default:
            return state;
    }
};
