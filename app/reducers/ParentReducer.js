import mazeReducer from './MazeReducers';
import appReducer from './AppReducers';
import configReducer from './ConfigReducers';
import matchReducer from './MatchReducers';

export default function (state = {}, action) {
    return {
        match: matchReducer(state.match, action),
        app: appReducer(state.app, action),
        config: configReducer(state.config, action),
        maze: mazeReducer(state.maze, action)
    };
};
