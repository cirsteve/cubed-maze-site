import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';
import M from 'maze-cube';
import { updatePosition } from '../../actions/MazeActions';

const moveMap = {
    37:p=>[p[0]-1, p[1], p[2]],
    38:p=>[p[0], p[1]+1, p[2]],
    39:p=>[p[0]+1, p[1], p[2]],
    40:p=>[p[0], p[1]-1, p[2]],
    87:p=>[p[0], p[1], p[2]-1],
    83:p=>[p[0], p[1], p[2]+1]
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
        let current = this.props.maze.get('position').toJS();
        let update = moveMap[e.keyCode](current);
        let dim = this.props.getMaze().get('dimensions');
        if (M.evaluate(this.props.getMaze().toJS().walls, current, update)) {
            let atEnd = parseInt(update.join(''), 10) - parseInt([dim.get('x')-1, dim.get('y')-1, dim.get('z')-1].join(''), 10) === 0;
            this.props.dispatch(updatePosition(update, atEnd));
        }
    }
})
