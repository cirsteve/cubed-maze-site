import React from 'react';
import cn from 'classnames';

import { createMaze } from '../../actions/AppActions';

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'expired-message': true,
            'hide': !this.props.timeExpired
        });
        return (
            <div className={wrapperClass}>
                <h3>Time is up!</h3>
                <h4>Give it another shot?</h4>
                <button onClick={this._retryLevel}>Retry Level</button>
            </div>
        );
    },
    _retryLevel: function() {
        this.props.dispatch(createMaze(this.props.dimensions, this.props.app.get('clientMaze')))
    }
});
