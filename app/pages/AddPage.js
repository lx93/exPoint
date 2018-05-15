import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, Container, Title, Header, Content, Text, Right , View , List, ListItem } from 'native-base';
import {Font} from "expo";
import SearchBar from '../components/SearchBar';
import App from '../../App';


export default class AddPage extends Component {

	constructor (props){
		super(props);
	}


// this function handles when a store listitem is clicked on
	_onPressed = (clickedStore) => {
		for (var i in this.props.screenProps.allStores){
			if (clickedStore == this.props.screenProps.allStores[i].title){
				new App().addOwnedStore(this.props.screenProps.allStores[i]);
    			this.props.navigation.navigate('MainPage');
			}
		}
		console.log(clickedStore);
	}


	render(){
		return (
			<Container>
				<SearchBar placeholder="Search for a store" />
		        <Content>
					<List dataArray={this.props.screenProps.allStores} renderRow={(storeName) =>
		              <ListItem onPress={()=>{this._onPressed(storeName.title)}}>
		                <Text>{storeName.title}</Text>
		              </ListItem>
		            }>
		          </List>
		        </Content>
		    </Container>
		   	);
	}
}
