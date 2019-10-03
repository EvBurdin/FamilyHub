import React from 'react'
import {Image, Button, View, Text, Style} from 'react-native'
import {DrawerNavigator, createDrawerNavigator,createAppContainer} from 'react-navigation'
import Home from './screens/HomeScreen'
import Profile from './screens/Profile'

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: Home,
    },
    Notifications: {
      screen: Profile,
    },
  });
  
  export default createAppContainer(MyDrawerNavigator);
// import React, {Component} from "react";
// import Routes from "./Routes";
// const App = () => <Routes/>
// export default App;