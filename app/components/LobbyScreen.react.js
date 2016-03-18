import React from 'react';
import cn from 'classnames';
import { joinGame, createMaze } from '../actions/AppActions';

import Config from './lobby/Config.react';

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
        let dispatch = this.props.dispatch;
        let items = this.props.entities.toArray().map(
            (entity, i)=><Item key={i} dispatch={dispatch} {...entity}/>);
        let wrapperClass = cn({
            'lobby-screen': true,
            'row': true
        });
        return (
            <div className={wrapperClass}>
                <div className="col-xs-4 col-xs-offset-4">
                    <input type="button" onClick={this._onQuickStart} value="Quick Start" />
                    <Config {...this.props} />
                </div>
            </div>
            );
    },
    _onQuickStart: function () {
        this.props.dispatch(createMaze({x:8, y:10, z:4}));
    }
})
