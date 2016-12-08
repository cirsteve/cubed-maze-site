import React from 'react';
import { createMaze } from '../../actions/AppActions';

export default React.createClass({
    render: function () {

        return (
            <div className="single-menu">
                <h4>Choose difficulty level below</h4>
                <button className="medium" onClick={this._onMedium}>Regular</button>
                <button className="hard" onClick={this._onHard}>Hard</button>
            </div>
            );
    },
    _onMedium: function () {
        this.props.dispatch(createMaze({x:7, y:7, z:2}, this.props.app.get('clientMaze')));
    },
    _onHard: function () {
        this.props.dispatch(createMaze({x:10, y:10, z:2}, this.props.app.get('clientMaze')));
    },
});
