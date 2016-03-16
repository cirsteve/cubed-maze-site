import { Map, OrderedMap, fromJS } from 'immutable';

const initialState = Map({
    mazes: OrderedMap()
});

export default function (state = initialState, action) {
    switch(action.type) {
        case 'MAZE_CREATED':
            return state.update('mazes', l=>l.set(action.maze.id, fromJS(action.maze)));
            break;
        default:
            return state;
    }
}
