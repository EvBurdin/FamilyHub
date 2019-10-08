import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { View, StyleSheet, ScrollView, Button, SafeAreaView, Dimensions } from 'react-native';
import Main from './views/main';
import showMap from './views/map';
import Login from './views/login';
import Logout from './views/logout';
import FamilyCreateJoin from './views/familyCreateJoin';

const drawerNavigator = createDrawerNavigator({
  Main,
  showMap,
  Logout,
});

const CustomDrawerComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  </ScrollView>
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
);
