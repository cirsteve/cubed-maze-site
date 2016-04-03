require('../../styling/maze.less');
import React from 'react';
import cn from 'classnames';

import MazeRenderer from './renderers/3dCSS.react';


export default React.createClass({
    render: function () {
        let maze = this.props.maze;
        let mazeComponent = <MazeRenderer {...this.props}
            level={this.props.getLevel()}
            currentMaze={this.props.getMaze()}
            goal={this.props.getGoal()} />;
        let wrapperClass = cn({
            'maze-wrapper': true,
            'game-over': maze.get('gameState') === 'success' || maze.get('gameState') === 'lost'
        });

        return (
            <div className={wrapperClass}>
                { mazeComponent }
            </div>
            );
    }
});
