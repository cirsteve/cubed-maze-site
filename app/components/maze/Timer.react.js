import React from 'react';
import cn from 'classnames';

import { endGame } from '../../actions/MatchActions';
import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {

        return (
            <div>
                {this.state.minutes}:{this.state.seconds<10?0:''}{this.state.seconds}
            </div>
        );
    },
    getInitialState: function () {
        return this.getMaxTime();
    },
    componentWillUnmount: function () {
        this.stopTimer();
    },
    componentWillReceiveProps: function (newProps) {
        if (newProps.atGoal) {
            this.stopTimer();
        } else if (!this.interval && newProps.gameOn) {
            this.startTimer();
        } else if (newProps.preplay) {
            this.setState(this.getMaxTime(newProps.level));
        }
    },
    updateTimer: function () {
        let seconds = this.state.minutes * 60 + this.state.seconds - 1;
        this.setState(this.getTime(seconds));
        if (seconds === 0) {
            this.stopTimer();
            this.props.dispatch(endGame());
        }
    },
    startTimer: function () {
        this.interval = setInterval(this.updateTimer, 1000);
    },
    stopTimer: function () {
        clearInterval(this.interval);
        this.interval = null;
    },
    getTime: function (seconds) {
        let s = seconds % 60;
        let m = (seconds - s) / 60;
        return {seconds:s, minutes:m};
    },
    getMaxTime: function (level) {
        //returns the total seconds for each level
        level = level || this.props.level;
        return this.getTime((level-1) * 60);
    }
});
