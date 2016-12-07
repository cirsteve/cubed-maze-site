import React from 'react';
import cn from 'classnames';
import { createMaze, setInstructions } from '../actions/AppActions';
import Menu from './lobby/SinglePlayerMenu.react';
import Instructions from './InstructionsOverlay.react'

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
