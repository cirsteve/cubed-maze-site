import { Map, List } from 'immutable';

const initialState = Map({
    mazes: List()
});

export default function (state = initialState, action) {
    switch(action.type) {
        case 'MAZE_CREATED':
            return state.update('mazes', l=>l,push(action.maze));
            break;
        default:
            return state;
    }
}
