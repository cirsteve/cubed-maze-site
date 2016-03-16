import React from 'react';
import cn from 'classnames';
import Maze from './maze/Maze.react';
import Controls from './maze/Controls.react';

export default React.createClass({
    render: function () {
        let dispatch = this.props.dispatch;

        return (
            <div className="maze-screen">
                <Maze {...this.props}/>
                <Controls {...this.props}/>
            </div>
            );
    }
})
