import React, { Component } from "react";
import { StyleSheet, Alert } from 'react-native'
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,Item,Input,Form,View,Text,Footer} from "native-base";
import NumPad from '../components/NumPad';
import {sendVerifySMS,fbAuth} from '../utils/Login';
import {getUserInfo} from '../utils/Login';



export default class PhonePage extends Component {


  constructor(props) {
    super(props);
    amountArray = [];
    phoneArray = [];
    this.state = {amount: 0, showVerify: false, phoneNumber: null};
  }



  updateAmount = (digit) => {
    amountArray.push(digit);
    this.setState({amount:amountArray.join('')});
  }
  updatePhoneNumber = (digit) => {
    phoneArray.push(digit);
    this.setState({phoneNumber:phoneArray.join('')});
  }
  deletePhoneDigit = () => {
    phoneArray.pop();
    this.setState({phoneNumber:phoneArray.join('')});   
  }
  deleteAmountDigit = () => {
    amountArray.pop();
    this.setState({amount:amountArray.join('')});   
  }
  clearPhoneArray = () => {
    phoneArray = [];
    this.setState({phoneNumber:null});
  }
  clearAmountArray = () => {
    amountArray = [];
    this.setState({amount:0});
  }


  formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber == null) return phoneNumber;
    else if (phoneNumber.length <= 2) return phoneNumber;
    else if (phoneNumber.length > 2 && phoneNumber.length <= 5) return (phoneNumber.slice(0,3)+'-'+phoneNumber.slice(3));
    else if (phoneNumber.length > 5 && phoneNumber.length <= 10) return (phoneNumber.slice(0,3)+'-'+phoneNumber.slice(3,6)+'-'+phoneNumber.slice(6));
    else {
      alert('Invalid US number! Try again.');
      this.setState({phoneNumber:null});
      phoneArray = [];
      return phoneNumber;
    }
  }

  sendVerifySMS = async() => {
    //this updates the balance on our server
    let showVerify = await sendVerifySMS(this.props.screenProps.state.uri,1+this.state.phoneNumber);
    await this.setState({showVerify:showVerify});
  }

  cancelButton() {
    // this clears everything
    this.clearAmountArray();
    this.clearPhoneArray();
    this.props.navigation.navigate('LoginPage');
  }

  fbAuth = async() => {
  	let token = await fbAuth(this.props.screenProps.state.uri, this.props.screenProps.state.fbtoken, 1+this.state.phoneNumber, this.state.amount);
  	if (token != undefined){
  		let userInfo = await getUserInfo(this.props.screenProps.state.uri, token);
  		this.props.screenProps.updateState(token,userInfo);
  		this.props.navigation.navigate('HomePage');
  	}
  }

  render() {

    // renders the phone number entry page
    if (!this.state.showVerify) {
      return (
      <Container>
        <Header><Title>Please enter your phone number to finish signup</Title></Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize:30,textAlign:"center"}}>☎(+1) {this.formatPhoneNumber(this.state.phoneNumber)}</Text>
        </View>
        
        <NumPad update={this.updatePhoneNumber} del={this.deletePhoneDigit} />

        <Footer>
            <Button success active={true} onPress={() => {this.sendVerifySMS()}}>
              <Text>Send verification code</Text>
            </Button>
             <Button danger active={true} onPress={() => this.cancelButton()}>
                <Text>Cancel</Text>
              </Button>
        </Footer>
      </Container>

    );
    }


    // renders the verification entry page
    return (
      <Container>
        <Header><Title>Enter the verification code you received</Title></Header>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize:30,textAlign:"center"}}>{this.state.amount}</Text>
        </View>
        
        <NumPad update={this.updateAmount} del={this.deleteAmountDigit} />

        <Footer>
            <Button success active={true} onPress={() => this.fbAuth()}>
              <Text>Singup</Text>
            </Button>
        </Footer>
      </Container>
    );

  }
}



