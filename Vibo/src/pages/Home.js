import React from "react";
import {SafeAreaView, View, Text ,Button,StatusBar} from "react-native";


//임의로 짬
function Home({navigation}) {
  return (
    <SafeAreaView>
    <View>
      <Text>Best 5</Text>
      <Button
        title="Detail 1"
        onPress={() => navigation.push('DetailPage',{id:1})}
      />
      <Text>ALL</Text>
      <Button
        title="Detail 2"
        onPress={() => navigation.push('DetailPage',{id:2})}
      />
      <Button
        title="Detail 3"
        onPress={() => navigation.push('DetailPage',{id:3})}
      />
      <StatusBar style='auto' />
    </View>
    </SafeAreaView>
  );
}
export default Home;