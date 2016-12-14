import React from 'react';
import cn from 'classnames';

import { createMaze } from '../../actions/AppActions';
import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {
        let wrapper = getStyle([
            [mazeStyle.completionMessage, true],
            [mazeStyle.expiredMessage, true],
            [{display: 'none'}, !this.props.timeExpired]
        ]);
        return (
            <div style={wrapper}>
                <h2>Time is up!</h2>
                <h3>But do not give up yet, you can do it!</h3>
                <button onClick={this._retryLevel}>Retry Level</button>
            </div>
        );
    },
    _retryLevel: function() {
        this.props.dispatch(createMaze(this.props.dimensions, this.props.app.get('clientMaze')))
    }
});
