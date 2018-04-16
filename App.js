'use strict'

import React, { Component } from 'react';
import { Platform, View , Text} from 'react-native';
import MainPage from './app/MainPage';
import AddPage from './app/AddPage';
import LoginPage from './app/LoginPage';
import QRScanPage from './app/QRScanPage';
import {StackNavigator} from 'react-navigation';




const App = StackNavigator (
	{
		Home:{screen:MainPage},
		AddPage:{screen:AddPage},
		QRScanPage:{screen:QRScanPage},
		LoginPage:{screen:LoginPage},
	},
	{ headerMode: 'none' },
);


export default App;


console.disableYellowBox = true;


