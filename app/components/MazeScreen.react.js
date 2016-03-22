import React from 'react';
import cn from 'classnames';
import Maze from './maze/Maze.react';
import Controls from './maze/Controls.react';
import Overlay from './maze/MazeOverlay.react';
import Success from './maze/Success.react';

export default React.createClass({
    render: function () {
        let maze = this.props.maze;
        let gameOn = maze.get('gameOn')
        let controls = gameOn ? <Controls {...this.props}/> : null;
        let overlay =  !gameOn ? <Overlay  dispatch={this.props.dispatch} /> : null;
        return (
            <div className="maze-screen">
                <div className="controls-section">
                    {controls}
                </div>
                <div className="maze-section">
                    <Maze {...this.props}/>
                    <Success gameOver={maze.get('goal')}
                    dimensions={this.props.getMaze().get('dimensions').toJS()}
                    dispatch={this.props.dispatch} />
                </div>
                {overlay}

            </div>
            );
    }
})
