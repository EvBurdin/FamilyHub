import React from 'react';
import { createAppContainer } from 'react-navigation';
import Router from './src/router';

const Navigation = createAppContainer(Router);

export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
