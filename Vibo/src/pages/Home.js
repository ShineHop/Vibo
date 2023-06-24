import React from "react";
import { View, Text ,Button,StatusBar} from "react-native";


//임의로 짬
function Home({navigation}) {
  return (
    <View>
      <Button
        title="Detail 1"
        onPress={() => navigation.push('DetailPage',{id:1})}
      />
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
  );
}
export default Home;