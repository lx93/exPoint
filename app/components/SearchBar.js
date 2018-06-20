import React, {Component} from 'react';
import {Header,Input,Button,Icon,Body,Left,Right,Thumbnail,Text,Item} from 'native-base';
import {Font} from "expo";


export default class SearchBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
          <Header searchBar rounded>
              <Button transparent onPress={()=> this.props.navigation.navigate('HomePage')}>
                <Text>Back</Text>
              </Button>              
              <Item>
                <Icon name="ios-search" />
                <Input placeholder={this.props.placeholder} />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
          </Header>
    );
  }
}