import React from 'react';
import { connect } from 'react-redux';
import Lobby from './LobbyScreen.react';
import Maze from './MazeScreen.react';

const stateToProps = function (state) {
    return {
        entities: state.entities,
        app: state.app,
        config: state.config,
        maze: state.maze,
        getMaze: function() {
            let id = this.app.get('currentMazeId');
            return id ? this.entities.get('mazes').get(id) : null;
        },
        getLevel: function () {
            let maze = this.getMaze();
            let level = this.maze.get('position').get(2);
            let walls = maze.get('walls').get(level);

            //if not the first level get the z walls for the level above
            //and add to current level as ceiling walls
            if (level !== 0) {
                walls = walls.push(maze.get('walls').get(level-1).get(2));
            } else {
                walls = walls.push([]);
            }
            return walls;
        }
    };
}

export const App = React.createClass({
    render: function () {
        let screenComponent;
        switch (this.props.app.get('screen')) {
            case 'config':
                screenComponent = <Lobby {...this.props} />;
                break;
            case 'maze':
                screenComponent = <Maze {...this.props} />;
                break;
            default:
                screenComponent = <Lobby {...this.props} />;
        }
        return (
            <div className="span12">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <h2>Cubed Maze</h2>
                    </div>
                </div>
                {screenComponent}
            </div>
        );
    }
});

export default connect(stateToProps)(App);
