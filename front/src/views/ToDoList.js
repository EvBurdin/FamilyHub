import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, CheckBox, Overlay, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  showModal,
  editInput,
  saveTask,
  checkTask,
  delTask,
  getFamilyToDo,
  saveTaskNew,
} from '../redux/actions/todoActions';

class ToDoList extends Component {
  state = {};

  componentDidMount() {
    this.familyToDoFetch();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.list.length < this.props.list.length) {
  //     this.familyToDoFetch();
  //   }
  // }

  async familyToDoFetch() {
    const somePromise = await this.props.getFamilyToDo(this.props.cookies);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <TouchableHighlight underlayColor="white">
          <ScrollView>
            {this.props.list
              .map((item, i) => (
                <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <CheckBox
                    key={item.id}
                    title={item.goal}
                    checked={item.active}
                    onIconPress={() => {
                      this.props.checkTask(
                        item.goal,
                        item.active,
                        i,
                        item.id || this.props.returnedFromDBTaskID,
                        this.props.cookies,
                      );
                    }}
                    onLongPress={() =>
                      this.props.delTask(i, item.id || this.props.returnedFromDBTaskID, this.props.cookies)
                    }
                    onPress={() => {
                      this.props.showModal(true, i, item.id || this.props.returnedFromDBTaskID);
                    }}
                  />
                </View>
              ))
              .sort((a, b) => a.key - b.key)}
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Button onPress={() => this.props.showModal(true, -1)} title="Create new task" color="#841584" />
            </View>
          </ScrollView>
        </TouchableHighlight>
        <View>
          <Overlay
            height="auto"
            isVisible={this.props.isVisibleNewTask}
            onBackdropPress={() => this.props.showModal(false, -1)}
          >
            <View>
              <Input autoFocus onChangeText={text => this.props.editInput(text)} value={this.props.newTaskTitle} />
              <Button
                onPress={() =>
                  this.props.saveTaskNew(
                    this.props.list.length,
                    this.props.newTaskTitle,
                    this.props.currentCheck,
                    this.props.currentTaskIDInDB,
                    this.props.curFamilyID,
                    this.props.cookies,
                  )
                }
                title="Save task"
              />
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
    cookies: state.User.cookies,
    curFamilyID: state.ToDoList.currentFamilyID,
    currentCheck: state.ToDoList.currentCheck,
    currentTaskIDInDB: state.ToDoList.currentTaskIDInDB,
    returnedFromDBTaskID: state.ToDoList.returnedFromDBTaskID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (bool, i, currID) => dispatch(showModal(bool, i, currID)),
    editInput: text => dispatch(editInput(text)),
    saveTask: () => dispatch(saveTask()),
    checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title, checkedBool, i, id, cookie)),
    delTask: (i, taskID, cookie) => dispatch(delTask(i, taskID, cookie)),
    getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
    saveTaskNew: (todoLength, title, checkedBool, taskID, curFamID, cookie) =>
      dispatch(saveTaskNew(todoLength, title, checkedBool, taskID, curFamID, cookie)),
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
