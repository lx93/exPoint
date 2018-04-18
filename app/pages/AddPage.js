import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, Container, Title, Header, Content, Text, Right , View , List, ListItem } from 'native-base';
import {Font} from "expo";
import SearchBar from '../components/SearchBar';
import WalletTab from '../tabs/walletTab';


var storeList = [];


export default class AddPage extends Component {

	constructor (props){
		super(props);
	}

// create a storeList for list to render in dataArray
	componentWillMount() {
		storeList = [];

		for (var i in this.props.screenProps.allStores){
			storeList.push(this.props.screenProps.allStores[i].title);
		}
	}

// this function handles when a store listitem is clicked on
	_onPressed = (clickedStore) => {
		for (var i in this.props.screenProps.allStores){
			if (clickedStore == this.props.screenProps.allStores[i].title){
				new WalletTab().addNewStore(this.props.screenProps.allStores[i]);
    			this.props.navigation.navigate('Home');
			}
		}
		console.log(clickedStore);
	}


	render(){
		console.log(storeList);

		return (
			<Container>
				<SearchBar placeholder="Search for a store" />
		        <Content>
					<List dataArray={storeList} renderRow={(storeName) =>
		              <ListItem onPress={()=>{this._onPressed(storeName)}}>
		                <Text>{storeName}</Text>
		              </ListItem>
		            }>
		          </List>
		        </Content>
		    </Container>
		   	);
	}
}
