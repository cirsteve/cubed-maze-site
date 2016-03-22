import { Map } from 'immutable';

const initialState = Map({
    currentMazeId: null,
    screen: 'config'
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SCREEN':
            return state.set('action', action.screen);
        case 'INIT_GAME':
            return state.merge({
                currentMazeId: action.id,
                screen: 'maze'
            });
        case 'LEAVE_GAME':
            return state.merge({
                currentMazeId: null,
                screen: 'config'
            });
        default:
            return state;
    }
};
