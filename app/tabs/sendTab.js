import React, { Component } from 'react';
import { Image, Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right , View , Fab , Tabs, Tab , Center} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import App from '../../App'
import WalletCard from '../components/WalletCard';
import {getOwnedBalanceIDs} from '../utils/Balance';
import QRCode from 'react-native-qrcode-svg';


export default class SendTab extends Component {

  constructor(props) {
    super(props);
    //this is a local state that manages what cards to show in wallet
    this.state = {active: 'true', ownedBalanceIDs:null};
  }

  componentDidMount() {
    this.setBalanceState(this.props.screenProps.state.token);
  }

  setBalanceState = async(token) => {
    var ownedBalanceIDs = await getOwnedBalanceIDs(token);
    this.setState ({ownedBalanceIDs:ownedBalanceIDs});
  }

  walletCardOnPress (balance) {
    this.props.navigation.navigate("RedeemPage", {balance:balance});
  }


  render() {

    if (this.state.ownedBalanceIDs){
      var walletCards = this.state.ownedBalanceIDs.map(balance => {
        return (<WalletCard key={balance.balanceId} balance={balance.balance} title={balance.name} image={balance.image} onPress={()=>this.walletCardOnPress(balance)} />)
      })
    }
    else {var walletCards = <WalletCard title="Please buy a giftcard first before sending it" balance='0' /> }

    return(
      <Container>
        {walletCards}
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