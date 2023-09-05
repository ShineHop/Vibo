import React ,{useState,useEffect} from "react"
import {SafeAreaView, View, Image,Text ,TouchableOpacity,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../style';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";


const All=(userID)=>{
  const [recitems, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => { 
    axios.get('http://172.30.1.34:3001/api/user/2023052702/recommend').then((response)=>{
      console.log(response.data)
      setItems(response.data);}).catch((error)=>{console.error(error);});
}, [userID]); // 로그인된 사용자 ID가 변경될 때마다 실행

  return(
  <View >
  <FlatList  data={recitems} // 필수 Props
  numColumns={2}   renderItem= {
    
    ({ item })=>(
      <TouchableOpacity onPress={()=>navigation.navigate('DrawerNavigationRoutes',{screen:"DetailPage",params:{item}})}>
      <View style={styles_home.container}>
    <View >
    <Image source={require('./images/paw.png')} style = {styles_home.image}></Image>
    </View>
    <View style={styles_home.text}>
    <Text style={stylelist.Text_Regular}>{item.item}</Text>
    </View>
  </View></TouchableOpacity>)}/>
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