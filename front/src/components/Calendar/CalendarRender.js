import React from "./node_modules/react";
import { View, Text } from "react-native";
import { CalendarList } from './node_modules/react-native-calendars';
import Dialog from "./node_modules/react-native-dialog";

export default class CalendarRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false
    };
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    const workout = {key:'workout', color: 'green'};

    return (
      <View>
        <Text style={{marginTop: 30, marginBottom: 10, fontSize: 30, textAlign: 'center'  }}>Family calendar</Text>
        <CalendarList
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          firstDay={1}
          onDayPress={(day) => {console.log('selected day', day)}}
          onDayLongPress={this.showDialog}
          markedDates={{
            '2019-10-11': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
            '2019-10-08': {dots: [massage, workout], disabled: true}
          }}
          markingType={'multi-dot'}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Add new event</Dialog.Title>
          <Dialog.Description>
            Add event to calendar
          </Dialog.Description>
          {/* <Dialog.Input label="Add event" onChangeText={} ></Dialog.Input> */}
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}
