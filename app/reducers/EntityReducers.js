import { Map } from 'immutable';

const initialState = Map();

export default function (state = initialState, action) {
    switch(action.type) {
        case 'MAZE_CREATED':
            let maze = action.maze;
            return state.set(maze.id, maze);
            break;
        default:
            return state;
    }
}
