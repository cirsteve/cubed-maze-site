import React from 'react';
import cn from 'classnames';

import { createMaze } from '../../actions/AppActions';

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'hide': !this.props.gameOver
        });
        return (
            <div className={wrapperClass}>
                <div className="success-overlay">
                </div>
                <div className="success-message">
                    <h3>You completed the maze!</h3>
                    <h6>Want more?</h6>
                    <button onClick={this._nextLevel}>Next Level</button>
                </div>
            </div>
        );
    },
    _nextLevel: function() {
        let update = Object.assign(this.props.dimensions, {z:this.props.dimensions.z+1});
        this.props.dispatch(createMaze(update))
    }
});
