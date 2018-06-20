import React, {Component} from 'react';
import {Container,Header,Title,Content,Button,Icon,Body,Left,Right,ListItem,FlatList,Thumbnail,Text} from 'native-base';
import {Image} from 'react-native';

export default class BuyList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (   
      <Content>   
        <FlatList>
            <ListItem>
              <Left>
                <Thumbnail source={{uri:"https://s3.amazonaws.com/point-server/"+this.props.image}} />
                <Body>
                  <Text>{this.props.title}</Text>
                </Body>
              </Left>
            </ListItem>
        </FlatList>
      </Content>    
    );
  }
}