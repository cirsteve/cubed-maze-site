import { Map } from 'immutable';
import MC from 'maze-cube';

const initialState = Map({
    screen: 'config',
    showInstructions: false,
    instructionMaze: new MC.Maze({x:2, y:2, z: 2}),
    clientMaze: true//generate the maze on the client
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SCREEN':
            return state.set('screen', action.screen);
        case 'INIT_GAME':
            return state.merge({
                currentMazeId: action.id,
                screen: 'maze'
            });
        case 'LEAVE_GAME':
            return state.merge({
                currentMazeId: null,
                screen: 'config'
            });
        default:
            return state;
    }
};
