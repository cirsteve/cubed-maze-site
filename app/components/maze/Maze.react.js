import React from 'react';
import cn from 'classnames';

import MazeRenderer from './renderers/2dCSS.react';
import M from '../../maze';

export default React.createClass({
    render: function () {
        let maze = this.props.getMaze();
        let mazeComponent = <MazeRenderer {...this.props} />;
        let wrapperClass = cn({
            'maze-wrapper': true
        });
        return (
            <div className={wrapperClass}>
                <div className="current-level">
                  Current Level {this.props.maze.get('position')[2]}
                </div>
                <div className="playarea">
                    { mazeComponent }
                </div>
            </div>
            );
    }
});
