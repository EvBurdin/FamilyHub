import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import {
 View, StyleSheet, ScrollView, Button, SafeAreaView, Dimensions 
} from 'react-native';
import Main from './views/main';
import Calendar from './views/Calendar';
import showMap from './views/map';
import Login from './views/login';
import Logout from './views/logout';
import AddNewZone from './views/AddNewZone';
import FamilyCreateJoin from './views/familyCreateJoin';

const CustomDrawerComponent = (props) => (
  <ScrollView style={{ marginTop: 30 }}>
    <DrawerNavigatorItems {...props} />
  </ScrollView>
);

const drawerNavigator = createDrawerNavigator(
  {
    Main,
    showMap,
    AddNewZone,
    Logout,
    Calendar,
  },
  {
    contentComponent: CustomDrawerComponent,
  },
);

export default createSwitchNavigator(
  {
    Login,
    FamilyCreateJoin: {
      screen: FamilyCreateJoin,
    },
    Drawer: drawerNavigator,
  },
  {
    initialRouteName: 'Login',
  },
  // Calendar: {
  //   screen: Calendar,
  // },
);
