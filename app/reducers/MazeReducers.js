import { Map, fromJS } from 'immutable';

let stateMap = {
    'preplay':0,
    'inplay':1,
    'success':2,
    'lost':3
};
const initialState = Map({
    position: [0,0,0],
    showPath: false,
    gameState: 'preplay'
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            if (action.atGoal) {
                return state.merge({
                    position: action.position,
                    gameState: 'success'
                });
            } else {
                return state.set('position', fromJS(action.position));
            }
        case 'START_GAME':
                return state.set('gameState', 'inplay');
        case 'END_GAME':
                return state.set('gameState', 'lost');
        case 'INIT_GAME':
            return state.merge({
                showPath: false,
                position: [0,0,0],
                gameState: 'preplay'
            });
        case 'TOGGLE_PATH':
            return state.set('showPath', !state.get('showPath'));
        default:
            return state;
    }
};
