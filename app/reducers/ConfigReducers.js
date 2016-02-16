import { Map, Record } from 'immutable';

const initialState = Map(
    {
        x: 10,
        y: 10,
        z: 4,
        render: '3d',
        name: null
    }
);

function updateConfig(state, dimension, value) {
    return state.set(dimension, value);
};

export default function (state = initialState, action) {
    switch (action.type) {
    case 'UPDATE_CONFIG':
        return state.set(action.dimension, action.value);
        break;
    default:
        return state;
    }

};
