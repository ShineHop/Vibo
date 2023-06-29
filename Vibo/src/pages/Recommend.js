import React from "react"
import {SafeAreaView, View, Text ,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../style';
//임의로 짬

const DATA = ['First','Second','Third','Four','Five'
];

const Item = ({num}) => {
return (
  <View style={styles_home.container}>
    <Text style={styles_home.item}>{num}</Text>
  </View>
);
};

const All=()=>{
  return(<View style={styles_home.container}>
  <FlatList
  data={DATA} // 필수 Props
  numColumns={2}
  renderItem= {({ item })=>(
    <Item num={item} />)}/>
  </View>
  );};


function Recommend(){
  return(
  <SafeAreaView >    
<View style={styles_home.titlecontainer}>
<Text style = {[styles_home.title,stylelist.Title_Bold,stylelist.black,styles_home.line]}>VIBO's Choice</Text>
</View>
<All />
  <StatusBar style='auto' />
</SafeAreaView> 
  )
};



const styles_home = StyleSheet.create({
titlecontainer:{
  marginTop:32,
  justifyContent:'center',
  alignItems:'center'
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
  justifyContent:'center',
  alignItems:'center',
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

export default Recommend;