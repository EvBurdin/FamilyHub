import React, { Component } from 'react';
import { AuthSession } from 'expo';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import axios from 'axios';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    };
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  signInWithGoogle = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);

    let result = await AuthSession.startAsync({
      authUrl: `http://134.209.82.36.nip.io:3000/api/login/google`,
    });
    console.log(result);

    if (result.type === 'success') {
      const response = await axios.get('http://134.209.82.36.nip.io:3000/api/logged');
      const user = response.data;
      console.log(user);
    }

    this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 30, backgroundColor: 'black' }}>Family</Text>
          </View>
          <View style={{ marginTop: -2, marginLeft: 60 }}>
            <Text style={{ color: 'black', fontSize: 30, backgroundColor: '#FFFF33' }}>Hub</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{ uri: 'https://img.icons8.com/ultraviolet/40/000000/gmail-login.png' }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            keyboardAppearance="light"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener('login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.signInWithGoogle()}
        >
          <Text style={styles.loginText}>Login with Google</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

LoginView.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    // borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  titleText: {
    color: '#CCCC00',
    fontSize: 30,
  },
});
