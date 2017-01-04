import mazeStyle from '../../../styling/2dcss.js';
import React from 'react';
import cn from 'classnames';
import FA from 'react-fontawesome';
import M from 'maze-cube';

import { getStyle } from '../../../utilities';

let Marker = React.createClass({
    render: function () {
        let ns = this.props.nodeSize;
        let styles = Object.assign({}, mazeStyle.marker, {
            left: this.props.position[0] * ns + (ns/4),
            bottom: this.props.position[1] * ns + (ns/4)
        });
        return (<div style={styles}></div>);
    }
});

let Node = React.createClass({
    render: function () {
        let hint = this.props.hint;

        let nodeStyle = getStyle([
            [mazeStyle.node, true],
            [mazeStyle.eastWall, this.props.x],
            [mazeStyle.northWall, this.props.y]
        ]);
        let ceilingStyle = getStyle([
            [mazeStyle.openCeiling, true],
            [{display: 'none'}, this.props.zc],
            [{borderBottomColor: 'yellowgreen'}, hint && hint === 'up']
        ]);
        let floorStyle = getStyle([
            [mazeStyle.openFloor, true],
            [{display: 'none'}, this.props.zf],
            [{borderTopColor: 'yellowgreen'}, hint && hint === 'down']
        ]);
        let hintStyle = getStyle([
            [{display: 'none', color: 'yellowgreen', height: '100%'}, true],
            [{display: 'flex', justifyContent: 'center'}, hint && hint === 'north'],
            [{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}, hint && hint === 'east'],
            [{display: 'flex', alignItems: 'center'}, hint && hint === 'west'],
            [{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}, hint && hint === 'south'],
        ]);

        let goal = this.props.isGoal ? <FA name="star" size="2x" style={mazeStyle.goal} /> : null;
        let hintIconMap = {
            north: 'arrow-up',
            south: 'arrow-down',
            east: 'arrow-right',
            west: 'arrow-left'
        };
        let hintIcon = hintIconMap[hint] || 'nothing';

        let classname = `cnt ${this.props.num}`
        return (
            <div style={nodeStyle} className={classname}>
                <div style={ceilingStyle}></div>
                <div style={floorStyle}></div>
                <div style={hintStyle}>
                <FA name={hintIcon} />
                </div>
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
            coords = ''+this.props.colIndex+i+this.props.currentLevel
            nodes.unshift(<Node key={i} num={i}
                x={x}
                y={y}
                zf={zf}
                zc={zc}
                hint={this.props.hints.get(coords)}
                isGoal={coords === this.props.goal.join('') ? true : false} />);
        };
        return (
            <div style={mazeStyle.column}>
                {nodes}
            </div>
        )
    }
});

export default React.createClass({
    UNIT_LENGTH: 30,
    render: function () {
        let level = this.props.level.toJS();
        console.log('walls are now', level);
        let maze = this.props.currentMaze;
        let cols = [];
        let colCount = maze.get('dimensions').get('x');
        let rowCount = maze.get('dimensions').get('y');
        let dim = maze.get('dimensions');
        let goal = this.props.goal;
        let path = M.path(maze.get('walls').toJS(),
            this.props.match.get('position').toJS(),
            goal);
        //iterate over the zf walls
        for (let i=0;i<colCount;i++) {
            let xCol = level[0][i] || [];
            let yCol =  level[1][i] || [];
            let zfCol =  level[2][i] || [];
            let zcCol =  level[3][i] || [];
            let currentLevel = this.props.match.get('position').get(2);
            cols.push(<Column key={i}
                col={[xCol, yCol, zfCol, zcCol]}
                MatchActions={this.props.match}
                path={path}
                colIndex={i}
                currentLevel={currentLevel}
                rowCount={rowCount}
                hints={this.props.match.get('hints')}
                goal={goal} />);
        }

        return (
            <div style={mazeStyle.maze}>
                {cols}
                <Marker position={this.props.match.get('position').toJS()}
                    nodeSize={50} />
            </div>
        )
    },
});
