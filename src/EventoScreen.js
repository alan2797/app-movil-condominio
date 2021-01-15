import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";
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
const eventos = [
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
const WS_REGISTRAR_EVENTO = "https://condomiosevilla.000webhostapp.com/WS/registrar_evento.php";
const WS_OBTENER_EVENTO = "https://condomiosevilla.000webhostapp.com/WS/obtener_evento.php";
class EventoScreen extends Component<Props>{
static navigationOptions = {
        title : "Evento",
        // tabBarLabel : "Agenda",
        tabBarIcon: (
          <Icon
            name='calendar'
            type='entypo'
            color = {'white'}
          />
        )
}
constructor(props){
    super(props)
    this.state = {
      evento:[]
    }
  }
componentDidMount(){
    var data = {
      idusuario : 1
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
      //console.warn("resp", resp);
      return resp.json();
    })
    .then((result) => {
        
      //console.warn(result)
      this.setState({
          evento : result.data
      })
    })
    .catch((error) => {
      console.warn("error xd", error);
    });
}
updateLista(data : any){
    console.warn(data)
    this.state.evento.unshift(data)
    this.setState({
        evento : this.state.evento
    })
}
render(){
        return(
            <View style={{flex:1,backgroundColor:'#fafafa'}}>
                <View style={{alignItems:'center',justifyContent:'center',padding: 8}}>
                   <Text style={{color:'black',fontWeight:'bold',
                                fontSize:25}}>Eventos</Text>     
                </View>
                <ScrollView>
                    {this.state.evento.map((data,index) => (
                        <TouchableOpacity 
                        onPress = {() => {
                            this.props.screenProps.parentNavigation.navigate('Invitar',{idusuario :this.props.screenProps.parentNavigation.state.params.idusuario,
                                                                    idevento :data.idevento,titulo : data.titulo  })
                        }}>
                        <View key={index} style={{backgroundColor:'white',margin:8,elevation:5}}
                            
                            >
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
                                     <Text style={{color:'black'}}>{data.hora_ini} : </Text>
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
                        </TouchableOpacity> 
                    ))}
                </ScrollView>
                <View style={{position:'absolute',end:0,bottom:0}}>
                    <Icon
                        name = 'add'
                        color = {'green'}
                        reverse
                        onPress = {() => {this.props.screenProps.parentNavigation.navigate('CrearEvento',{
                            idusuario : this.props.screenProps.parentNavigation.state.params.idusuario,updateLista:this.updateLista.bind(this)
                        })}}
                    />
                </View>

            </View>
        )
    
}
}
export default EventoScreen;