import React from 'react';
import cn from 'classnames';
import Maze from './maze/Maze.react';
import Controls from './maze/Controls.react';

export default React.createClass({
    render: function () {
        let dispatch = this.props.dispatch;

        return (
            <div className="maze-screen">
                <div className="controls-section">
                    <Controls {...this.props}/>
                </div>
                <div className="maze-section">
                    <Maze {...this.props}/>
                </div>
            </div>
            );
    }
})
