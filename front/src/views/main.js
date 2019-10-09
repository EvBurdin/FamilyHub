import React from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';
let thisCookie = '';

class Main extends React.Component {
  state = {
    cookies: '',
  };
  static navigationOptions = {
    title: 'Main',
  };
  componentDidMount() {
    this.runGeoLocation();
  }
  runGeoLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      (thisCookie = this.props.cookies),
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 60000,
          distanceInterval: 10,
        });
    } else {
      return console.log('false');
    }
  };
  render() {
    return (
      <View>
        <Text style={{fontSize: 30, marginTop: 50, textAlign: 'center'}}>Main</Text>
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
    const response = fetch('http://134.209.82.36.nip.io:3000/api/coordinates', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${thisCookie}`,
      },
      body: JSON.stringify(locationPostData),
    });
  }
});
