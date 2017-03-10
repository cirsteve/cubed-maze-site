import { Map, OrderedMap, fromJS } from 'immutable';

const initialState = Map({
    maze: null
});

export default function (state = initialState, action) {
    switch(action.type) {
        case 'MAZE_CREATED':
            return state.set('maze', action.maze);
            break;
        default:
            return state;
    }
}
