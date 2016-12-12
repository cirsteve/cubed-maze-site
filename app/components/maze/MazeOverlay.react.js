import React from 'react';
import cn from 'classnames';

import { startGame } from '../../actions/MatchActions';
import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {
        let buttonClass= cn({
            'hide': this.state.start
        });
        let countStyle = getStyle([
            [{display: 'none'}, !this.state.start]
        ]);
        let buttonStyle = getStyle([
            [{display: 'none'}, this.state.start]
        ]);
        return (
            <div style={mazeStyle.overlay}>
                <div style={countStyle}>
                    {this.state.count}
                </div>
                <button style={buttonStyle} onClick={this._startCountdown}>Start</button>
            </div>
        );
    },
    getInitialState: function () {
        return {count:3, start:false};
    },
    componentWillUnmount: function () {
        clearInterval(this.countdownInterval);
        clearInterval(this.checkInterval);
    },
    _startCountdown: function() {
        this.setState({count:3, start:true});
        this.countdownInterval = setInterval(this._countdown, 1000);
        this.checkInterval = setInterval(this._checkCountdown, 1001);
    },
    _checkCountdown: function () {
        if (this.state.count < 1) {
            this.props.dispatch(startGame());
        }
    },
    _countdown: function () {
        let count = this.state.count;
        this.setState({count: --count, start:true})

    }
});
