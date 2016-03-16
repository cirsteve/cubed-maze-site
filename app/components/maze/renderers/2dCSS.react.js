require('../../../styling/2dcss.less');
import React from 'react';
import cn from 'classnames';

let Node = React.createClass({
    render: function () {
        let nodeClass = cn({
            'node': true,
            'east-wall': this.props.x,
            'north-wall': this.props.y,
        });
        let floorClass = cn({
            'open-floor': true,
            'hide': this.props.zf
        });
        let ceilingClass = cn ({
            'open-ceiling': true,
            'hide': this.props.zc
        });

        return (
            <div className={nodeClass}>
                <div className={floorClass}></div>
                <div className={ceilingClass}></div>
            </div>);
    }
});

let Column = React.createClass({
    render: function () {
        let nodes = [];
        let col = this.props.col;
        let length = col[2].length;
        for (let i = 0; i < length; i++) {
            let x = col[0][i] && col[0][i].exists;// === '1';
            let y = col[1][i] && col[1][i].exists;// === '1';
            let zf = col[2][i] && col[2][i].exists;// === '1';
            let zc = col[3][i] ? col[3][i].exists : true;// === '1';

            nodes.unshift(<Node key={i} x={x} y={y} zf={zf} zc={zc} />);
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
        let level = this.props.getLevel().toJS();
        let cols = [];
        let buildColumn = function (cols, z, i) {

            return cols;
        };
        //iterate over the zf walls
        for (let i=0;i<level[2].length;i++) {
            let xCol = level[0][i] || [];
            let yCol =  level[1][i] || [];
            let zfCol =  level[2][i] || [];
            let zcCol =  level[3][i] || [];
            cols.push(<Column key={i} col={[xCol, yCol, zfCol, zcCol]} />);
        }


        return (
            <div className="maze-2d">
                {cols}
            </div>
        )
    },
});
