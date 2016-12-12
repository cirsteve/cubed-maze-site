import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';

import { getStyle } from '../../utilities';
import mazeStyle from '../../styling/maze';

export default React.createClass({
    render: function () {
        let levelStyle = getStyle([
            [{fontSize: '1.8em'}, true],
            [{color: 'orange'}, this.props.levels === this.props.level]
        ])
        return (
            <div style={mazeStyle.levelIndicator}>
                <div>
                    On Level
                </div>
                <div style={levelStyle}>
                    {this.props.level}/{this.props.levels}
                </div>
            </div>
        )
    }
});
