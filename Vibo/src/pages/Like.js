import React from "react";
import { View, Text ,StyleSheet} from "react-native";
import stylelist from '../style';

//임의로 짬

function Like() {
  return (
    <View style={styles_home.titlecontainer}>
      <Text style={[stylelist.Title_Bold,stylelist.black,styles_home.line]}>LIKE</Text>
    </View>
  );
}

const styles_home = StyleSheet.create({
  titlecontainer:{
    marginTop:32,
    justifyContent:'center',
    alignItems:'center',

  },
  line:{
    borderColor: '#D3E0F7',
    textAlign:'center',
    justifyContent:'center',
    width:'60%',
    borderWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  container: {
  borderBottomWidth: 1,
  height: 100,
  },
  text: {
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 50,
  },  
  item: {
  marginTop:24,
  padding:30,
  backgroundColor:'pink',
  fontSize: 24,
  marginHorizontal:10,
  marginTop:24,
  }
  });

export default Like;