import React, { Component } from 'react';
import { Image } from 'react-native';
import { Input, Item, Container, Title, Header, Content, Text, Right , View , List, ListItem } from 'native-base';
import {Font} from "expo";
import SearchBar from './components/SearchBar';
import MainPage from './MainPage';


var storeList = ['TOPO Chapel Hill','Chopt Creative Salad','Best Buy','Joe Van Gogh Coffee','Nordstorm','RISE'];

var RISE = {contractAddr: '0x5745d2465a2b425b01dcd74c33086746ff3b198c', image: 'rise', title: 'RISE'}		
var TOPO = {contractAddr: '0x599a08dc182fd57e7dd440b2b7bc451c5115f089', image: 'topo', title: 'TOPO Chapel Hill'}
var CHOPT = {contractAddr: '0x962e20c5035203f4940fed2f8fdca601c632c87a', image: 'chopt', title: 'Chopt Creative Salad'}
var BBY = ''
var JVG = ''
var NORD = ''

var storeListBackend = [RISE,TOPO,CHOPT];




export default class AddPage extends Component {

	constructor (props){
		super(props);
	} 

	_onPressed = (item) => {
		for (var i in storeListBackend){
			if (item == storeListBackend[i].title){
				new MainPage().addNewStore(storeListBackend[i]);
    			this.props.navigation.navigate('Home');
			}
		}
		console.log(item);
	}


	render(){
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
