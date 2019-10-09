import { createDrawerNavigator } from 'react-navigation';
import Main from './views/main';
import Calendar from './views/Calendar'
import showMap from './views/map';
import Login from './views/login';

export default createDrawerNavigator({
  Login: {
    screen: Login,
  },
  Main: {
    screen: Main,
  },
  Calendar: {
    screen: Calendar,
  },
  Map: {
    screen: showMap,
  },
});
