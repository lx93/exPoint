import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , View , Fab } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StoreCard from './components/StoreCard';
import Expo from "expo";
import QRScanPage from './QRScanPage';


var contractList = ["0xe7b8db904c701604843ebea52b34d46758b53838","0xec8dd2dfe5ce4ca40d75487e5875ff78c61907e2"]
var storeList = [ {contractAddr: '0xe7b8db904c701604843ebea52b34d46758b53838', image: 'rise', title: 'Rise Rewards'}, {contractAddr: '0xec8dd2dfe5ce4ca40d75487e5875ff78c61907e2', image: 'chopt', title: 'Chopt Rewards'} ];
var currentPaneCount = 0;


export default class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {isReady: false, active: 'true', balances: [], titles: [], imgSRCs: [] };
  }

  _onAddPressed = () =>{this.props.navigation.navigate('AddPage');}

  _updateStoreState = async() => {
    let balances = this.state.balances.slice();
    let titles = this.state.titles.slice();
    let imgSRCs = this.state.imgSRCs.slice();

    //populate the state arrays
    for( var i in storeList ) {
      balances.push(await this._FetchBalance(storeList[i].contractAddr));
      titles.push(storeList[currentPaneCount].title);
      imgSRCs.push(storeList[currentPaneCount].image);
      this.setState({balances: balances, titles: titles, imgSRCs: imgSRCs});
      currentPaneCount++;
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    this.setState({ isReady: true });
    this._updateStoreState();
  }

  _FetchBalance = async(qs) =>{
    try {
      let response = await fetch('https://ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+qs+'&address=0x25d677b8907619fa359f89945106c150391ee23d&tag=latest&apikey=YourApiKkmkmeyToken');
      let responseJson = await response.json();
      return responseJson.result;
    } catch (error) {
      console.error(error);
    }
  }

  addNewStore = (qr) => {storeList.push({"contractAddr":qr});}

  createStoreCards(){
    var storeCards = [];

    for( var i = 0; i < this.state.balances.length; i++ )
    {
      storeCards.push( <StoreCard balance={this.state.balances[i]} title={this.state.titles[i]} image={this.state.imgSRCs[i]} /> );
    }

    return storeCards;
  }

  render() {
    if (!this.state.isReady) {return <Expo.AppLoading />;}

    return( 
      <Container>
        <Header><Body><Title>Point</Title></Body></Header>  
        {this.createStoreCards()}
        <View style={{ flex: 1 }}>
          <Fab
            active={!this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <MaterialCommunityIcons name="qrcode-scan" size={20} onPress={()=>this.props.navigation.navigate('AddPage')}/>
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }}>
              <FontAwesome name="search" size={20} onPress={()=>this.props.navigation.navigate('AddPage')}/>
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}