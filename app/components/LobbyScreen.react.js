import React from 'react';
import cn from 'classnames';
import { createMaze, setInstructions } from '../actions/AppActions';
import Menu from './lobby/SinglePlayerMenu.react';
import Instructions from './InstructionsOverlay.react'

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
        let instructions = this.props.app.get('showInstructions') ?
            <Instructions {...this.props} /> :null;
        return (
            <div className={wrapperClass}>
                    <Menu {...this.props} />
                    <button onClick={this._onInstructions}>How to Play</button>
                    {instructions}
            </div>
            );
    },
    _onInstructions: function () {
        this.props.dispatch(setInstructions(true));
    }
})
