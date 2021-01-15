import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Input ,Icon, Button} from 'react-native-elements';
//import firebase from 'react-native-firebase';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';

const data = [
    {
        titulo : "reunion",
        descripcion : "habra una reunion en la casa del delegado ",
        fecha : "25/11/19",
        hora : "12:00",
    },
    {
        titulo : "Asamblea",
        descripcion : "se tratara sobre las diferentes actividades de la kermes ",
        fecha : "15/11/19",
        hora : "18:30",
    }
]

const WS_REGISTER_TOKEN = "https://condomiosevilla.000webhostapp.com/WS/registrar_token.php";
class Home extends Component<Props> {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        //this.obtenerToken();
    }

    obtenerToken() {
        firebase.messaging().getToken()
        .then((token) => {
            //console.warn(token);
            this.actualizarToken(token);
        })
        .catch(error => {
            console.log(error);
        })
    }

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
            //console.log("resp", resp);
            return resp.json();
          })
          .then((result) => {
            //console.log(result);
          })
          .catch((error) => {
            console.warn("error ", error);
          });
    }

    render(){
        return(
            <MenuProvider>
                <View style={{backgroundColor:'#fafafa',flex:1}}>
                    <View style={{backgroundColor:'#1a237e',height:70}}>
                        <View style={{justifyContent:'center',alignItems:'flex-end',
                                    alignContent:'center',marginTop:15,marginRight:8}}>
                            <Menu>
                            <MenuTrigger >
                                <Icon
                                    name="menu"
                                    type = "entypo"
                                    size={30}
                                    color="white"
                                />
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => alert("Eventos")}>
                                    <Text style={{color: 'black'}}>Eventos</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Invitados`)} >
                                    <Text style={{color: 'black'}}>Invitados</Text>
                                </MenuOption>
                                <MenuOption onSelect={() => alert(`Invitados`)}  text='Queja' />
                                <MenuOption onSelect={() => this.props.navigation.goBack()}  text='Salir' />
                            </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',padding:20,marginLeft:5,marginRight:5,
                                borderBottomColor:'black',borderBottomWidth:1}}>
                        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'#0d47a1',marginTop:10}}>
                            Condominio Sevilla Los Jardines
                        </Text>
                    </View>
                    <View >  
                        {data.map((data,index) => (
                        <View key={index} style={{margin:10,backgroundColor:'white',padding:5}}>
                            <View>
                                    <Text><Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Titulo :  </Text>{data.titulo}</Text>
                                    <Text><Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Descripcion :  </Text>{data.descripcion}</Text>
                            </View>
                            <View  style={{flexDirection:'row'}}>
                                    <Text style={{textAlign:'left'}}><Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>Fecha :  </Text>{data.fecha}</Text>
                                    <Text style={{alignItems:'flex-end'}}>   -   {data.hora}</Text>
                            </View> 
                        </View>        
                        ))}
                    </View>
                </View>
                </MenuProvider>

        )
    }

}
export default Home;