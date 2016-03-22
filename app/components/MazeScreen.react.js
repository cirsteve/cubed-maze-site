import React from 'react';
import cn from 'classnames';
import Maze from './maze/Maze.react';
import Controls from './maze/Controls.react';
import Overlay from './maze/MazeOverlay.react';
import Success from './maze/Success.react';
import TimeExpired from './maze/TimeExpired.react';
import Timer from './maze/Timer.react';

import { togglePath } from '../actions/MazeActions';

export default React.createClass({
    render: function () {
        let maze = this.props.maze;
        let gameState = maze.get('gameState');
        let gameOn = gameState === 'inplay';
        let dimensions = this.props.getMaze().get('dimensions').toJS();
        let controls = gameOn ? <Controls {...this.props}/> : null;
        let overlay =  gameState === 'preplay' ? <Overlay  dispatch={this.props.dispatch} /> : null;
        let timer = <Timer level={dimensions.z}
            atGoal={gameState === 'success'}
            gameOn={gameOn}
            preplay={gameState ==='preplay'?true:false}
            dispatch={this.props.dispatch} />;
        return (
            <div className="maze-screen">
                <div className="menu-group">
                    <div className="path-button menu-item">
                        Show Path <input type="checkbox"
                            onChange={this._togglePath}
                            checked={maze.get('showPath')} />
                    </div>
                    <div className="current-level menu-item">
                        Level {maze.get('position').get(2)+1} of {dimensions.z}
                    </div>
                    <div className="timer menu-item">
                        { timer }
                    </div>
                </div>
                <div className="maze-section">
                    <Maze {...this.props} />
                    <Success gameOver={gameState === 'success'? true : false}
                    dimensions={dimensions}
                    dispatch={this.props.dispatch} />
                    <TimeExpired timeExpired={gameState === 'lost' ? true : false}
                    dimensions={dimensions}
                    dispatch={this.props.dispatch} />
                    {overlay}
                </div>
                <div className="controls-section menu-group">
                    {controls}
                </div>
            </div>
            );
    },
    _togglePath: function () {
        this.props.dispatch(togglePath())
    }
})
