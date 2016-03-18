import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome'
import M from '../../maze';
import { updatePosition } from '../../actions/MazeActions';

const moveMap = {
    37:p=>p-100,
    38:p=>p+10,
    39:p=>p+100,
    40:p=>p-10,
    87:p=>p-1,
    83:p=>p+1
};

export default React.createClass({
    render: function () {
        return (
            <div className="controls">
                Controls
                <div>
                    North: <FA name="arrow-up" />
                </div>
                <div>
                    South: <FA name="arrow-down" />
                </div>
                <div>
                    East:  <FA name="arrow-right" />
                </div>
                <div>
                    West:  <FA name="arrow-left" />
                </div>
                <div>
                    Level Up: 'w'
                </div>
                <div>
                    Level Down: 's'
                </div>
            </div>
            );
    },
    componentDidMount: function () {
        window.addEventListener('keydown', this._keydown)
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this._keydown)
    },
    _keydown: function (e) {
        console.log(e);
        let current = this.props.maze.get('position');
        let update = moveMap[e.keyCode](parseInt(current.join(''), 10))
        .toString().split('').map(p=>parseInt(p,10));
        if (M.evaluate(this.props.getMaze().toJS().walls, current, update)) {
            this.props.dispatch(updatePosition(update));
        }
    }
})
