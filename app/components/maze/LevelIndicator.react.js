import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';

let Level = React.createClass({
    render: function () {
        let current = this.props.isCurrentLevel ? <div className="current"></div> : null;
        let goal = this.props.isMaxLevel ? <FA name="star" className="goal-node" /> : null;
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
            <div className="level-indicator-wrapper">
                <div className="current-level">
                    <div>
                        Level
                    </div>
                    <div>
                        {this.props.level}/{this.props.levels}
                    </div>
                </div>
                <div className="level-indicator">
                    {levels}
                </div>
            </div>
        )
    }
});
