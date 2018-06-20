import React, { Component } from 'react';
import { Image, Container, Title, Header, Content, Card, CardItem, Thumbnail, Text , View , Fab , Tabs, Tab, ListItem, Left, Body} from 'native-base';
import { FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import App from '../../App'
import {getAllMerchants} from '../utils/Merchants';


export default class BuyTab extends Component {

  constructor (props){
    super(props);
    this.state = {allMerchants:[]}
  }

  componentDidMount() {
    this.setAllMerchantsState(this.props.screenProps.state.token);
  }

  setAllMerchantsState = async(token) => {
    var allMerchants = await getAllMerchants(token);
    this.setState({allMerchants:allMerchants});
  }

  renderItem = ({item}) => {
    return (
      <ListItem>
        <Left>
          <Thumbnail source={{uri:"https://s3.amazonaws.com/point-server/"+item.image}} />
          <Body>
            <Text>{item.name}</Text>
          </Body>
        </Left>
      </ListItem>
    )
  }

  render() {
    return(
      <FlatList data={this.state.allMerchants} renderItem={this.renderItem}/>
    )
  }
}



    // var buyList = this.state.allMerchants.map(merchant => {
    //   return (<BuyList key={merchant.merchantId} title={merchant.name} image={merchant.image}/>)
    // })
