import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import ComunicadoScreen from './ComunicadoScreen';
import EventoScreen from './EventoScreen';
import { Input ,Icon, Button} from 'react-native-elements';
import QuejaScreen from './QuejaScreen';
import QRCodeScannerScreen from './QRCodeScannerScreen';
//import firebase from 'react-native-firebase';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';
const AppNavigatorBottom = createBottomTabNavigator(
    {
      Comunicado: {screen : ComunicadoScreen},
      Evento: {screen : EventoScreen},
      Queja : {screen : QuejaScreen},
      Verificar: {screen: QRCodeScannerScreen},
    },
    {
      initialRouteName: "Comunicado",
      title: 'Condominio',
      tabBarOptions:{
          activeTintColor: 'white',
          inactiveTintColor : 'white',
          activeBackgroundColor : '#333333',
          inactiveBackgroundColor : '#008b02'
      },
      backBehavior : 'none',
    }
  );
  const WS_REGISTER_TOKEN = "https://condomiosevilla.000webhostapp.com/WS/registrar_token.php";
  //const AppContainerBottom = createAppContainer(AppNavigatorBottom);
  type Props = {}
  class Main extends Component <Props>{
    static navigationOptions = {
        header : null
    }
    componentDidMount() {
        //this.obtenerToken();
    }
    /*obtenerToken() {
        firebase.messaging().getToken()
        .then((token) => {
            //console.warn(token);
            this.actualizarToken(token);
        })
        .catch(error => {
            console.log(error);
        })
    }*/

    actualizarToken(token) {
        fetch(WS_REGISTER_TOKEN, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                idusuario: this.props.navigation.state.params.idusuario
            }),
          })
          .then((resp) => {
            //console.warn("resp", resp);
            return resp.json();
          })
          .then((result) => {
            //console.warn(result);
          })
          .catch((error) => {
            console.warn("error ", error);
          });
    }
    render(){
        return(
            <MenuProvider style={{flex : 1}}>
                <View style={{backgroundColor:'#fafafa',flex:1}}>
                    <View style={{backgroundColor:'white',height:50,flexDirection : 'row',elevation:5}}>
                        <View style={{justifyContent:'center',paddingLeft:10}}>
                            <Text style={{color:'#008b02',fontWeight:'bold',fontSize:20}}>Sevilla los Jardines</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',
                                    alignContent:'center',paddingRight:10}}>
                            <Menu>
                            <MenuTrigger >
                                <Icon
                                    name="menu"
                                    type = "entypo"
                                    size={30}
                                    color="black"
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert("Esta seguro de salir?")}>
                                <Text style={{color: 'black'}}>Perfil</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => alert("Esta seguro de salir?")}>
                                <Text style={{color: 'black'}}>Salir</Text>
                                </MenuOption>
                            </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    
                  <AppNavigatorBottom screenProps={{parentNavigation :this.props.navigation, idusuario:this.props.navigation.state.params.idusuario}}/>
                </View>
            </MenuProvider>  
        );
    }  
  }
  
  export default Main;