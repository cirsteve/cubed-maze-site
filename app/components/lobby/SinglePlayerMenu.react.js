import React from 'react';
import { createMaze } from '../../actions/AppActions';

export default React.createClass({
    render: function () {

        return (
            <div className="single-menu">
                <h4>Are you ready to enter the maze cube?</h4>
                <button className="medium" onClick={this._onMedium}>Begin</button>
            </div>
            );
    },
    _onMedium: function () {
        this.props.dispatch(createMaze({x:6, y:6, z:2}, this.props.app.get('clientMaze')));
    },
    _onHard: function () {
        this.props.dispatch(createMaze({x:8, y:8, z:2}, this.props.app.get('clientMaze')));
    },
});
