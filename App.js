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
import {StackNavigator} from 'react-navigation';
import {getUserInfo,getToken} from './app/utils/Login';



const RootStack = StackNavigator (
	{
		LoginPage:{screen:LoginPage},
		SignupPage:{screen:SignupPage},
		HomePage:{screen:HomePage},
		AddPage:{screen:AddPage},
		QRScanPage:{screen:QRScanPage},
		RedeemPage:{screen:RedeemPage}
	},
	{ headerMode: 'none' },
);



export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {token: undefined, userInfo:{phone:'not available'}}
	}

	// fix for android. load Robot_medium fonts to avoid font loading error
	  async componentDidMount() {
	    await Expo.Font.loadAsync({
	      Roboto: require("native-base/Fonts/Roboto.ttf"),
	      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
	    });
	    this.setState({ isReady: true });
	  }

	updateState = async(u,p) => {
		try {
			let token = await getToken(u,p);
			await this.setState({token:token});
			let userInfo = await getUserInfo(token);
			await this.setState({userInfo});

			// save the authToken we fetched to AsyncStorage
			if (this.state.token != undefined){
				try {
					await AsyncStorage.setItem('authToken', this.state.token);
					console.log('authToken is now stored to AsyncStorage');
				} catch (error) {console.log('error saving authToken')}	
			}
		}
		catch (error) {console.log(error);}
	}

	updateStateThruToken = async(token) => {
		try {
			let userInfo = await getUserInfo(token);
			await this.setState({token:token})
			await this.setState({userInfo});
		}	catch (error) {console.log(error);}	
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


