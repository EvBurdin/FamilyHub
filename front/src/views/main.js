import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import io from 'socket.io-client';

const LOCATION_TASK_NAME = 'background-location-task';

class Main extends React.Component {
  state = {
    cookies: '',
    interval: '',
  };
  static navigationOptions = {
    title: 'Main',
  };

  static showHELLO() {
    console.log('HELLO');
  }
  componentDidMount() {
    // interval = setInterval(() => {
    //   console.log('INTERVAL +++++++++++');
    // }, 1000);

    this.runGeoLocation();
    this.socket = new WebSocket('http://134.209.82.36:3000');
    this.socket.onopen = () => {
      // connection opened
      this.socket.send('something'); // send a message
    };
  }
  io = () => {
    console.log('adssadsa');
  };
  static getCookies() {
    return this.props.cookies;
  }
  runGeoLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 180000,
        distanceInterval: 10,
      });
    } else {
      return console.log('false');
    }
  };
  render() {
    return (
      <View>
        <Button title="Go to static count screen" onPress={() => this.props.navigation.navigate('Map')} />
      </View>
    );
  }
}
function mapStateToProps(store) {
  return {
    // isUserLogin: !!store.userReducer.user,
    cookies: store.User.cookies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // userLogin: (user, cookie) => dispatch(userLogin(user, cookie)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  Main.showHELLO();
  if (error) {
    console.log(error);
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
    try {
      fetch('http://134.209.82.36.nip.io:3000/api/coordinates', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${Main.getCookies()}`,
        },
        body: JSON.stringify(locationPostData),
      });
    } catch (e) {
      console.log(e);
      // try{
      //   response = fetch('http://134.209.82.36.nip.io:3000/api/coordinates', {
      //     method: 'GET',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //       Cache: 'no-cache',
      //       credentials: 'same-origin',
      //       Cookie: `connect.sid=${thisCookie}`,
      //     },
      //     body: JSON.stringify(locationPostData),
      //   });
      //   const myJson = await response.json();
      // } catch (e) {
      //   console.log(e);
    }
  }
});
