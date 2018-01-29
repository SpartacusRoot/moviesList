import { AppRegistry } from 'react-native';
// import App from './App';
import {  Tabs } from './config/route';
import React, { Component } from 'react';

class App extends Component {
    render() {
      return <Tabs />;
    }
  }
  
 export default App;

AppRegistry.registerComponent('secondReact', () => App);
