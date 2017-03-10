import React from 'react';
import cn from 'classnames';
import { enterInstructionScreen } from '../actions/AppActions';
import Menu from './lobby/SinglePlayerMenu.react';

let screenStyle = {
    display: 'flex',
    flexDirection: 'column'
};

export default React.createClass({
    render: function () {
        return (
            <div style={screenStyle}>
                    <Menu {...this.props} />
                    <h5 onClick={this._onInstructions}>
                        <button>How to Play</button>
                    </h5>
            </div>
            );
    },
    _onInstructions: function () {
        this.props.dispatch(enterInstructionScreen('instruction'));
    }
});
