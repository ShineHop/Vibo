import React from "react";
import { View, Text} from "react-native";
//임의로 짬

function Detail({route}) {
  return (
    <View>
      <Text> id: {route.params.id}</Text>
    </View>
  );
}
export default Detail;