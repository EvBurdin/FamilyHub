import { createDrawerNavigator } from 'react-navigation';
import Main from './views/main';
import showMap from './views/map';

export default createDrawerNavigator({
  Main: {
    screen: Main,
  },
  Notifications: {
    screen: showMap,
  },
});
