import { createDrawerNavigator } from 'react-navigation';
import Main from './views/main';
import showMap from './views/map';
import Login from './views/login';
import TODOList from './views/ToDoList';

export default createDrawerNavigator({
  Login: {
    screen: Login,
  },
  Main: {
    screen: Main,
  },
  Map: {
    screen: showMap,
  },
  TODOs: {
    screen: TODOList,
  },
});
