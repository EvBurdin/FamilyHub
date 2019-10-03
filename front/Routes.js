import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./screens/HomeScreen";
import Profile from "./screens/Profile";
const Project = createStackNavigator({
  Home: {
   screen: Home
  },
  Profile: {
   screen: Profile
  }
});
export default createAppContainer(Project);