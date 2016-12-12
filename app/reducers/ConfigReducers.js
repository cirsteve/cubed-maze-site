import { Map } from 'immutable';

const initialState = Map(
    {
        x: 10,
        y: 10,
        z: 4
    }
);

export default function (state = initialState, action) {
    switch (action.type) {
    case 'UPDATE_CONFIG':
        return state.merge(action.update);
        break;
    default:
        return state;
    }

};
