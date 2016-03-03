import React from 'react';
import { connect } from 'react-redux';
import Config from './ConfigScreen.react';
import Lobby from './LobbyScreen.react';
import Maze from './MazeScreen.react';

export const App = React.createClass({
    render: function () {
        let maze = this.props.app.get('currentMazeId') ? <Maze {...this.props} /> : null;
        let screenComponent;
        switch (this.props.app.get('screen')) {
            case 'config':
                screenComponent = <Config {...this.props} />;
                break;
            case 'lobby':
                screenComponent = <Lobby {...this.props} />;
                break;
            case 'maze':
                screenComponent = <Maze {...this.props} />;
                break;
            default:
                screenComponent = <Config {...this.props} />;
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

const stateToProps = function (state) {
    return {
        entities: state.entities,
        app: state.app,
        config: state.config,
        maze: state.maze,
        getMaze: function() {
            this.entitites.get(this.app.get('currentMazeId'));
        }
    };
}
export default connect(stateToProps)(App);
