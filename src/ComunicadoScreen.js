import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import {Icon} from "react-native-elements";

import {read,save} from './data/AsyncData';
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
const WS_COMUNICADO = "https://condomiosevilla.000webhostapp.com/WS/obtener_comunicados.php";
class ComunicadoScreen extends Component<Props>{
  static navigationOptions = {
          title : "Comunicado",
          // tabBarLabel : "Agenda",
          tabBarIcon: (
            <Icon
              name='home'
              type='ant-design'
              color={'white'}
            />
          )
  }
  constructor(props){
      super(props)
      this.state = {
        comunicados : [],
      }
  }
  componentDidMount(){
      //console.warn(this.props)
    // this.props.screenProps.parentNavigation.navigate
      read("comunicados")
      .then((value) =>{
        if (value !== null && value !== undefined){
          var comunicados = JSON.parse(value);
          this.setState({
              comunicados : comunicados
          })
          this.obtenerComunicados()
        }else{
            this.obtenerComunicados()
        }
      })
      .catch((error) =>{
        console.log('Error no existe usuario');
      });
  }

  obtenerComunicados(){
      var data = {
          id : 1
      }
      fetch(WS_COMUNICADO, {
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
          if (result.response == 1) {
            //console.log(result);
            this.setState({
                comunicados : result.data
            })
            save("comunicados",JSON.stringify(result.data))
          } else {
            console.warn("Usuario o contraseña incorectos");
          }
        })
        .catch((error) => {
          console.warn("error xd", error);
        });
  }
  render(){
      return(
          <View style={{flex:1,backgroundColor:'#fafafa'}}>
              <View style={{alignItems:'center',justifyContent:'center',padding: 8}}>
                <Text style={{color:'black',fontWeight:'bold',
                              fontSize:25}}>Comunicados</Text>     
              </View>
              <ScrollView>
                  {this.state.comunicados.map((data,index) => (
                      <View key={index} style={{backgroundColor:'white',margin:8,elevation:5}}>
                          <View style={{flexDirection:'row'}}>   
                              <View style={{padding:5,justifyContent:'center'}}>
                                  <Icon
                                      name = 'book'
                                      type= 'ant-design'
                                      reverse
                                      size={12}
                                      color = {colore[index]}
                                  /> 
                              </View> 
                              <View style={{flex:1,justifyContent:'center'}}>
                                  <Text style={{color:'black',fontWeight:'bold'}}>{data.titulo}</Text>    
                              </View> 
                          </View> 
                          <View style={{flexDirection:'row'}}>
                              <View style={{padding:2}}>
                                  <Text style={{color:'black'}}>{data.hora} : </Text>
                              </View> 
                              <View style={{flex:1,justifyContent:'center',padding:2}}>
                                  <Text style={{color:'black'}}> {data.descripcion}</Text>    
                              </View> 
                          </View>
                          <View style={{backgroundColor:'#f2f3f4'}}>
                              <View style={{flex:1,padding:5,alignItems:'flex-end',justifyContent:'center',
                                              backgroundColor:'#f2f3f4'}}>
                                  <Text style={{color:'black'}}>{data.fecha}</Text>
                              </View>  
                          </View>    
                      </View> 
                  ))}
              </ScrollView>
          </View>
      )
  }
}
export default ComunicadoScreen;