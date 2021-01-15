import React, {Component} from 'react';
import {Platform, StyleSheet,Alert,
         Text, View,ScrollView,TextInput,Modal,
         TouchableHighlight,TouchableOpacity,ToastAndroid} from 'react-native';
import {Icon,Button} from "react-native-elements";
type Props = {};
const colore = [
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
    '#3b84c1','#db3e00','#4caf50','#fcb900','#f44336','#0693e3','#795548',
]
const WS_REGISTRAR_INVITADO = "https://condomiosevilla.000webhostapp.com/WS/registrar_invitado.php";
const WS_OBTENER_INVITADOS = "https://condomiosevilla.000webhostapp.com/WS/obtener_invitado.php";
class InvitadoScreen extends Component<Props>{
    static navigationOptions = {
        title : 'Crear Invitados'
    }
    constructor(props){
        super(props)
        this.state = {
          nombre : '',
          apellido : '',
          edad : -1,
          correo : '',
          fkidevento : '',
          fkidpropietario : '',
          codigo_qr : '',
          invitados:[],
          modalVisible : false
        }
    }
    componentDidMount(){
        this.obtenerInvitados()
    }
    obtenerInvitados(){
        var data = {
            idevento : this.props.navigation.state.params.idevento
        }
        fetch(WS_OBTENER_INVITADOS, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((resp) => {
            //console.warn("resp", resp);
            return resp.json();
          })
          .then((result) => {
              
            //console.warn(result)
            this.setState({
                invitados : result.data
            })
          })
          .catch((error) => {
            console.warn("error xd", error);
          });
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    registrarInvitado(){
        console.warn(this.state)
               
        var data = {
            nombre : this.state.nombre,
            apellido : this.state.apellido,
            edad : this.state.edad,
            correo : this.state.correo,
            fkidevento : this.props.navigation.state.params.idevento
        }
        console.warn(data)
        fetch(WS_REGISTRAR_INVITADO, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((resp) => {
            //console.warn("resp", resp);
            return resp.json();
          })
          .then((result) => {
              
            console.warn(result)
            if (result.response == 1) {
              this.obtenerInvitados();
              ToastAndroid.show("se registro correctamente",ToastAndroid.SHORT);
              this.setModalVisible(false)

            }
          })
          .catch((error) => {
            console.warn("error xd", error);
              this.obtenerInvitados();
              ToastAndroid.show("se registro correctamente",ToastAndroid.SHORT);
              this.setModalVisible(false)
          });
    }
    render(){
        return(
            <View style={{flex:1}}>
                 <ScrollView style={{flex:1,backgroundColor:'#fafafa'}}>
                <View style={{alignItems:'center',padding:8}}>
                    <Text style={{color:'#008b02',fontWeight:'bold',fontSize:20}}>{this.props.navigation.state.params.titulo}</Text>
                </View>
                {this.state.invitados.map((datos,index)=>(
                    <View key={index} style={{backgroundColor:'white',margin:8,elevation:5}}
                            
                            >
                            <View style={{flexDirection:'row'}}>   
                                <View style={{padding:5,justifyContent:'center'}}>
                                    <Icon
                                        name = 'user'
                                        type= 'entypo'
                                        reverse
                                        size={12}
                                        color = {colore[index]}
                                    /> 
                                </View> 
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{color:'black',fontWeight:'bold'}}>{datos.nombre + " " + datos.apellido}</Text>    
                                </View> 
                                <View style={{padding:2,justifyContent:'center'}}>
                                     <Text style={{color:'black'}}>Edad : {datos.edad} </Text>
                                </View>  
                            </View> 
                            <View style={{backgroundColor:'#f2f3f4'}}>
                                <View style={{flex:1,padding:10,alignItems:'center',justifyContent:'center',
                                                backgroundColor:'#f2f3f4'}}>
                                     <Text style={{color:'black',textAlign:'center'}}>{datos.correo}</Text>
                                </View>  
                            </View>    
                        </View>
                ))}
                <Modal
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}>
                    <View style={{marginTop: 0,flex:1,borderRadius:5
                                ,backgroundColor : 'rgba(0, 0, 0, 0.53)',alignItems : 'center',justifyContent:'center'}}>
                        <View style={{ backgroundColor : 'white',
                            height : '65%',
                            width : '80%',
                            borderRadius:5
                        }}>
                            <View style={{alignItems:'center',padding:8}}>
                                <Text style={{
                                    color:'black',fontWeight:'bold',fontSize:20
                                }}>Registrar Invitado</Text>
                            </View>
                            <View style={{paddingLeft:15}}>
                                <View>
                                    <TextInput placeholder='Nombre'
                                             onChangeText={(text) => {this.setState({nombre:text})}}
                                    />
                                </View>
                                <View>
                                    <TextInput placeholder='Apellido'
                                             onChangeText={(text) => {this.setState({apellido:text})}}
                                    />
                                </View>
                                <View>
                                    <TextInput placeholder='Edad'
                                             onChangeText={(text) => {this.setState({edad:text})}}
                                    />
                                </View>
                                <View>
                                    <TextInput placeholder='Correo'
                                             onChangeText={(text) => {this.setState({correo:text})}}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row',marginTop:15,flex:1,justifyContent:'flex-end'}}>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Button
                                        title="Cancelar"
                                        titleStyle={{color:'#008b02'}}
                                        type="outline"
                                        buttonStyle = {{borderRadius:15,borderColor:'#008b02',padding:10}}
                                        raised
                                        onPress = {() => { this.setModalVisible(false);}}
                                    />  
                                </View>
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Button
                                        title="Guardar"
                                        type="outline"
                                        titleStyle={{color:'#008b02'}}
                                        buttonStyle = {{borderRadius:15,borderColor:'#008b02',padding:10}}
                                        raised
                                        onPress = {() => { this.registrarInvitado()}}
                                    />    
                                </View> 
                            </View>  
                            <View style={{position:'absolute',end:10,marginTop:10}}>
                                <TouchableOpacity
                                            onPress={()=>{
                                                this.setModalVisible(false);
                                            }} >
                                    <Icon name='times'
                                            type="font-awesome">

                                    </Icon>
                                </TouchableOpacity>
                            </View>  
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <View style={{position:'absolute',end:0,bottom:0}}>
                    <Icon
                        name = 'add'
                        color = {'green'}
                        reverse
                        onPress={()=>{this.setModalVisible(true);}}
                    />
                </View>
            </View>
           

        )
    }
}
export default InvitadoScreen;