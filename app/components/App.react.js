import React from 'react';
import { connect } from 'react-redux';
import Config from './ConfigureMaze.react';
import MazeList from './MazeList.react';
import Maze from './Maze.react';

export const App = React.createClass({
    render: function () {
        let maze = this.props.app.get('currentMazeId') ? <Maze {...this.props} /> : null;
        return (
            <div className="span12">
                <Config {...this.props} />
                <MazeList {...this.props} />
                { maze }
            </div>
        );
    }
});

const stateToProps = function (state) {
    let entities = state.entities;
    let app = state.app;
    let currentMazeId = app.get('currentMazeId')
    let currentMaze = currentMazeId && entities.toJS()[currentMazeId];

    return {
        entities: entities,
        app: app,
        config: state.config,
        maze: state.maze,
        getMaze: function() {
            this.entitites.toJS()[this.app.get('currentMazeId')]
        }
    };
}
export default connect(stateToProps)(App);
