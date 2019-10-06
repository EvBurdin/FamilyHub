import { createDrawerNavigator } from 'react-navigation';
import Main from './views/main';
// import showMap from './views/map';
import Calendar from './views/Calendar'

export default createDrawerNavigator({
  Main: {
    screen: Main,
  },
  // Notifications: {
  //   screen: showMap,
  // },
  Notifications: {
    screen: Calendar,
  },
});
