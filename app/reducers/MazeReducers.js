import _ from 'lodash';
import { Map } from 'immutable';
import M from '../maze';

const initialState = Map(
    {
        position: [0,0,0]
    }
);

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            return state.set('position', M.padPosition(action.position));
            break;
        default:
            return state;
    }
};
