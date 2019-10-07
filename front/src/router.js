import { createDrawerNavigator } from 'react-navigation';
import Main from './views/main';
import showMap from './views/map';
import TODOList from './views/ToDoList';

export default createDrawerNavigator({
  Main: {
    screen: Main,
  },
  Notifications: {
    screen: showMap,
  },
  TODOs: {
    screen: TODOList,
  },
});
