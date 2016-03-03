import React from 'react';
import { updateConfig } from '../actions/ConfigActions';
import { createMaze } from '../actions/AppActions';

export default React.createClass({
    render: function () {
        let app = this.props.app;
        let config = this.props.config.toJS();
        let dispatch = this.props.dispatch;
        return (
            <div className="configure col-left">
                Height: <input type="text" value={config.y} onChange={this._onChange.bind(this, 'y')} /> <br />
                Width: <input type="text" value={config.x} onChange={this._onChange.bind(this, 'x')} /> <br />
                Levels: <input type="text" value={config.z} onChange={this._onChange.bind(this, 'z')} /> <br />
                Name: <input type="text" value={config.name} onChange={this._onChange.bind(this,'name')} /> <br />
                Renderer: <select type="text" value={config.render} onChange={this._onChange.bind(this, 'render')}>
                             <option value="3d">3D</option>
                             <option value="2d">2D</option>
                          </select> <br />
                <input type="button" onClick={this._onSubmit} value="Create Maze" />
            </div>
            );
    },
    _onSubmit: function () {
        this.props.dispatch(createMaze(this.props.config.toJS()));
    },
    _onChange: function (dimension, value) {
        let val = '';
        if (dimension === 'name') {
            val = value.target.value;
        } else {
            val = value.target.value === '' ? '' : parseInt(value.target.value, 10);
        }

        this.props.dispatch(updateConfig(dimension, val));
    }
});
