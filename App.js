'use strict'

import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import MainPage from './app/MainPage';
import AddPage from './app/AddPage';
import LoginPage from './app/LoginPage';
import {StackNavigator,Constants} from 'react-navigation';

if (Platform.OS=="android") {
  StackNavigator.headerStyles.paddingTop = Constants.statusBarHeight
  StackNavigator.headerStyles.height     = Constants.statusBarHeight + 56
}

const App = StackNavigator (
	{
		LoginPage:{screen:LoginPage},
		Home:{screen:MainPage},
		AddPage:{screen:AddPage}
	},
	{ headerMode: 'none' },
);

export default App;


console.disableYellowBox = true;


