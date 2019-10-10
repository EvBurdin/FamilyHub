import React, { Component } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Button, CheckBox, Overlay, Input, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { addNewCheckpoint } from '../redux/actions/AddNewZoneActions';
import { pickCoordinate } from '../redux/actions/mapActions';
import ModalMap from '../components/map/MapAddCoordinate';

class AddNewZone extends Component {
  state = {
    isVisible: false,
    name: '',
    description: '',
  };

  componentDidMount() {
    console.log(this.props.checkpoints);
  }

  open = () => {
    this.setState({
      isVisible: true,
    });
  };
  close = () => {
    this.setState({
      isVisible: false,
      name: '',
    });
    this.props.pickCoordinate('');
  };
  save = () => {
    if (this.state.name.length === 0) {
      ToastAndroid.showWithGravityAndOffset('Enter Checkpoint Name !', ToastAndroid.LONG, ToastAndroid.TOP, 20, 200);
    } else {
      this.props.addNewCheckpoint({
        cookies: this.props.cookies,
        latitude: this.props.pickedCoordinate.latitude,
        longitude: this.props.pickedCoordinate.longitude,
        name: this.state.name,
        description: this.state.description,
        familyId: this.props.user.Families[0].id,
      });
      this.close();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {!!this.props.checkpoints &&
            this.props.checkpoints.map(el => {
              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.pickLocation()}
              >
                <Text style={styles.loginText}>{el.name}</Text>
                <Text style={styles.loginText}>{el.description}</Text>
              </TouchableOpacity>;
            })}
          <Overlay
            style={{ zIndex: 5 }}
            isVisible={this.state.isVisible}
            // windowBackgroundColor="rgba(255, 255, 255, .5)"
            // overlayBackgroundColor="red"
            // width="auto"
            // height="auto"
          >
            <View style={{ height: 410 }}>
              <ModalMap></ModalMap>
            </View>
            <View style={styles.modalContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Checkpoint Name"
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Enter Checkpoint Description"
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  onChangeText={description => this.setState({ description })}
                />
              </View>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.save()}>
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.close()}>
                <Text style={styles.loginText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </View>
        <View style={{ position: 'absolute' }}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.open()}>
            <Text
              style={
                (styles.loginText,
                {
                  fontSize: 50,
                  fontWeight: '900',
                  color: 'white',
                })
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cookies: state.User.cookies,
    checkpoints: state.AddNewZone.checkpoints,
    pickedCoordinate: state.Map.pickedCoordinate,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCoordinate: coordinates => dispatch(pickCoordinate(coordinates)),
    addNewCheckpoint: (cookies, text) => dispatch(addNewCheckpoint(cookies, text)),
    // editInput: text => dispatch(editInput(text)),
    // saveTask: () => dispatch(saveTask()),
    // checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title,checkedBool, i, id, cookie)),
    // delTask: i => dispatch(delTask(i)),
    // getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewZone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
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
  buttonContainer: {
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
    width: 250,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  addButton: {
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F96F6F',
    position: 'absolute',
    zIndex: 2,
    marginTop: 800,
    marginLeft: 330,
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingBottom: 5,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
});
