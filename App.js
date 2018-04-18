'use strict'

import React, { Component } from 'react';
import { Platform, View , Text} from 'react-native';
import MainPage from './app/pages/MainPage';
import AddPage from './app/pages/AddPage';
import LoginPage from './app/pages/LoginPage';
import QRScanPage from './app/pages/QRScanPage';
import {StackNavigator} from 'react-navigation';


const RootStack = StackNavigator (
	{
		Home:{screen:MainPage},
		AddPage:{screen:AddPage},
		QRScanPage:{screen:QRScanPage},
		LoginPage:{screen:LoginPage},
	},
	{ headerMode: 'none' },
);

var RISE = {contractAddr: '0x5745d2465a2b425b01dcd74c33086746ff3b198c', image: require('./app/resources/rise.jpg'), title: 'RISE'}		
var TOPO = {contractAddr: '0x599a08dc182fd57e7dd440b2b7bc451c5115f089', image: require('./app/resources/topo.png'), title: 'TOPO Chapel Hill'}
var CHOPT = {contractAddr: '0x962e20c5035203f4940fed2f8fdca601c632c87a', image: require('./app/resources/chopt.jpg'), title: 'Chopt Creative Salad'}
var BBY = {contractAddr: '0x962e20c5035203f4940fed2f8fdca601c632c87a', image: require('./app/resources/chopt.jpg'), title: 'Best Buy'}
var JVG = {contractAddr: '0x962e20c5035203f4940fed2f8fdca601c632c87a', image: require('./app/resources/rise.jpg'), title: 'Joe Van Gogh Coffee'}
var NORD = {contractAddr: '0x962e20c5035203f4940fed2f8fdca601c632c87a', image: require('./app/resources/rise.jpg'), title: 'Nordstorm'}

export default class App extends Component{

	constructor(props) {
		super(props);
		this.state = {
			allStores: [RISE,TOPO,CHOPT,BBY,JVG,NORD], 
			ownedStores: [RISE],

		};
	}


	render() {
		return (
				<RootStack screenProps= {this.state} />
			)
	}
}


console.disableYellowBox = true;


