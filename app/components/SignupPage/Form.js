import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,KeyboardAvoidingView,View,ActivityIndicator,TouchableOpacity,Image,TextInput,Text} from 'react-native';

import SignupPage from '../../pages/SignupPage';


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={(text) => new SignupPage().updateFirstName(text)}
            style={styles.input}
            placeholder={'first name'}
            autoCapitalize={'words'}
            returnKeyType={'done'}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={(text) => new SignupPage().updateLastName(text)}
            style={styles.input}
            placeholder={'last name'}
            autoCapitalize={'words'}
            returnKeyType={'done'}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>


        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={(text) => new SignupPage().updatePhone(text)}
            style={styles.input}
            keyboardType='numeric'
            maxLength={10}
            placeholder="phone number"
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='done'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={(text) => new SignupPage().updatePassword(text)}
            style={styles.input}
            placeholder="password"
            secureTextEntry={this.state.showPass}
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='done'
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={(text) => new SignupPage().updateCode(text)}
            style={styles.input}
            keyboardType='numeric'
            maxLength={6}
            placeholder={'verification code'}
            returnKeyType={'done'}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity
          style={styles.sendVerify}
          onPress={()=>this.props.verify()}>
          <Text>send verification</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sendVerify: {
    position: 'absolute',
    top: 70,
    right: 28,
  }
});
