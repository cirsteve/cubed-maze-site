import {createStore, applyMiddleware, compose} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedApp from './components/App.react';
import reducer from './reducers/ParentReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let appLogger = logger({
  stateTransformer: state => state.toJS ? state.toJS() : state
});

let store = compose(applyMiddleware(thunk, appLogger))(createStore)(reducer);

module.exports = ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('react-target')
    );
