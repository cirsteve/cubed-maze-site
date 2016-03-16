import React from 'react';
import cn from 'classnames';

import MazeRenderer from './renderers/2dCSS.react';

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
                  Current Level {maze.get('position').get('z')}
                </div>
                <div className="playarea">
                    { mazeComponent }
                </div>
            </div>
            );
    }
});
