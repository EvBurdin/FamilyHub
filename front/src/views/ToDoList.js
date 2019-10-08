import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, CheckBox, Overlay, Input, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { showModal, editInput, saveTask, checkTask, delTask } from '../redux/actions/todoActions';

class ToDoList extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <TouchableHighlight underlayColor="white">
          <ScrollView>
            {this.props.list.map((item, i) => (
              <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <CheckBox
                  key={i}
                  title={item.title}
                  checked={item.checked}
                  onIconPress={() => {
                    () => this.props.checkTask(i);
                  }}
                  onLongPress={() => this.props.delTask(i)}
                  onPress={() => {
                    () => this.props.showModal(i);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </TouchableHighlight>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button onPress={() => this.props.showModal(-1)} title="Create new task" color="#841584" />
        </View>
        <View>
          <Overlay
            height="auto"
            isVisible={this.props.isVisibleNewTask}
            onBackdropPress={() => this.props.showModal(-1)}
          >
            <View>
              <Input autoFocus onChangeText={text => this.props.editInput(text)} value={this.props.newTaskTitle} />
              <Button onPress={() => this.props.saveTask()} title="Save task" />
            </View>
          </Overlay>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    list: state.ToDoList.list,
    newTaskTitle: state.ToDoList.newTaskTitle,
    isVisibleNewTask: state.ToDoList.isVisibleNewTask,
    editTaskID: state.ToDoList.editTaskID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: i => dispatch(showModal(i)),
    editInput: text => dispatch(editInput(text)),
    saveTask: () => dispatch(saveTask()),
    checkTask: i => dispatch(checkTask(i)),
    delTask: i => dispatch(delTask(i)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);

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
