import React from 'react';
import cn from 'classnames';

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'maze-overlay-wrapper': true,
            'hide': this.props.app.gameOn
        })
        return (
            <div className={wrapperClass}>
                <StartButton dispatch={this.props.dispatch} />
            </div>
        );
    }
});
