import {createStore, applyMiddleware, compose} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedApp from './components/App.react';
import reducer from './reducers/ParentReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function transformState (o) {
    let i, attr;
    let state = {};
    for (i in o) {
        if (o.hasOwnProperty(i)) {
            attr = o[i];
            state[i] = attr && attr.toJS ? attr.toJS() : attr && typeof(attr) === 'function' ? attr() : attr;
        }
    }

    return state;
}
let appLogger = logger({
  stateTransformer: state => transformState(state)
});

let store = compose(applyMiddleware(thunk, appLogger))(createStore)(reducer);

module.exports = ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('react-target')
    );
