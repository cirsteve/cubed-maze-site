import React from 'react';
import cn from 'classnames';
import { createMaze, updateScreen} from '../actions/AppActions';
import Menu from './lobby/SinglePlayerMenu.react';

let screenStyle = {
    display: 'flex',
    flexDirection: 'column'
};

export default React.createClass({
    render: function () {
        let instructions = this.props.app.get('showInstructions') ?
            <Instructions {...this.props} /> :null;
        return (
            <div style={screenStyle}>
                    <Menu {...this.props} />
                    <button onClick={this._onInstructions}>How to Play</button>
            </div>
            );
    },
    _onInstructions: function () {
        this.props.dispatch(updateScreen('instruction'));
    }
});
