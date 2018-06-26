import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,AsyncStorage} from 'react-native';
import { Button, Text , TouchableOpacity, View} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bgSrc from '../resources/wallpaper.png';
import Logo from '../components/LoginPage/Logo';
import Form from '../components/LoginPage/Form';
import ButtonSubmit from '../components/LoginPage/ButtonSubmit';
import SignupSection from '../components/LoginPage/SignupSection';
import {getFbToken,fbAuth} from '../utils/Login';
import {getUserInfo,getToken} from '../utils/Login';



var username
var password

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.fbLogin = this.fbLogin.bind(this);

  }

  async componentDidMount() {
    // we check to see if we have authToken stored in AsyncStorage from previous session
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (token != null){
        console.log("Found authToken from AsyncStorage! Log in automatically.");
        console.log("Fetching userInfo based on stored authToken and setting state...")
        let userInfo = await this.getUserInfo(token);
        this.props.screenProps.updateState(token,userInfo);
        this.props.navigation.navigate('HomePage');
      }
    } catch (error) {console.log('AsyncStorage authToken does not exist')}
  }

  updateUsername (text) {username = text;console.log(text)}
  updatePassword (text) {password = text;console.log(text)}

// this function sends over username and password to get an authtoken
  login = async() => {
    try {
      let token = await getToken(this.props.screenProps.state.uri,username,password);
      let userInfo = await this.getUserInfo(token);
      this.props.screenProps.updateState(token,userInfo,undefined);
    }
    catch (error) {
      console.log(error);
    }
  }

// this function sends over fbtoken to get an authtoken
  fbLogin = async() => {
    try {
      let fbtoken = await getFbToken();
      let token = await fbAuth(this.props.screenProps.state.uri,fbtoken);
      if (token == undefined) {
        // alert('Please enter your phone number to finish login with Facebook.')
        this.props.screenProps.updateState(undefined,undefined,fbtoken);
        this.props.navigation.navigate('PhonePage');
      }
      else{
        let userInfo = await this.getUserInfo(token);
        this.props.screenProps.updateState(token,userInfo);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

// this functions uses authtoken to fetch userinfo
  getUserInfo = async(token) => {
    try {
      let userInfo = await getUserInfo(this.props.screenProps.state.uri,token);
      return userInfo;
    } catch (error) {console.log(error);} 
  }

  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <Logo />
        <Text style={styles.text}>buy giftcards from your favorite local businesses today</Text>
        <Form />
        <SignupSection navigation={this.props.navigation}/>
        <ButtonSubmit navigation={this.props.navigation} login={this.login} fbLogin={this.fbLogin} screenProps={this.props.screenProps} />
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
