import React from "react";
import {SafeAreaView, View, Text ,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../style';

function MyPage() {
  return (  <SafeAreaView  style={stylelist.container}>    
<View style={stylelist.titlecontainer}>
<Text style = {[stylelist.title,stylelist.Title_Bold,stylelist.black,stylelist.line]}>MyPage</Text>
</View>
<View>
  
</View>
</SafeAreaView> 
  )
};

export default MyPage;