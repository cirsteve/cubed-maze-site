import entityReducer from './EntityReducers';
import appReducer from './AppReducers';
import configReducer from './ConfigReducers';
import mazeReducer from './MazeReducers';

export default function (state = {}, action) {
    return {
        entities: entityReducer(state.entities, action),
        app: appReducer(state.app, action),
        config: configReducer(state.config, action),
        maze: mazeReducer(state.maze, action)
    };
};
