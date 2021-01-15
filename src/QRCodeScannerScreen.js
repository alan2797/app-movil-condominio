import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';
import {Icon} from "react-native-elements";
import { CameraKitCameraScreen } from 'react-native-camera-kit';
//import DeviceInfo from 'react-native-device-info';
 
export default class QRCodeScannerScreen extends Component<Props> {
  static navigationOptions = {
    title : "Verificar",
    // tabBarLabel : "Agenda",
    tabBarIcon: (
      <Icon
        name='qrcode'
        type='font-awesome'
        color={'white'}
      />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: false,
    };
  }
 
  openLink_in_browser = () => {
 
    Linking.openURL(this.state.QR_Code_Value);
 
  }
 
  onQR_Code_Scan_Done = (QR_Code) => {
    console.warn("a123123  ",QR_Code)
    this.setState({ QR_Code_Value: QR_Code });
 
    this.setState({ Start_Scanner: false });
  }
 
  open_QR_Code_Scanner=()=> {
 
    var that = this;
 
    if (Platform.OS === 'android' /*&& DeviceInfo.getAPILevel() > 22*/) {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
 
            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }
  
 
  render() {
    if (!this.state.Start_Scanner) {
 
      return (
        <View style={styles.MainContainer}>
 
          <Text style={{ fontSize: 22, textAlign: 'center' }}>Lector de Codigo QR</Text>
 
          {/*<Text style={styles.QR_text}>
            {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
          </Text>*/}
 
          {this.state.QR_Code_Value.includes("http") ?
            <TouchableOpacity
              onPress={this.openLink_in_browser}
              style={styles.button}>
              <Text style={{ color: '#FFF', fontSize: 14 }}>Open Link in default Browser</Text>
            </TouchableOpacity> : null
          }
 
          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 14 }}>
              Abrir Escanner de CODIGO QR
            </Text>
          </TouchableOpacity>
 
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
 
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={false}
          laserColor={'#FF3D00'}
          frameColor={'#00C853'}
          colorForScannerFrame={'black'}
          offsetForScannerFrame = {30}
          heightForScannerFrame = {600}
          onReadCode={event =>{
            console.warn("leeee")
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            }}
        />
 
      </View>
    );
  }
}
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14
  },
});