import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Text , Content} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bgSrc from '../resources/wallpaper.png';
import Logo from '../components/SignupPage/Logo';
import ButtonSubmit from '../components/SignupPage/ButtonSubmit';
import Form from '../components/SignupPage/Form';
import {signup,sendVerifySMS} from '../utils/Login';


var phone
var password
var firstname
var lastname
var code

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  updatePhone (text) {phone = text;console.log(text)}
  updatePassword (text) {password = text;console.log(text)}
  updateFirstName (text) {firstname = text;console.log(text)}
  updateLastName (text) {lastname = text;console.log(text)}
  updateCode (text){code = text;console.log(text)}

  verify = async() => {
    await sendVerifySMS(this.props.screenProps.state.uri,1+phone);
    alert('Verification sent!')
  }

  signup = async() => {
    await signup(this.props.screenProps.state.uri,firstname+' '+lastname,phone,password,code);
  }

  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Text style={styles.text}>Signup</Text>
        <Form verify={this.verify} />
        <Content></Content>
        <ButtonSubmit signup={this.signup}/>
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