import React from 'react';
import { createAppContainer } from 'react-navigation';
import Router from './src/router';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

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
    return <Navigation />;
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
    console.log(locationPostData);
  }
});
