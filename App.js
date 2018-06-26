'use strict'

import React, { Component } from 'react';
import {AsyncStorage,View,StatusBar} from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import variables from './native-base-theme/variables/variables';
import getTheme from './native-base-theme/components';
import HomePage from './app/pages/HomePage';
import AddPage from './app/pages/AddPage';
import LoginPage from './app/pages/LoginPage';
import SignupPage from './app/pages/SignupPage';
import QRScanPage from './app/pages/QRScanPage';
import RedeemPage from './app/pages/RedeemPage';
import PhonePage from './app/pages/PhonePage';
import {StackNavigator} from 'react-navigation';


const RootStack = StackNavigator (
	{
		LoginPage:{screen:LoginPage},
		SignupPage:{screen:SignupPage},
		HomePage:{screen:HomePage},
		AddPage:{screen:AddPage},
		QRScanPage:{screen:QRScanPage},
		RedeemPage:{screen:RedeemPage},
		PhonePage:{screen:PhonePage}

	},
	{ headerMode: 'none' },
);


var test = 'https://point-backend-test.herokuapp.com/';
var production = 'https://api.pointup.io/';


export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {token: undefined, userInfo:undefined, uri: test}
	}

	// fix for android. load Robot_medium fonts to avoid font loading error
	  async componentDidMount() {
	    await Expo.Font.loadAsync({
	      Roboto: require("native-base/Fonts/Roboto.ttf"),
	      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
	    });
	    this.setState({ isReady: true });
	  }

	updateState = async(token,userInfo,fbtoken) => {
		this.setState({token:token});
		this.setState({userInfo});
		this.setState({fbtoken});


		// saves the fetched token to AsyncStorage for future automatic login
		if (this.state.token != undefined){
			try {
				await AsyncStorage.setItem('authToken', this.state.token);
				console.log('authToken is now stored to AsyncStorage');
			} catch (error) {
				console.log('error saving authToken');
			}
		}
	}


	render() {
		// fix for android. load Robot_medium fonts to avoid font loading error
		if (!this.state.isReady) {return <Expo.AppLoading />;}

		this.allProps = {state: this.state, updateState: this.updateState, updateStateThruToken: this.updateStateThruToken};
		console.log("App.js reporting its current state: " + JSON.stringify(this.state));

		return (
			<StyleProvider style={getTheme(variables)}>
				<View style={{ flex: 1, marginTop: StatusBar.currentHeight}}>
					<RootStack screenProps= {this.allProps} />
				</View>
			</StyleProvider>
		)
	}
}


console.disableYellowBox = true;


