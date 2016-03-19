import React from 'react';
import cn from 'classnames';

import MazeRenderer from './renderers/2dCSS.react';

import { togglePath } from '../../actions/MazeActions';


export default React.createClass({
    render: function () {
        let mazeComponent = <MazeRenderer {...this.props} />;
        let wrapperClass = cn({
            'maze-wrapper': true
        });
        return (
            <div className={wrapperClass}>
                <div className="current-level">
                    Show Path<input type="checkbox" onChange={this._togglePath} checked={this.props.maze.get('showPath')} />
                  Current Level {this.props.maze.get('position')[2]}
                </div>
                <div className="playarea">
                    { mazeComponent }
                </div>
            </div>
            );
    },
    _togglePath: function () {
        this.props.dispatch(togglePath())
    }
});
