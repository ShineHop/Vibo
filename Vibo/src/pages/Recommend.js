import React ,{useState,useEffect} from "react"
import {SafeAreaView, View, Image,Text ,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../style';
import axios from 'axios'


const All=(userID)=>{
  const [recitems, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { 
    axios.get('http://192.168.142.1:3001/api/user/${userID}/recommend').then((response)=>{
      setItems(response.data);}).catch((error)=>{console.error(error);});
}, [userID]); // 로그인된 사용자 ID가 변경될 때마다 실행

  return(
  <View >
  <FlatList  data={recitems} // 필수 Props
  numColumns={2}   renderItem= {({ item })=>(<View style={styles_home.container}>
    <View >
    <Image source={require('./images/paw.png')} style = {styles_home.image}></Image>
    </View>
    <View style={styles_home.text}>
    <Text style={stylelist.Text_Regular}>{item}</Text>
    </View>
  </View>)}/>
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
  height:'25%',
  flexWrap:"nowrap",
  marginTop:15,
  marginLeft:30,
  marginRight:20,
  marginBottom:20,
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
    width:120,
    height:110,
    padding:40,
    backgroundColor:'#f6f6f6',
    resizeMode:'contain',
   
  },
});

export default Recommend;