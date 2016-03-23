import React from 'react';
import { createMaze } from '../../actions/AppActions';

export default React.createClass({
    render: function () {

        return (
            <div className="single-menu">
                <h4>Choose a level below</h4>
                <button className="easy" onClick={this._onEasy}>Easy</button>
                <button className="medium" onClick={this._onMedium}>Medium</button>
                <button className="hard" onClick={this._onHard}>Hard</button>
            </div>
            );
    },
    _onEasy: function () {
        this.props.dispatch(createMaze({x:4, y:4, z:2}));
    },
    _onMedium: function () {
        this.props.dispatch(createMaze({x:7, y:7, z:2}));
    },
    _onHard: function () {
        this.props.dispatch(createMaze({x:10, y:10, z:2}));
    },
});
