import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, Container, Title, Header, Content, Text, Right , View , List, ListItem } from 'native-base';
import {Font} from "expo";
import SearchBar from './components/SearchBar';


export default class AddPage extends Component {
	constructor (props){
		super(props);
	} 

	_onPressed = () => {
		console.log(this.item);
	}

	render(){
		const {params} = this.props.navigation.state;

		var items = ['TOPO Chapel Hill','Chopt','Best Buy','Joe Van Gogh Coffee','Nordstorm'];

		return (
			<Container>
				<SearchBar placeholder="Search for a reward program" />
		        <Content>
					<List dataArray={items} renderRow={(item) =>
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
