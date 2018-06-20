import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body,Text} from "native-base";
import WalletTab from "../tabs/WalletTab";
import BuyTab from "../tabs/BuyTab";
import SendTab from "../tabs/SendTab";
import {AsyncStorage} from 'react-native';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  logout = async() => {
    // deletes the stored authToken from AsyncStorage
    try {
      await AsyncStorage.removeItem('authToken');
      console.log('Logged out! authToken is removed from AsyncStorage.');
    } catch (error) {console.log('error deleting authToken')}

    this.props.navigation.navigate('LoginPage')
  }

  render() {
    return (
      <Container>
        <Header span>
          <Left>
            <Button transparent>
              <Icon name="ios-arrow-back" onPress={()=>this.props.navigation.goBack()}/>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.screenProps.state.userInfo.phone}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.logout()}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading="Wallet">
            <WalletTab navigation={this.props.navigation} screenProps={this.props.screenProps}/>
          </Tab>
          <Tab heading="Buy">
            <BuyTab navigation={this.props.navigation} screenProps={this.props.screenProps}/>
          </Tab>
          <Tab heading="Send">
            <SendTab navigation={this.props.navigation} screenProps={this.props.screenProps}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


console.disableYelloBox = true;