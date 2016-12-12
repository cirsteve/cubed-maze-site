import React from 'react';
import cn from 'classnames';

import { createMaze } from '../../actions/AppActions';
import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {
        let wrapper = getStyle([
            [mazeStyle.completionMessage, true],
            [mazeStyle.successMessage, true],
            [{display: 'none'}, !this.props.gameOver]
        ]);
        return (
            <div style={wrapper}>
                <h3>You did it!</h3>
                <h4>Can you go higher?</h4>
                <button onClick={this._nextLevel}>Next Level</button>
            </div>
        );
    },
    _nextLevel: function() {
        let update = Object.assign(this.props.dimensions, {z:this.props.dimensions.z+1});
        this.props.dispatch(createMaze(update, this.props.app.get('clientMaze')));
    }
});
