import { Map, fromJS } from 'immutable';

const initialState = Map({
    position: [0,0,0],
    showPath: false,
    goal: false,
    gameOn: false
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            if (action.atGoal) {
                return state.merge({
                    position: action.position,
                    goal: action.atGoal
                });
            } else {
                return state.set('position', fromJS(action.position));
            }
        case 'START_GAME':
                return state.set('gameOn', true);
        case 'INIT_GAME':
            return state.merge({
                showPath: false,
                position: [0,0,0],
                goal: false,
                gameOn: false
            });
        case 'TOGGLE_PATH':
            return state.set('showPath', !state.get('showPath'));
        default:
            return state;
    }
};
