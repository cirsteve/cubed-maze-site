import React from 'react';
import cn from 'classnames';

import Controls from './maze/Controls.react'
import MazeRenderer from './maze/renderers/3dMazeMixin.react';
import { updateScreen, createMaze } from '../actions/AppActions';
//import RGL from './reactGl.react';


export default React.createClass({
    render: function () {
        let maze = this.props.getMaze();

        let wrapperClass = cn({
            'instruction-screen': true
        });
        //let controls = this.props.showDemo ?
        return (
            <div className={wrapperClass}>
                <button onClick={this._onBack}>Back to Lobby</button>
                <button onClick={this._onStart}>Start Game</button>
                <p>Maze Cube is a multi dimensional maze game where the objective is to find the path through a maze before the timer runs out</p>
                <p>You can navigate the maze through keyboard controls:</p>
                    <Controls {...this.props}
                    maxLevels={maze.dimensions.z}
                    level={this.props.match.get('position').get(2)+1}
                    walls={maze.walls}
                    setEvents={true}
                    hintCount={this.props.match.get('hints').size}
                    hintLimit={this.props.getHintLimit()} />
                <p>The 's' and 'w' keys move your marker up or down a level, the arrow keys move your marker forward, backward, left, and right on single level</p>
                <p>If you can find your way through the maze, from the starting point to the ending point on the last level within the time limit you can advance to a higher level</p>

                <p>You can get a feel for the controls with the example maze below. When you are comfortable navigating Click Here to see how high you can go!</p>
                <MazeRenderer {...this.props}
                    levels={this.props.getFormattedLevels(maze.walls)}
                    walls={maze.walls}
                    dimensions={maze.dimensions}
                    currentLevel={this.props.match.get('position').get(2)}
                    newMaze={this.props.match.get('newMaze')}
                    hints={this.props.match.get('hints')}
                    goal={this.props.getGoal()}  />
            </div>
            );
    },
    _onBack: function (e) {
        this.props.dispatch(updateScreen('lobby'));
    },
    _onStart: function (e) {
        this.props.dispatch(createMaze({x:6, y:6, z:2}, this.props.app.get('clientMaze')));
    }
})
