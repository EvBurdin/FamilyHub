import React, { Component } from 'react'
import {
    View,
    AsyncStorage,
} from 'react-native';

const STORAGE_KEY = '@save_cookie';

export default class logout extends Component {
    state={}
    async componentDidMount(){
        const cookie = await AsyncStorage.getItem(STORAGE_KEY);
        const response = await fetch('http://134.209.82.36.nip.io:3000/api/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${cookie}`,
        },
      });
      await AsyncStorage.setItem(STORAGE_KEY,'')
      this.props.navigation.navigate('Login');
    }
    
    render() {
        return (
            <View></View>
        )
    }
}
