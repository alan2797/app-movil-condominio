/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, Alert} from 'react-native';
//import firebase from 'react-native-firebase'; 
import { Input ,Icon, Button, Image } from 'react-native-elements';
//import console = require('console');
const WS_LOGIN = 'http://192.168.43.123:8080/ServerCondominio/WS/login_user.php';
const WS = "https://condomiosevilla.000webhostapp.com/WS/login_user.php";
class LoginScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };
  constructor(props){
    super(props)
    this.state = {
      usuario : '',
      contraseña : '',
      cargando: false
    }

    this.onChangeUsuario = this.onChangeUsuario.bind(this);
    this.onChangeContraseña = this.onChangeContraseña.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    
  }

  login() {
    if (this.state.usuario.length === 0 || this.state.contraseña.length === 0) {
      Alert.alert("Atención","Los campos usuario y contraseña son obligatorios");
      return;
    }
    let data = {
      login: this.state.usuario,
      contrasenia: this.state.contraseña
    };
    //console.warn(data);
    this.setState({
      cargando: true
    });
    fetch(WS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((resp) => {
      //console.log("resp", resp);
      return resp.json();
    })
    .then((result) => {
      this.setState({
        cargando: false
      })
      if (result.response == 1) {
        //console.warn(result);
        this.props.navigation.navigate('Home', {
          idusuario: result.user.idusuario
        });
      } else {
        console.warn("Usuario o contraseña incorectos");
      }
    })
    .catch((error) => {
      this.setState({
        cargando: false
      })
      console.warn("error xd", error);
    });
    
  }

  iniciarHome(){
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    
  }

  onChangeUsuario(value) {
    this.setState({
      usuario: value
    })
  }

  onChangeContraseña(value) {
    this.setState({
      contraseña: value
    })
  }

  componentButton() {
    return (
      <Button
        onPress={this.login}
        containerStyle={{width:250,margin:10}}
        title="Iniciar Sesion"
        type="solid"
        loading = {this.state.cargando}
        raised
        buttonStyle = {{borderRadius:30,backgroundColor : '#008b02'}}
      />
    )
  }
  
  render() {
    const componentButton = this.componentButton();
    return (
      <View style={styles.container}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',borderColor:'#004dcf'}}>
            <Image
              source={require('./img/logo5.png')}
              style={{ width: 230, height: 150 }}
            />
            <Input
              placeholder='Usuario'
              inputContainerStyle = {{width:250,margin:10,borderWidth : 1,padding : 0,borderRadius : 40,marginTop : 35}}
              value={this.state.usuario}
              onChangeText={this.onChangeUsuario}
              leftIcon={
                <Icon
                  name='user'
                  size={20}
                  color='gray'
                  type="font-awesome"
                />
              }
            />
          
          <Input
            placeholder='Contraseña'
            inputContainerStyle = {{width:250,margin:10,borderWidth : 1,padding : 0,borderRadius : 40}}
            value={this.state.contraseña}
            onChangeText={this.onChangeContraseña}
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={20}
                color='gray'
                type="font-awesome"
              />
            }
          />
          { componentButton }
          

        </View>
        

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
});
export default LoginScreen;