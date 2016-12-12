import React from 'react';
import { connect } from 'react-redux';
import Lobby from './LobbyScreen.react';
import Maze from './MazeScreen.react';
import Instruction from './InstructionScreen.react';

let appStyle = {
    width: '400px',
    height: '600px',
    margin: 'auto',
    backgroundColor: 'slategray'
};

let titleStyle = {
    display: 'flex',
    justifyContent: 'center'
};

let mazeSection = {
    width: '100%',
    height: '100%'
};


const stateToProps = function (state) {
    return {
        match: state.match,
        app: state.app,
        config: state.config,
        maze: state.maze,
        getMaze: function() {
            return this.maze.get('maze');
        },
        getGoal: function () {
            let maze = this.getMaze();
            let dimensions = maze && maze.get('dimensions');
            return dimensions && [dimensions.get('x')-1, dimensions.get('y')-1, dimensions.get('z')-1];
        },
        getLevel: function (maze=this.getMaze()) {
            let level = this.match.get('position').get(2);
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
            case 'instruction':
                screenComponent = <Instruction {...this.props} />;
                break;
            default:
                screenComponent = <Lobby {...this.props} />;
        }
        return (
            <div style={appStyle}>
                <div style={titleStyle}>
                    <h2>Maze Cubed</h2>
                </div>
                {screenComponent}
            </div>
        );
    }
});

export default connect(stateToProps)(App);
