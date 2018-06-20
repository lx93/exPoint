import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Text , TouchableOpacity, View} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bgSrc from '../resources/wallpaper.png';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {fbLogin} from '../utils/Login';




var username
var password

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
  }

  async componentDidMount() {

    // we check to see if we have authToken stored in AsyncStorage from previous session
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (token != null){
        console.log("Found authToken from AsyncStorage! Log in automatically. " + token);
        console.log("Fetching merchantInfo based on stored authToken and setting state...")
        await this.props.screenProps.updateStateThruToken(token);
        this.props.navigation.navigate('HomePage');
      }
    } catch (error) {console.log('AsyncStorage authToken does not exist')}
  }

  updateUsername (text) {username = text;console.log(text)}
  updatePassword (text) {password = text;console.log(text)}

  getToken () {
    this.props.screenProps.updateState(username,password);
  }


  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Text style={styles.text}>buy giftcards from your favorite local businesses today</Text>
        <Form />
        <SignupSection navigation={this.props.navigation}/>
        <ButtonSubmit navigation={this.props.navigation} getToken={this.getToken} fbLogin={fbLogin} screenProps={this.props.screenProps} />
      </ImageBackground>
//lol
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    // resizeMode: 'cover',
  },
  text: {
    margin: 50,
    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  }
});
