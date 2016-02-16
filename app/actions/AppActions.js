import fetch from 'isomorphic-fetch';
import { mazeCreated } from './EntityActions';

export function initGame (id) {
    //exit lobby and enter game play mode
    return {
        type: 'INIT_GAME',
        id: id
    };
};

export function endGame () {
    return {
        type: 'END_GAME'
    };
};


export function joinGame (game) {
    return {
        type: 'JOIN_GAME',
        game
    };
};

export function getNewMaze(config) {
    return {
        type: 'GET_NEW_MAZE',
        config: config
    };
};

export function createMaze(config) {
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
        .then(json => dispatch(mazeCreated(json)));
    };
};
