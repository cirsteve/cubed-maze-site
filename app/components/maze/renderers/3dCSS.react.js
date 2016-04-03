require('../../../styling/3dcss.css');
import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';

import M from 'maze-cube';

let Marker = React.createClass({
    render: function () {
        let ns = this.props.nodeSize;
        let styles = {
            left: this.props.position[0] * ns + (ns/4),
            bottom: this.props.position[1] * ns + (ns/4)
        };
        return (<div className="marker" style={styles}></div>);
    }
});

let Wall = React.createClass({
    render: function () {
        return (
            <div className="wall">
                <div className="front">f</div>
                <div className="back">b</div>
                <div className="top">t</div>
                <div className="bottom">b</div>
                <div className="left">l</div>
                <div className="right">r</div>
            </div>);
    }
});

let Node = React.createClass({
    render: function () {
        let eastClass = cn({
            'wall': true,
            'east': true,
            'hide': this.props.x
        });
        let northClass = cn({
            'wall': true,
            'north': true,
            'hide': this.props.y
        });
        let ceilingClass = cn({
            'open-ceiling': true,
            'hide': this.props.zc
        });
        let floorClass = cn ({
            'open-floor': true,
            'hide': this.props.zf
        });
        let pathClass = cn ({
            'path': true,
            'hide': !this.props.inPath
        });
        let goal = this.props.isGoal ? <FA name="star" size="2x" className="goal-node" /> : null;

        return (
            <div className="node">
                <div className={northClass}>
                    <div className="front">f</div>
                    <div className="back">b</div>
                    <div className="top">t</div>
                    <div className="bottom">b</div>
                    <div className="left">l</div>
                    <div className="right">r</div>
                </div>
                <div className={eastClass}>
                <div className="front">f</div>
                <div className="back">b</div>
                <div className="top">t</div>
                <div className="bottom">b</div>
                <div className="left">l</div>
                <div className="right">r</div>
                </div>
                <div className={floorClass}></div>
                <div className={ceilingClass}></div>
                <div className={pathClass}></div>
                {goal}
            </div>);
    }
});

let Column = React.createClass({
    render: function () {
        let nodes = [];
        let col = this.props.col;
        let path, coords;
        for (let i = 0; i < this.props.rowCount; i++) {
            let x = col[0][i] && col[0][i] === '1';
            let y = col[1][i] && col[1][i] === '1';
            let zc = col[2][i] ? col[2][i] === '1' : true;
            let zf = col[3][i] ? col[3][i] === '1' : true;
            coords = ''+this.props.colIndex+i+this.props.level
            path = this.props.maze.get('showPath') &&
                this.props.path.map(p=>p.join(''))
                .includes(coords)
            nodes.unshift(<Node key={i}
                x={x}
                y={y}
                zf={zf}
                zc={zc}
                inPath={path}
                isGoal={coords === this.props.goal.join('') ? true : false} />);
        };
        return (
            <div className="column">
                {nodes}
            </div>
        )
    }
});

export default React.createClass({
    UNIT_LENGTH: 30,
    render: function () {
        let level = this.props.level.toJS();
        let maze = this.props.currentMaze;
        let cols = [];
        let colCount = maze.get('dimensions').get('x');
        let rowCount = maze.get('dimensions').get('y');
        let dim = maze.get('dimensions');
        let goal = this.props.goal;
        let path = M.path(maze.get('walls').toJS(),
            this.props.maze.get('position').toJS(),
            goal);
        //iterate over the zf walls
        for (let i=0;i<colCount;i++) {
            let xCol = level[0][i] || [];
            let yCol =  level[1][i] || [];
            let zfCol =  level[2][i] || [];
            let zcCol =  level[3][i] || [];
            cols.push(<Column key={i}
                col={[xCol, yCol, zfCol, zcCol]}
                maze={this.props.maze}
                path={path}
                colIndex={i}
                level={this.props.maze.get('position').get(2)}
                rowCount={rowCount}
                goal={goal} />);
        }

        return (
            <div className="maze-2d">
                {cols}
                <Marker position={this.props.maze.get('position').toJS()}
                    nodeSize={50} />
            </div>
        )
    },
});
