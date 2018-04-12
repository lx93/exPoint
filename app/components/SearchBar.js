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