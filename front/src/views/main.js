import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Notifications } from 'expo';
import { ListItem } from 'react-native-elements';
const LOCATION_TASK_NAME = 'background-location-task';
let thisCookies = '';

const styles = StyleSheet.create({
  stretch: { marginTop: 10, textAlign: 'center', fontSize: 30 },
});

class Main extends React.Component {
  state = {
    cookies: '',
    interval: '',
  };
  static navigationOptions = {
    title: 'Main',
  };
  componentDidMount() {
    this.createChanels();
    thisCookies = this.props.cookies;
    this.runGeoLocation();
  }
  createChanels = () => {
    Notifications.createChannelAndroidAsync('EVENT', {
      name: 'EVENT',
      sound: true,
      vibrate: true,
      priority: 'max',
    });
  };
  static pushNotifications(data) {
    console.log('Notifications = ' + data);

    Notifications.presentLocalNotificationAsync({
      title: data.title,
      body: data.body,
      Android: {
        channelId: 'EVENT',
      },
      ChannelAndroid: {
        name: 'FamilyHub',
      },
    });
  }

  runGeoLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const statusN = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (true) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 180000,
        distanceInterval: 1,
      });
    } else {
      return console.log('false');
    }
  };
  render() {
    const list = [
      {
        name: 'Юрий',
        avatar_url: 'https://lh3.googleusercontent.com/a-/AAuE7mBPI0szTXncL_D6YLKNvUv8A-vofgJJ1gKZBTXmOoQ',
        subtitle: 'Копыстко',
      },
      {
        name: 'Евгений',
        avatar_url:
          'https://lh3.googleusercontent.com/-dXKAHKBy5ag/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcS5nw-EOVdSwbDA_6fEbBmQgETjQ/photo.jpg',
        subtitle: 'Бурдин',
      },
      {
        name: 'Петр',
        avatar_url: 'https://lh3.googleusercontent.com/a-/AAuE7mAtmKoekw9sr1SFuohHf0KkFjXvwIAESoovaTai1Q',
        subtitle: 'Котельников',
      },
      {
        name: 'Алексей',
        avatar_url: 'https://lh3.googleusercontent.com/a-/AAuE7mDPvfqrYrVLN5rKD6IbzaSJkRensbm9_628mOqS',
        subtitle: 'Окунев',
      },
    ];
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        >
          <Image
            style={{
              marginTop: '10%',
              alignSelf: 'center',
              maxWidth: '100%',
            }}
            source={require('../img/family.jpg')}
          />
          <Text style={styles.stretch}>My family: DevTeam</Text>
          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
        </View>
      </ScrollView>
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

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
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
    console.log(locationPostData);
    try {
      response = await fetch('http://134.209.82.36.nip.io:3000/api/coordinates', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${thisCookies}`,
        },
        body: JSON.stringify(locationPostData),
      });
    } catch (e) {
      console.log(e);
    }
    try {
      response = await fetch('http://134.209.82.36.nip.io:3000/api/events', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${thisCookies}`,
        },
      });
      const myJson = await response.json();
      if (myJson) {
        for (let i = 0; i < myJson.length; i++) {
          console.log('for ' + i);

          body =
            myJson[i].timestamp
              .slice(11, 16)
              .split(':')
              .join('.') +
            ' \n' +
            myJson[i].User.username.split('@')[0] +
            ' location: ' +
            myJson[i].event;
          Main.pushNotifications({
            title: 'FamilyHub',
            body: body,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
});
