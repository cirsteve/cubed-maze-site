import { Map } from 'immutable';
import MC from 'maze-cube';

const SCREENS = [
    'lobby',
    'instructions',
    'maze'
];
const dimensions = {x:3, y:3, z: 2};
const initialState = Map({
    screen: 'lobby',
    instructionMaze: {
        "dimensions": dimensions,
        "walls": new MC.Maze(dimensions).wallObjsToStrings()
    },
    clientMaze: true//generate the maze on the client
});

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SCREEN':
            return state.set('screen', action.screen);
        case 'ENTER_INSTRUCTION_SCREEN':
            return state.set('screen', 'instructions');
        case 'INIT_GAME':
            return state.set('screen', 'maze');
        case 'LEAVE_GAME':
            return state.set('screen', 'lobby');
        default:
            return state;
    }
};
