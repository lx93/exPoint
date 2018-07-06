import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Content,CardItem,Card,Right,Left,Body,Text} from "native-base";
import QRCode from 'react-native-qrcode-svg';


export default class RedeemPage extends Component {
  constructor(props) {
    super(props);
    this.balance = this.props.navigation.getParam('balance');
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
            <Title>{this.balance.name}</Title>
          </Body>
        </Header>

        <Content>
            <Card>
              <CardItem style={{alignItems:'center',justifyContent:'center'}}>
                <QRCode size='200' value={this.balance.balanceId} />
              </CardItem>
              <CardItem style={{alignItems:'center',justifyContent:'center'}}>
                <Text>Account Balance: {this.balance.balance}</Text>
              </CardItem>
            </Card>
          </Content>

      </Container>
    );
  }
}


