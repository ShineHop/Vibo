import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, Button,View, StyleSheet, Image} from 'react-native';




function App({navigation}){

  return (
    <View style={styles.container}>
      <Text>VIBO</Text>
      <Image
      style={{width: 300, height: 500}}
      source={require('./images/vibo.png')} />
      <Button title="OK"
      onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
  },
});

export default App