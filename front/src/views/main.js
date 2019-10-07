import React from 'react';
import { View, Button } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View>
        <Button title="Go to static count screen" onPress={() => this.props.navigation.navigate('Map')} />
      </View>
    );
  }
}
