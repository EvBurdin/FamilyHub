import React from "react";
import { View, Text } from "react-native";
import { CalendarList } from 'react-native-calendars';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';


class CalendarRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      currentDate: '',
      selected: {
        '': { 'color': '' }
      },
      title: '',
      text: '',

    };
  }

  pickDate = date => {
    this.setState({ currentDate: date })
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({
      dialogVisible: false,
      text: '',
      selected: {
        ...this.state.selected,
        [this.state.currentDate]: '',
      },
    });
    
  };



  handleOk = () => {
    // console.log(this.state);
    
    this.setState({
      dialogVisible: false,
      text: '',
      selected: {
        ...this.state.selected,
        [this.state.currentDate]: { color: 'green' },
      },
    });
  };
 
  handleDelete = () => {
    this.setState({ selected: '' });
  };

  onChangeText = (text) => {
    this.setState({text: text})
  }

  render() {
    // const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    // const workout = {key:'workout', color: 'green'};
    // const currentDate = this.state.currentDate;
    const selected = this.state.selected;
    const reactNativeModalProps = {
      onBackdropPress: this.handleCancel,
    };

    return (
      <View>
        <View style={{ height: 150, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 40, backgroundColor: 'black', borderRadius: 5 }}>Family</Text>
          </View>
          <View style={{ marginTop: -2, marginLeft: 70 }}>
            <Text style={{ color: 'black', fontSize: 40, backgroundColor: '#FFFF33', borderRadius: 5 }}>Calendar</Text>
          </View>
        </View>

        <CalendarList
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          firstDay={1}
          onDayPress={day => {
            this.pickDate(day.dateString);
            this.showDialog();
          }}
          onDayLongPress={day => {
            this.pickDate(day.dateString);
            // console.log('selected day', day);
          }}
          markedDates={selected}
          // '2019-10-20': { textColor: 'green' },
          // '2019-10-22': { startingDay: true, color: 'green' },
          // '2019-10-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
          // '2019-10-04': { disabled: true, startingDay: true, color: 'green', endingDay: true },

          markingType={'period'}
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
            textDayHeaderFontSize: 16,
          }}
        />
        <Dialog.Container visible={this.state.dialogVisible} {...reactNativeModalProps}>
          <Dialog.Title>Whats today?</Dialog.Title>
          {/* <Dialog.Description>
            Add event to calendar
          </Dialog.Description> */}
          {/* <Dialog.Input placeholder="add title here..."></Dialog.Input> */}
          <Dialog.Input>{this.state.text}</Dialog.Input>
          <Dialog.Input placeholder="Add..." onChangeText={text => this.onChangeText(text)}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          {/* <Dialog.Button label="Delete" onPress={this.handleDelete} /> */}
          <Dialog.Button label="Ok" onPress={this.handleOk} />
        </Dialog.Container>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarRender);
