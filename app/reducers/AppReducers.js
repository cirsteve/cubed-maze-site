import { Map } from 'immutable';
import MC from 'maze-cube';

const initialState = Map({
    currentMazeId: null,
    screen: 'config',
    showInstructions: false,
    instructionMaze: new MC.Maze({x:2, y:2, z: 2}),
    clientMaze: true
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SCREEN':
            return state.set('action', action.screen);
        case 'SET_INSTRUCTIONS':
            return state.set('showInstructions', action.show);
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
