import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Text , Content} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bgSrc from '../resources/wallpaper.png';
import Logo from '../components/SignupPage/Logo';
import ButtonSubmit from '../components/SignupPage/ButtonSubmit';
import Form from '../components/SignupPage/Form';
import {signup} from '../utils/Login';


var username
var password

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {

  }

  updateUsername (text) {username = text;console.log(text)}
  updatePassword (text) {password = text;console.log(text)}


  signup() {
    signup(username,password);
  }

  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Text style={styles.text}>Signup</Text>
        <Form />
        <Content></Content>
        <ButtonSubmit navigation={this.props.navigation} signup={this.signup} screenProps={this.props.screenProps}/>
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