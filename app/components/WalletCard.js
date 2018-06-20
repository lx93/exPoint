import React, {Component} from 'react';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,CardItem,Card,Thumbnail,Text} from 'native-base';
import {Image} from 'react-native';

export default class WalletCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
        <Content>
          <Card>
            <CardItem button onPress={this.props.onPress}>
              <Left>
                <Thumbnail source={{uri:"https://s3.amazonaws.com/point-server/"+this.props.image}} />
                <Body>
                  <Text>{this.props.title}</Text>
                  <Text note>Balance: {this.props.balance}</Text> 
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
    );
  }
}