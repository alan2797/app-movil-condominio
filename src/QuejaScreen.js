import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
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
const quejas = [
    {
        titulo : "Canchas",
        descripcion : "habra una reunion en la casa del delegado ",
        fecha : "25/11/19",
        hora : "12:00",
    },
    {
        titulo : "Piscinsa",
        descripcion : "se tratara sobre las diferentes actividades de la kermes ",
        fecha : "15/11/19",
        hora : "18:30",
    }
]
class QuejaScreen extends Component<Props>{
static navigationOptions = {
        title : "Queja",
        // tabBarLabel : "Agenda",
        tabBarIcon: (
          <Icon
            name='bookmarks'
            type='entypo'
            color={'white'}
          />
        )
}
render(){
    return(
        <View style={{flex:1,backgroundColor:'#fafafa'}}>
            <View style={{alignItems:'center',justifyContent:'center',padding: 8}}>
               <Text style={{color:'black',fontWeight:'bold',
                            fontSize:25}}>Quejas</Text>     
            </View>
            <ScrollView>
                {quejas.map((data,index) => (
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
export default QuejaScreen;