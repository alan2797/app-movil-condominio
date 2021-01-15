import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TextInput} from 'react-native';
import {Icon,Button} from "react-native-elements";
type Props = {};

const WS_REGISTRAR_EVENTO = "https://condomiosevilla.000webhostapp.com/WS/registrar_evento.php";
const WS_OBTENER_EVENTO = "https://condomiosevilla.000webhostapp.com/WS/obtener_evento.php";
class CrearEvento extends Component <Props>{
    static navigationOptions = {
        title : 'Crear Eventos'
    }
    constructor(props){
        super(props)
        this.state = {
          titulo : '',
          descripcion : '',
          fecha : '2019-07-12',
          fechaLabel : '',
          hora_inicio : '10:00',
          hora_inicio_label :'',
          hora_fin : '13:00',
          hora_fin_label :'',
          evento:[]
        }
      }
      componentDidMount(){
       /*   console.warn("ididid  ",this.props.navigation.state.params.idusuario)
          var data = {
            idusuario : Number(this.props.navigation.state.params.idusuario)
        }
          fetch(WS_OBTENER_EVENTO, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((resp) => {
            console.warn("resp", resp);
            return resp.json();
          })
          .then((result) => {
              
            console.warn(result)
            this.setState({
                evento : result.data
            })
          })
          .catch((error) => {
            console.warn("error xd", error);
          });*/
      }
    registrarEvento(){
        
        var data = {
            titulo : this.state.titulo,
            descripcion : this.state.descripcion,
            fecha : this.state.fecha,
            hora_inicio : this.state.hora_inicio,
            hora_fin : this.state.hora_fin,
            idusuario : Number(this.props.navigation.state.params.idusuario)
        }
        console.warn(data)
        fetch(WS_REGISTRAR_EVENTO, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((resp) => {
            console.warn("resp", resp);
            return resp.json();
          })
          .then((result) => {
              
            console.warn(result)
            if (result.response == 1) {
              this.props.navigation.state.params.updateLista(result.evento)
              this.props.navigation.goBack();

            }
          })
          .catch((error) => {
            console.warn("error xd", error);
          });
    }
    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fafafa'}}>
                <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1}}>
                    <View style={{justifyContent:'center',paddingLeft:5}}>
                        <Icon
                            name = 'title'
                            type = 'material'
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingLeft:8}}>
                        <TextInput placeholder='Titulo' onChangeText={(text) => {this.setState({titulo:text})}}>

                        </TextInput>    
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1}}>
                    <View style={{justifyContent:'center',paddingLeft:5}}>
                        <Icon
                            name = 'clipboard'
                            type = 'entypo'
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingLeft:8}}>
                        <TextInput placeholder='Descripción' multiline={true} 
                                    onChangeText={(text) => {this.setState({descripcion:text})}}>

                        </TextInput>    
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1}}>
                    <View style={{justifyContent:'center',paddingLeft:5}}>
                        <Icon
                            name = 'calendar'
                            type = 'font-awesome'
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingLeft:10,padding:15}}>
                        <TextInput placeholder='Fecha' 
                                    onChangeText={(text) => {this.setState({fecha:text})}}>

                        </TextInput>  
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1}}>
                    <View style={{justifyContent:'center',paddingLeft:5}}>
                        <Icon
                            name = 'clock'
                            type = 'entypo'
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingLeft:10,padding:15}}>
                      <TextInput placeholder='Hora Inicio'
                                    onChangeText={(text) => {this.setState({hora_inicio:text})}}>

                      </TextInput>  
                    </View>
                </View>
                <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1}}>
                    <View style={{justifyContent:'center',paddingLeft:5}}>
                        <Icon
                            name = 'clock'
                            type = 'entypo'
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingLeft:10,padding:15}}>
                      <TextInput placeholder='Hora Fin' 
                                    onChangeText={(text) => {this.setState({hora_fin:text})}}>

                      </TextInput>   
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:15}}>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                     <Button
                        title="Cancelar"
                        titleStyle={{color:'#008b02'}}
                        type="outline"
                        buttonStyle = {{borderRadius:15,borderColor:'#008b02',padding:10}}
                        raised
                        onPress = {() => {this.props.navigation.goBack()}}
                     />  
                   </View>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                     <Button
                        title="Guardar"
                        type="outline"
                        titleStyle={{color:'#008b02'}}
                        buttonStyle = {{borderRadius:15,borderColor:'#008b02',padding:10}}
                        raised
                        onPress = {() => {this.registrarEvento()}}
                     />    
                   </View> 
                </View>
            </ScrollView>
        )
    }
}
export default CrearEvento;