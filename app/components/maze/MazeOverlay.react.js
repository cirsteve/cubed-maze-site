import React from 'react';
import cn from 'classnames';

import { startGame } from '../../actions/MatchActions';

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'overlay-wrapper': true
        });
        let buttonClass= cn({
            'hide': this.state.start
        });
        let countClass = cn({
            'overlay-count': true,
            'hide': !this.state.start
        });
        return (
            <div className={wrapperClass}>
                <div className={countClass}>
                    {this.state.count}
                </div>
                <button className={buttonClass} onClick={this._startCountdown}>Start</button>
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
