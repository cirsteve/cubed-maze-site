import React from 'react';
import MazeRenderer from './renderers/ThreeJSRenderer.react';
import cn from 'classnames';

export default React.createClass({
    render: function () {
        let maze = this.props.config.currentMaze;
        let mazeComponent = maze ?
            <MazeRenderer app={this.props.app} /> :
            null;
        let wrapperClass = cn({
            'maze-wrapper': true
        });
        return (
            <div className={wrapperClass}>
                <div className="current-level">
                  Current Level {this.props.maze.get('position').z}
                </div>
                <div className="playarea">
                    { mazeComponent }
                </div>
            </div>
            );
    }
});
