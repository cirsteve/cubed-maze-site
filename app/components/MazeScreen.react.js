import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';
import MC from 'maze-cube';
import Maze from './maze/Maze.react';
import Controls from './maze/Controls.react';
import Overlay from './maze/MazeOverlay.react';
import Success from './maze/Success.react';
import TimeExpired from './maze/TimeExpired.react';
import Timer from './maze/Timer.react';
import LevelIndicator from './maze/LevelIndicator.react';


import { addHint } from '../actions/MatchActions';
import { createGame, leaveGame, setInstructions } from '../actions/AppActions';

let menuStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px'
}

let screenStyle = {
    position: 'relative',
}

export default React.createClass({
    render: function () {
        let maze = this.props.match;
        let gameState = maze.get('gameState');
        let gameOn = gameState === 'inplay';
        let dimensions = this.props.getMaze().get('dimensions').toJS();
        let controls = gameOn ? <Controls {...this.props} setEvents={true} /> : null;
        let overlay =  gameState === 'preplay' ? <Overlay  dispatch={this.props.dispatch} /> : null;
        let timer = <Timer level={dimensions.z}
            atGoal={gameState === 'success'}
            gameOn={gameOn}
            preplay={gameState ==='preplay' ?true:false}
            dispatch={this.props.dispatch} />;
        return (
            <div style={screenStyle}>
                <div style={menuStyle}>
                    <FA name="home" onClick={this._leaveGame} />
                    <FA name="refresh" onClick={this._refreshLevel} />
                    <FA name="question" onClick={this._showInstructions} />
                    <div className="path-button menu-item">
                        <button type="button"
                            onClick={this._addHint}>Hint</button>
                    </div>
                    <div className="timer menu-item">
                        { timer }
                    </div>
                </div>
                <div className="maze-section">
                    <div>
                        <Maze {...this.props} />

                        <Success gameOver={gameState === 'success'? true : false}
                            dimensions={dimensions}
                            dispatch={this.props.dispatch}
                            app={this.props.app} />

                        <TimeExpired timeExpired={gameState === 'lost' ? true : false}
                            dimensions={dimensions}
                            dispatch={this.props.dispatch}
                            app={this.props.app} />
                            {overlay}
                    </div>
                    <LevelIndicator levels={dimensions.z} level={maze.get('position').get(2)+1} />
                </div>
                <div className="controls-section">
                    {controls}
                </div>
            </div>
            );
    },
    _addHint: function () {
        //the orientation of the graph is flipped on the client
        //so boundaries coming from the server must be translated
        let CLIENT_BOUNDARY_MAP = {
            'up': 'down',
            'down': 'up',
            'east': 'west',
            'west': 'east',
            'north': 'north',
            'south': 'south'
        };

        let currentNode = this.props.match.get('position').toJS();
        let path = MC.path(this.props.maze.get('maze').get('walls').toJS(), currentNode, this.props.getGoal())
        let current = path[path.length-1]
        let next = path[path.length-2]
        let boundary = MC.getBoundary(current, next);
        this.props.dispatch(addHint(current.join(''), CLIENT_BOUNDARY_MAP[boundary]));
    },
    _leaveGame: function () {
        this.props.dispatch(leaveGame());
    },
    _refreshLevel: function () {
        this.props.dispatch(createGame(this.props.getMaze().get('dimensions').toJS(), this.props.app.get('clientMaze')));
    },
    showInstructions: function () {
    },
    _togglePath: function () {
        this.props.dispatch(setInstructions(true));
    }
})
