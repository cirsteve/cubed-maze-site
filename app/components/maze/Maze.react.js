import React from 'react';
import cn from 'classnames';

import MazeRenderer from './renderers/3dMazeMixin.react';
//import MazeRenderer from './renderers/2dCSS.react';
import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {
        let maze = this.props.maze;
        let mazeComponent = <MazeRenderer {...this.props}
            levels={this.props.getFormattedLevels(this.props.getMaze().get('walls').toJS())}
            currentMaze={this.props.getMaze()}
            currentLevel={this.props.match.get('position').get(2)}
            newMaze={this.props.match.get('newMaze')}
            hints={this.props.match.get('hints')}
            goal={this.props.getGoal()} />;
        let width = `${this.props.dimensions.x * 50}px`;
        let wrapperStyle = getStyle([
            [{width:width,margin: 'auto'}, true],
            [mazeStyle.gameOver, maze.get('gameState') === 'success' || maze.get('gameState') === 'lost']
        ]);

        return (
            <div style={wrapperStyle}>
                { mazeComponent }
            </div>
            );
    }
});
