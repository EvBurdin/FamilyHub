import React from 'react';
import { View } from 'react-native';
import CalendarRender from '../components/Calendar/CalendarRender';

export default class Calendar extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };
  render() {
    return (
      <View>
          <CalendarRender />
      </View>
    );
  }
}
