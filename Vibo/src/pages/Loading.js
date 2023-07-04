import React, {useEffect} from 'react';
import {ActivityIndicator, Text, Button,View, StyleSheet, Image} from 'react-native';


import SplashScreen from 'react-native-splash-screen';

function App({navigation}){
    useEffect(() => {
        try {
          setTimeout(() => {
            SplashScreen.hide();
          }, 200); //스플래시 활성화 시간 2초
        } catch (e) {
          console.log(e.message);
        }
      });

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