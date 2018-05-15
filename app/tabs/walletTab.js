import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , View , Fab , Tabs, Tab } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Expo from "expo";
import App from '../../App'
import {fetchBalance} from '../utils/balance'
import StoreCard from '../components/StoreCard';


export default class WalletTab extends Component {

  constructor(props) {
    super(props);
//this is a local state that manages what cards to show in wallet
    this.state = {active: 'true', balances: [], titles: [], imgSRCs: [] };
  }


  _updateStoreState = async() => {
    let balances = this.state.balances.slice();
    let titles = this.state.titles.slice();
    let imgSRCs = this.state.imgSRCs.slice();

    //populate the state arrays
    for( var i in this.props.screenProps.ownedStores ) {
      balances.push(await fetchBalance(this.props.screenProps.ownedStores[i].contractAddr));
      titles.push(this.props.screenProps.ownedStores[i].title);
      imgSRCs.push(this.props.screenProps.ownedStores[i].image);
      this.setState({balances: balances, titles: titles, imgSRCs: imgSRCs});
    }
  }

  async componentDidMount() {
    this._updateStoreState();
  }


  createStoreCards(){
    var storeCards = [];
    for( var i = 0; i < this.state.balances.length ; i++ )
    {
      storeCards.push( <StoreCard balance={this.state.balances[i]} title={this.state.titles[i]} image={this.state.imgSRCs[i]} /> );
    }
    return storeCards;
  }

  render() {
    return( 
      <Container>  
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
              <MaterialCommunityIcons name="qrcode-scan" size={20} onPress={()=>this.props.navigation.navigate('QRScanPage')}/>
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