import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,CardItem,Card,Thumbnail,Text} from 'native-base';
import {Font} from "expo";

const images = {
    rise: require('../resources/rise.jpg'),
    chopt: require('../resources/chopt.jpg'),
};

export default class StoreCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const imageName = this.props.image;
    return (      
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={images[imageName]} />
                <Body>
                  <Text>{this.props.title}</Text>
                  <Text note>Balance: {this.props.balance}</Text> 
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={images[imageName]} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
        </Content>      
    );
  }
}