import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import Router from './src/router';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import User from './src/redux/reducers/userReducer';
import Map from './src/redux/reducers/mapReducer';

const rootReducer = combineReducers({
  User,
  Map,
});
const composeEnchanters = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnchanters(applyMiddleware(thunk)));

const Navigation = createAppContainer(Router);
const LOCATION_TASK_NAME = 'background-location-task';

export default class App extends React.Component {
  componentDidMount() {
    this.runGeoLocation();
  }
  runGeoLocation = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 60000,
      distanceInterval: 10,
    });
  };
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const locationPostData = {
      accuracy: data.locations[0].coords.accuracy,
      altitude: data.locations[0].coords.altitude,
      heading: data.locations[0].coords.heading,
      latitude: data.locations[0].coords.latitude,
      longitude: data.locations[0].coords.longitude,
      speed: data.locations[0].coords.speed,
      timestamp: data.locations[0].timestamp,
    };
    // console.log(locationPostData);
    // const response = fetch('http://134.209.82.36.nip.io:3000/api/coordinates', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Cache: 'no-cache',
    //     credentials: 'same-origin',
    //     Cookie: 'connect.sid=s:IbnzXEW3AGkWl_taWKkfVK9Y4FDaohA1.vnysLJuDJH3L4pL5DudyhiaKSCMCA7FaxkWV/Hc/nEo',
    //   },
    //   body: JSON.stringify(locationPostData),
    // });
  }
});
