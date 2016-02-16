define(['lodash', 'react', './ConfigureMaze.react', './Maze.react', 'react-redux'],
    function(_, React, ConfigureComponent, MazeComponent, rr) {
    var AppComponent = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>Maze Cube</h1>
                    <ConfigureComponent app={this.props} />
                    <MazeComponent app={this.props} />
                </div>
                );
        }
    });


    let select = function (state) {
        return _.assign(state, {level: state.position.z + 1});
    };

    return rr.connect(select)(AppComponent);
});
