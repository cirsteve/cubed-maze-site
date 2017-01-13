import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';
import MC from 'maze-cube';
import { updatePosition } from '../../actions/MatchActions';
import mazeStyle from '../../styling/maze'
import { addHint } from '../../actions/MatchActions';
import LevelIndicator from './LevelIndicator.react';

const moveMap = {
    37:p=>[p[0]-1, p[1], p[2]],
    38:p=>[p[0], p[1]+1, p[2]],
    39:p=>[p[0]+1, p[1], p[2]],
    40:p=>[p[0], p[1]-1, p[2]],
    87:p=>[p[0], p[1], p[2]+1],
    83:p=>[p[0], p[1], p[2]-1]
};

let DirectionControls = React.createClass({
    render: function () {
        let centerStyle = {
            display: 'flex',
            justifyContent: 'center'
        };

        return (
            <div style={mazeStyle.directionControls}>
                <div onTouchEnd={this.props.moveNorth}>
                    <div style={centerStyle} style={mazeStyle.controlBtn} onTouchEnd={this.props.moveNorth}>
                        <FA name="arrow-up" size="2x" />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div onTouchEnd={this.props.moveWest} style={mazeStyle.controlBtn}>
                        <FA name="arrow-left" size="2x" />
                    </div>
                    <div onTouchEnd={this.props.moveEast} style={mazeStyle.controlBtn}>
                        <FA name="arrow-right" size="2x" />
                    </div>
                </div>
                <div style={centerStyle}>
                    <div onTouchEnd={this.props.moveSouth} style={mazeStyle.controlBtn}>
                        <FA name="arrow-down" size="2x" />
                    </div>
                </div>
            </div>
        );
    }
})

let ControlButton = React.createClass({
    render: function () {
        let style = {
            fontSize: '1.3em',
            border: '2px solid black',
            borderRadius: '2px'
        }
        return (
            <div style={style}>
                {this.props.display}
            </div>
        )
    }
});

let LevelControls = React.createClass({
    render: function () {
        return (
            <div style={mazeStyle.levelControls}>
                <div>
                    Level
                </div>
                <div>
                    <div onTouchEnd={this.props.moveUp}>
                        Up
                        <div style={mazeStyle.controlBtn}>
                            W
                        </div>
                    </div>
                    <div onTouchEnd={this.props.moveDown}>
                        Down
                        <div style={mazeStyle.controlBtn}>
                            S
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default React.createClass({
    render: function () {

        return (
            <div style={mazeStyle.controlGroup}>
                <LevelControls moveUp={this.moveUp} moveDown={this.moveDown}/>
                <div>
                    <button type="button"
                        onClick={this._addHint}>Get Hint</button>
                    <LevelIndicator levels={this.props.maxLevels} level={this.props.level} />
                </div>
                <DirectionControls
                    moveNorth={this.moveNorth}
                    moveSouth={this.moveSouth}
                    moveEast={this.moveEast}
                    moveWest={this.moveWest}/>
            </div>
            );
    },
    componentDidMount: function () {
        this.moveUp=this.handleMove.bind(this, 87);
        this.moveDown=this.handleMove.bind(this, 83);
        this.moveNorth=this.handleMove.bind(this, 38);
        this.moveSouth=this.handleMove.bind(this, 40);
        this.moveEast=this.handleMove.bind(this, 39);
        this.moveWest=this.handleMove.bind(this, 37)
        if (this.props.setEvents) {
            window.addEventListener('keydown', this._keydown);
        }
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this._keydown)
    },
    _addHint: function () {
        //the orientation of the graph is flipped on the client
        //so boundaries coming from the server must be translated
        let CLIENT_BOUNDARY_MAP = {
            'up': 'down',
            'down': 'up',
            'east': 'west',
            'west': 'east',
            'north': 'north',
            'south': 'south'
        };

        let currentNode = this.props.match.get('position').toJS();
        let path = MC.path(this.props.walls, currentNode, this.props.getGoal())
        let current = path[path.length-1]
        let next = path[path.length-2]
        let boundary = MC.getBoundary(current, next);
        this.props.dispatch(addHint(current.join(''), CLIENT_BOUNDARY_MAP[boundary]));
    },
    _keydown: function (e) {
        this.handleMove(e.keyCode)
    },
    handleMove: function (directionInt) {
        let current = this.props.match.get('position').toJS();
        let update = moveMap[directionInt](current);
        if (MC.evaluate(this.props.walls, current, update)) {
            let atEnd = parseInt(update.join(''), 10) - parseInt(this.props.getGoal().join(''), 10) === 0;
            this.props.dispatch(updatePosition(update, atEnd));
        }
    }
})
