import React from 'react';
import {Button,View, StyleSheet, Text} from 'react-native';

function App({navigation}){
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Loading Page</Text>
      <Button title ="Login" 
      onPress ={()=> navigation.navigate('Login')}/>
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

export default App;