import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import {
 createStore, combineReducers, applyMiddleware, compose 
} from 'redux';
import thunk from 'redux-thunk';

import Router from './src/router';

import User from './src/redux/reducers/userReducer';
import Map from './src/redux/reducers/mapReducer';

const rootReducer = combineReducers({
  User,
  Map,
});
const composeEnchanters = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnchanters(applyMiddleware(thunk)));
// const store = createStore(rootReducer, applyMiddleware(thunk));
const Navigation = createAppContainer(Router);
const LOCATION_TASK_NAME = 'background-location-task';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
