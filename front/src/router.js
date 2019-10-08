import { createDrawerNavigator,createSwitchNavigator } from 'react-navigation';
import Main from './views/main';
import showMap from './views/map';
import Login from './views/login';

const drawerNavigator = createDrawerNavigator({
  Main:{
    screen:Main
  },
  showMap:{
    screen:showMap
  },
},{
  initialRouteName : 'Main',
});
export default createSwitchNavigator({
  Login:{
    screen:Login
  },
  Drawer: drawerNavigator,
},{
  initialRouteName : 'Login',
});

