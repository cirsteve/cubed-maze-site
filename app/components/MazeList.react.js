import React from 'react';
import cn from 'classnames';
import { joinGame } from '../actions/AppActions';
let Item = React.createClass({
    render: function () {
        let p = this.props;
        return (
            <li className="maze-item" onClick={this._onClick}>
                Maze:{p.name}<br/>
                Dimensions:{p.x} X {p.y} X {p.z}
            </li>
        )
    },
    _onClick: function (e) {
        this.props.dispatch(joinGame(this.props.id));
    }
});

export default React.createClass({
    render: function () {
        let dispatch = this.props.dispatch;
        let items = this.props.entities.toArray().map(
            (entity, i)=><Item key={i} dispatch={dispatch} {...entity}/>);
        let wrapperClass = cn({
            'maze-list-comp': true,
            'col-left': true,
            'hide':this.props.config.get('currentMaze') !== null
        });
        return (
            <div className={wrapperClass}>
                <h2>Mazes</h2>
                <ul className="maze-list">
                    { items }
                </ul>
            </div>
            );
    }
})
