/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import QRCodeScanner from 'react-native-qrcode-scanner';
import { createStackNavigator } from "react-navigation";
//import Icon from 'react-native-vector-icons/dist/FontAwesome'; 
import { Input ,Icon, Button} from 'react-native-elements';
//import console = require('console');
import LoginScreen from './src/loginScreen';
import Home from './src/Home';
import Main from './src/Main';
import CrearEvento from './src/CrearEvento';
import InvitarScreen from './src/InvitadoScreen';
import QRCodeScannerScreen from './src/QRCodeScannerScreen';
type Props = {};
const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: Main,
    CrearEvento : CrearEvento,
    Invitar : InvitarScreen,
    Scanner: QRCodeScannerScreen
  },
  {
    initialRouteName: "Login"
  }
);
//const AppContainer = createAppContainer(AppNavigator);
class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {

    }
  }

 
  render() {
    return (
      <AppNavigator/>
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/
export default App;
