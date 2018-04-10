import React, { Component } from 'react';
import {View,Image,Dimensions,Keyboard} from 'react-native';
import {RkButton,RkText,RkTextInput,RkAvoidKeyboard,RkStyleSheet,RkTheme
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from './utils/scale';
import { Button } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('./resources/logo.png')}/>);
    else
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('./resources/logo.png')}/>);
    return image;
  }

  render() {
    let image = this._renderImage();

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <RkTextInput rkType='rounded' placeholder='Your Email Address'/>
          <RkTextInput rkType='rounded' placeholder='Your Password' secureTextEntry={true}/>
          <RkButton onPress={() => this.props.navigation.navigate('Home')} rkType='large' > Login </RkButton>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Please remember your password. We do not store your account information on our server, and if you lose your password your rewards will be gone for good!</RkText>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
}));
