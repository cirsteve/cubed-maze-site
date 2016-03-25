import React from 'react';
import cn from 'classnames';
import { createMaze } from '../actions/AppActions';
import Menu from './lobby/SinglePlayerMenu.react';

let Item = React.createClass({
    render: function () {
        let p = this.props;
        return (
            <li className="maze-item" onClick={this._onClick}>
                Maze:{p.name}<br/>
                Dimensions:{p.x} X {p.y} X {p.z}
            </li>
        )
    },
    _onClick: function (e) {
        this.props.dispatch(joinGame(this.props.id));
    }
});

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'lobby-screen': true
        });
        return (
            <div className={wrapperClass}>
                    <Menu {...this.props} />
            </div>
            );
    }
})
