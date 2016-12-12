import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';

import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

let Level = React.createClass({
    render: function () {
        let current = this.props.isCurrentLevel ?
            <div style={mazeStyle.levelIndicator}></div> : null;
        let goal = this.props.isMaxLevel ? <FA name="star" style={mazeStyle.goalLevel} /> : null;
        return (
            <div>
                {this.props.level}
                {current}
                {goal}
            </div>
        )
    }
})
export default React.createClass({
    render: function () {
        let levels = [];
            let i = 1;
        while(i<=this.props.levels) {
            levels.unshift(<Level key ={i}
                level={i}
                isCurrentLevel={ this.props.level === i ? true : false}
                isMaxLevel={ i === this.props.levels ? true : false} />);
            i++;
        }
        return (
            <div style={mazeStyle.levelIndicatorWrapper}>
                <div style={mazeStyle.currentLevelIndicator}>
                    <div>
                        Level
                    </div>
                    <div>
                        {this.props.level}/{this.props.levels}
                    </div>
                </div>
                <div style={mazeStyle.levelIndicator}>
                    {levels}
                </div>
            </div>
        )
    }
});
