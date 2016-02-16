import React from 'react';
import cn from 'classnames';

export default React.createClass({
    render: function () {
        let wrapperClass = cn({
            'start-button-wrapper': true
        })
        return (
            <div className={wrapperClass}>
                <btn>Start</btn>
            </div>
        );
    }
});
