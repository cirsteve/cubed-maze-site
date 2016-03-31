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
    87:p=>[p[0], p[1], p[2]+1],
    83:p=>[p[0], p[1], p[2]-1]
};

export default React.createClass({
    render: function () {
        return (
            <div className="controls-group">
                <div className="direction-controls">
                    <div>
                        <div>
                            <FA name="arrow-up" size="2x" />
                        </div>
                    </div>
                    <div className="center">
                        <div>
                            <FA name="arrow-left" size="2x" />
                        </div>
                        <div>
                            <FA name="arrow-right" size="2x" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <FA name="arrow-down" size="2x" />
                        </div>
                    </div>
                </div>
                <div className="level-controls">
                    <div>
                        Level + w
                    </div>
                    <div>
                        Level - s
                    </div>
                </div>
            </div>
            );
    },
    componentDidMount: function () {
        if (this.props.setEvents) {
            window.addEventListener('keydown', this._keydown);
        }
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this._keydown)
    },
    _keydown: function (e) {
        let current = this.props.maze.get('position').toJS();
        let update = moveMap[e.keyCode](current);
        let dim = this.props.getMaze().get('dimensions');
        if (M.evaluate(this.props.getMaze().toJS().walls, current, update)) {
            let atEnd = parseInt(update.join(''), 10) - parseInt(this.props.getGoal().join(''), 10) === 0;
            this.props.dispatch(updatePosition(update, atEnd));
        }
    }
})
