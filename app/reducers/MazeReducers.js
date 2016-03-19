import _ from 'lodash';
import { Map } from 'immutable';
import M from 'maze-cube';

const initialState = Map(
    {
        position: [0,0,0],
        showPath: false
    }
);

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            return state.set('position', M.padPosition(action.position));
            break;
        case 'TOGGLE_PATH':
            return state.set('showPath', !state.get('showPath'));
            break;
        default:
            return state;
    }
};
