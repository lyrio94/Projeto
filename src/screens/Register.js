import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, KeyboardAvoidingView, View, Image, Text, 
TextInput, Button, Alert } from 'react-native';
import { createUserOnFirebaseAsync } from '../services/FirebaseApi.js';


const img = require('../assets/TodoList.png');

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register' };
    
    state = {
        email: '',
        password: ''
    }  
  render(){
    return (
        <KeyboardAvoidingView style={styles.container}behavior='padding'>
        <View style={styles.topView}>
        <Image style={styles.img} source={img} ></Image>
        <Text style={styles.title}>Registering new user</Text> 
        </View>
        <View style={styles.bottomView}> 
        <TextInput style={styles.input}
        placeholder='Email'
        keyboardType={'email-address'} autoCapitalize='none'
        onChangeText={email => this.setState({ email })} ></TextInput>
        <TextInput style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={password => this.setState({ password })} ></TextInput>
        <Button title='Register User'
        onPress={() =>{this._createUserAsync()}}>
          </Button> 
        </View>
        </KeyboardAvoidingView> 
        );     
  }
  async _createUserAsync() { 
    try {
    const user = await createUserOnFirebaseAsync(this.state.email, this.state.password);
    Alert.alert('User Created!', `User ${this.state.email} has succesfuly been
    created!`,
    [{
      text: 'Ok', onPress: () => {
      this.props.navigation.goBack(); }
      }]);
    } catch (error) {
      Alert.alert('Create User Failed!', error.message); 
    } 
  } 
}

const styles = StyleSheet.create({ container: {
flex: 1,
flexDirection: 'column', justifyContent: 'center'
}, topView: {
flex: 0.20, flexDirection: 'row', alignItems: 'center', padding: 25
}, img: {
width: 50,
height: 50 },
title: { fontSize: 20,
fontWeight: 'bold',
marginLeft: 20 },
bottomView: { flex: 1,
flexDirection: 'column', paddingRight: 20, paddingLeft: 20
}, input: {
marginBottom: 20 }
});