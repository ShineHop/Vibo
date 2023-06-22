import React from "react";
import {Button, View, Text } from "react-native";
//임의로 짬

function Login({navigation}) {
  return (
    <View>
      <Text>Login!</Text>
      <Button title="Join"
      onPress ={()=>navigation.navigate('Join')}/>
    </View>
  );
}

export default Login;