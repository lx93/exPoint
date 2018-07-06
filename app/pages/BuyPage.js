import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Content,CardItem,Card,Right,Left,Body,Text,View,Footer} from "native-base";
import {WebView,StyleSheet} from 'react-native';
import NumPad from '../components/NumPad';
import {createBalance} from '../utils/Balance';


export default class BuyPage extends Component {
  constructor(props) {
    super(props);
    amountArray = [];
    this.merchant = this.props.navigation.getParam('merchant');
    this.state = {amount:0,showPaymentPage:false};
  }

  updateAmount = (digit) => {
    amountArray.push(digit);
    this.setState({amount:amountArray.join('')});
  }
  deleteAmountDigit = () => {
    amountArray.pop();
    this.setState({amount:amountArray.join('')});   
  }
  clearAmountArray = () => {
    amountArray = [];
    this.setState({amount:0});
  }

  async proceedPaymentOnPress() {
    await this.setState({showPaymentPage:true});
  }

  // processPayment ()
  processPayment (stripeToken){
    stripeToken = stripeToken.replace(/['"]+/g, '');
    console.log('successfully received stripe token: ' + stripeToken);

    createBalance(this.props.screenProps.state.uri,this.props.screenProps.state.token,stripeToken,this.state.amount,this.merchant.merchantId)

    this.setState({amount:0,showPaymentPage:false});
  }



  render() {
    // this patch fixes "onMessage failing when there are JS warnings and errors on the page" from webview onMessage props
    const patchPostMessageFunction = function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) {originalPostMessage(message, targetOrigin, transfer);};

      patchedPostMessage.toString = function() {return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');};

      window.postMessage = patchedPostMessage;
    };

    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';


    // this renders the WebView that houses the Stripe element payment page -------------------
    if (this.state.showPaymentPage) {
      return (
        <View>
          <Header span>
            <Left>
              <Button transparent>
                <Icon name="ios-arrow-back" onPress={()=>this.setState({amount:0,showPaymentPage:false})}/>
              </Button>
            </Left>
            <Body>
              <Title>Payment</Title>
            </Body>
          </Header>

          <View style = {styles.content}>  
            <WebView
              injectedJavaScript={patchPostMessageJsCode}
              source={ require('./index.html') }
              onMessage={(message)=>this.processPayment(message.nativeEvent.data)}
            />
          </View>
        </View>
      )
    }

    // this page gets an amont input from user using NumPad --------------------------
    if (!this.state.showPaymentPage) {
      return (
        <Container>
          <Header span>
            <Left>
              <Button transparent>
                <Icon name="ios-arrow-back" onPress={()=>this.props.navigation.goBack()}/>
              </Button>
            </Left>
            <Body>
              <Title>Enter Amount</Title>
            </Body>
          </Header>

          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <Text style={{fontSize:30,textAlign:"center"}}>${this.state.amount}</Text>
          </View>

          <NumPad update={this.updateAmount} del={this.deleteAmountDigit} decimal={false} />

          <Footer>
            <Button success active={true} onPress={() => this.proceedPaymentOnPress()}>
              <Text>Proceed to payment</Text>
            </Button>
          </Footer>
        </Container>
      );
    }
  }
}


const styles = StyleSheet.create({
   content: {height: 800}
})