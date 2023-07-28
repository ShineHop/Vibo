import React from "react"
import {SafeAreaView, View, Image,Text ,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../style';
//임의로 짬

const DATA = ['First','Secsdfasdfageraffdafsssssssssssssssssssssssewwwwwwwwwwwwzsdfsond','Third','Four','Five','Six','Seven'
];

const Item = ({title}) => {
return (
  <View style={styles_home.container}>
    <View >
    <Image source={require('./images/paw.png')} style = {styles_home.image}></Image>
    </View>
    <View style={styles_home.text}>
    <Text style={stylelist.Text_Regular}>{title}</Text>
    </View>
  </View>
);
};

const All=()=>{
  return(
  <View >
  <FlatList  data={DATA} // 필수 Props
  numColumns={2}   renderItem= {({ item })=>(<Item title={item} />)}/>
  </View>
  );};


function Recommend(){
  return(
  <SafeAreaView  style={stylelist.container}>    
<View style={stylelist.titlecontainer}>
<Text style = {[stylelist.title,stylelist.Title_Bold,stylelist.black,stylelist.line]}>VIBO's Choice</Text>
</View>
<View style={stylelist.container}>
      <All/>
</View>
</SafeAreaView> 
  )
};



const styles_home = StyleSheet.create({
text:{
  
  display:'flex',
  width:'80%',
  height:'20%',
  flexWrap:"nowrap",
  marginTop:15,
  marginLeft:30,
  marginRight:20,
  marginBottom:10,
},
container:{
    alignItems: 'center',
    alignContent:'center',
    width:150,
    margin:5,
    height:160,
    //backgroundColor: 'yellow',
  
    justifyContent:'space-around'
  },  
  image:{
    width:100,
    height:100,
    padding:40,
    backgroundColor:'#f6f6f6',
    resizeMode:'contain',
   
  },
});

export default Recommend;