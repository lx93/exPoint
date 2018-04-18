import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,CardItem,Card,Thumbnail,Text} from 'native-base';
import {Font} from "expo";


export default class StoreCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={this.props.image} />
                <Body>
                  <Text>{this.props.title}</Text>
                  <Text note>Balance: {this.props.balance}</Text> 
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={this.props.image} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
        </Content>      
    );
  }
}