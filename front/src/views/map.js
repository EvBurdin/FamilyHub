import React from 'react';
import { View } from 'react-native';

export default class showMap extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };
  render() {
    return <View style={{ zIndex: 2, width: '100%', height: '100%' }}></View>;
  }
}
