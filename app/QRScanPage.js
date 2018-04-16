import React, { Component } from 'react';
import {Alert,Linking,Dimensions,LayoutAnimation,Text,View,StatusBar,StyleSheet,TouchableOpacity,} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import MainPage from './MainPage';

export default class QRScanPage extends Component {

  constructor(props) {
    super(props);
    this.state = {hasCameraPermission: null, lastScannedUrl: null};
  }

  componentDidMount() {
    this._requestCameraPermission();
    //just for testing
    // new MainPage().addNewStore("0xec8dd2dfe5ce4ca40d75487e5875ff78c61907e2");
    // this.props.navigation.navigate('Home');
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}/>}

        {this._handleSuccess()}

        <StatusBar hidden />
      </View>
    );
  }


  _handleSuccess = () => {
//haha
    if (!this.state.lastScannedUrl) {return;}
    console.log(this.state.lastScannedUrl);
    new MainPage().addNewStore(this.state.lastScannedUrl);
    this.props.navigation.navigate('Home');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  }
});
