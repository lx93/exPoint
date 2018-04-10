import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, SearchBar, Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , View , Fab , List, ListItem } from 'native-base';
import {Font} from "expo";


export default class AddPage extends Component {
	constructor (props){
		super(props);
	} 

	_onPressed = () => {null
		console.log(this.item);
	}

	render(){
		const {params} = this.props.navigation.state;

		var items = ['TOPO Chapel Hill','Chopt','Best Buy','Joe Van Gogh Coffee','Nordstorm'];

		return (

		      <Container>
		      	<Header searchBar rounded>
          			<Item>
            			<Icon name="ios-search" />
            			<Input placeholder="Search for a reward program" />
          			</Item>
          			<Button transparent>
            			<Text>Search</Text>
          			</Button>
        		</Header>

		        <Content>
		          <List dataArray={items}
		            renderRow={(item) =>
		              <ListItem onPress={this._onPressed}>
		                <Text>{item}</Text>
		              </ListItem>
		            }>
		          </List>
		        </Content>

		      </Container>
		    );
	}
}
