import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, CheckBox, Overlay, Input } from 'react-native-elements';

//
export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isVisibleNewTask: false,
      newTaskTitle: '',
      editTaskID: -1,
    };
    this._onSaveNewTask = this._onSaveNewTask.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <TouchableHighlight underlayColor="white">
          <ScrollView>
            {this.state.list.map((item, i) => (
              <View key={i + 100} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <CheckBox
                  key={i}
                  title={item.title}
                  checked={item.checked}
                  onIconPress={() => {
                    this._onClickCheckBox(i);
                  }}
                  onLongPress={() => this._onLongPressButton(i)}
                  onPress={() => {
                    this._onPressCheckBox(i);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </TouchableHighlight>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button onPress={() => this.setState({ isVisibleNewTask: true })} title="Create new task" color="#841584" />
        </View>
        <View>
          <Overlay
            height="auto"
            isVisible={this.state.isVisibleNewTask}
            onBackdropPress={() => this.setState({ isVisibleNewTask: false })}
          >
            <View>
              <Input
                autoFocus={true}
                onChangeText={text => this.setState({ newTaskTitle: text })}
                value={this.state.newTaskTitle}
              />
              <Button onPress={this._onSaveNewTask} title="Save task" />
            </View>
          </Overlay>
        </View>
      </View>
    );
  }

  _onClickCheckBox = keyI => {
    const newList = this.state.list;
    newList[keyI].checked = !newList[keyI].checked;
    return this.setState({ list: newList });
  };

  _onPressCheckBox = keyI => {
    console.log(`On one press - keyI: ${keyI}`);
    return this.setState({
      newTaskTitle: this.state.list[keyI].title,
      editTaskID: keyI,
      isVisibleNewTask: true,
    });
  };

  _onSaveNewTask = () => {
    let newList;
    console.log('-----------------------');
    console.log('onSaveNewTask - before setState:');
    console.log(`this.state.list.length: ${this.state.list.length}`);
    console.log(`this.state.newTaskTitle.length: ${this.state.newTaskTitle.length}`);
    console.log(`this.state.editTaskID: ${this.state.editTaskID}`);
    console.log(`typeof this.state.editTaskID: ${typeof this.state.editTaskID}\n`);

    this.state.list.length && this.state.newTaskTitle.length && this.state.editTaskID >= 0
      ? (console.log(`Edit - this.state.editTaskID: ${this.state.editTaskID}`),
        (newList = this.state.list),
        (newList[this.state.editTaskID].title = this.state.newTaskTitle),
        this.setState({ list: newList, editTaskID: -1, newTaskTitle: '', isVisibleNewTask: false }))
      : this.state.list.length && !(this.state.editTaskID >= 0)
      ? (console.log(`Not empty array - this.state.editTaskID: ${this.state.editTaskID}`),
        this.setState({
          list: [...this.state.list, { title: this.state.newTaskTitle, checked: false }],
          newTaskTitle: '',
          editTaskID: -1,
          isVisibleNewTask: false,
        }))
      : (console.log(`Empty array - this.state.newTaskTitle.length: ${this.state.newTaskTitle.length}`),
        this.setState({
          list: [{ title: this.state.newTaskTitle, checked: false }],
          newTaskTitle: '',
          editTaskID: -1,
          isVisibleNewTask: false,
        }));
  };

  _onLongPressButton = keyI => {
    this.setState({
      list: this.state.list.filter((task, index) => index !== keyI),
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
