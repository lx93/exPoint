import React, { Component } from "react";
import {Container,Header,Title,Button,Icon,Tabs,Tab,Right,Left,Body} from "native-base";
import WalletTab from "../tabs/walletTab";


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false};
  }

// fix for android. load Robot_medium fonts to avoid font loading error
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {return <Expo.AppLoading />;}

    return (
      <Container>
        <Header><Body><Title>Point</Title></Body></Header>
        <Tabs>
          <Tab heading="Wallet">
            <WalletTab navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Buy">
            <WalletTab />
          </Tab>
          <Tab heading="Send">
            <WalletTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


console.disableYelloBox = true;