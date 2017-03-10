import fetch from 'isomorphic-fetch';
import { mazeCreated } from './MazeActions';
import MC from 'maze-cube';

export function updateScreen(screen) {
    return {
        type: 'UPDATE_SCREEN',
        screen
    };
}

export function enterInstructionScreen() {
    return {
        type: 'ENTER_INSTRUCTION_SCREEN'
    };
}

export function initGame (id) {
    //exit lobby and enter game play mode
    return {
        type: 'INIT_GAME',
        id
    };
}

export function leaveGame() {
    return {
        type: 'LEAVE_GAME'
    };
}

export function getNewMaze(config) {
    return {
        type: 'GET_NEW_MAZE',
        config: config
    };
}

export function createMaze(config, clientMaze) {
    //if clientMaze generate the maze here on the client, no need to get the server involved
    if (clientMaze) {
        return function (dispatch) {
            dispatch(mazeCreated({
                "dimensions": config,
                "walls": new MC.Maze(config).wallObjsToStrings()
            }));
            dispatch(initGame());
        };
    }

    return function (dispatch) {
        dispatch(getNewMaze(config));
        return fetch('/create',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({config:config})
        })
        .then(response => response.json())
        .then(json => {
            dispatch(mazeCreated(json))
            dispatch(initGame())
        });

    };
};
