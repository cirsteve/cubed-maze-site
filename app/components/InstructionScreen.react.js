import React from 'react';
import cn from 'classnames';

import Controls from './maze/Controls.react'
import MazeRenderer from './maze/renderers/2dCSS.react';
import { updateScreen } from '../actions/AppActions';


export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'instruction-screen': true
        });
        //let controls = this.props.showDemo ?
        return (
            <div className={wrapperClass}>
                <button onClick={this._onBack}>Back to Lobby</button>
                <p>Maze Cube is a multi dimensional maze game where the objective is to find the path through a maze before the timer runs out</p>
                <p>You can navigate the maze through keyboard controls:</p>
                    <Controls maze={this.props.app.get('instructionMaze')} />
                <p>The 's' and 'w' keys move your marker up or down a level, the arrow keys move your marker forward, backward, left, and right on single level</p>
                <p>If you can find your way through the maze, from the starting point to the ending point on the last level within the time limit you can advance to a higher level</p>

                <p>You can get a feel for the controls with the example maze below. When you are comfortable navigating Click Here to see how high you can go!</p>
                <MazeRenderer
                    level={this.props.getLevel(this.props.app.get('instructionMaze'))}
                    currentMaze={this.props.app.get('instructionMaze')} />
            </div>
            );
    },
    _onBack: function (e) {
        this.props.dispatch(updateScreen('lobby'));
    }
})
