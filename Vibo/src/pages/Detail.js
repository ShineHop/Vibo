import React,{useState,useEffect,useRef} from "react";
import { View, Text, StyleSheet,TouchableOpacity,Image,Modal,Pressable, PanResponder} from "react-native";
import stylelist from '../style';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons";
import Stars from '../pages/images/TransparentStarGroup.svg';
import StarRating from '../components/StarRating';

function Detail({route},props) {
  const navigation = useNavigation();
  const [likeState, setState] = useState(false);
  const [scores, setScore] = useState(0);
  const youtube=()=>{
    if   (route.params.item.youtube == 1){
      return <Text style={styles.text2}>youtube</Text>
    }
  }
  const instagram=()=>{
    if   (route.params.item.insta == 1){
      return <Text style={styles.text2}>instagram</Text>
    }
  }
  const itemid = route.params.item.ItemID;
  const ButtonClicked=(id)=>{
    if (likeState== true){
      setState(false);
      console.log(likeState)
    }
    else{
      setState(true);
      console.log(likeState)

    }
    axios.post('http://192.168.142.1:3001/api/user/2023052706/like/'+ id +'/update').then((response)=>
    { 
      console.log(response);
        if(response.ok){
          return response.json();     
      }})
 };
 useEffect(() => { 
  async function fetchScore(){
    await axios.get(`http://192.168.142.1:3001/api/user/2023052706/ratings/`+itemid).then((response)=>
    { 
      console.log(response.data);
      setScore(response.data);
     })}
  async function Likeornot(){
    await axios.get('http://192.168.142.1:3001/api/user/2023052706/like/'+itemid).then((response)=>{
    setState(response.data);
    console.log(response.data)}).catch((error)=>{console.error(error);});
    }
  Likeornot(),
  fetchScore()},[itemid]); // 로그인된 사용자 ID가 변경될 때마다 실행

  return(
    <SafeAreaView style={{flex:1, backgroundColor:'#ffffff'}}   >    
    <View style={styles.backcontainer}> 
        <TouchableOpacity onPress={()=>navigation.pop()} style={styles.button}>
          <Text style={[stylelist.Gray3,stylelist.Semi_Regular]}>목록으로</Text>
          </TouchableOpacity>
    </View>
    <View style={styles.container}> 
        <Text style={[stylelist.Title_Bold,stylelist.black,stylelist.line]} >DETAILS</Text>
        <View style={styles.imagecontainer}>
          <Image source={require('./images/paw.png')} style = {styles.image}></Image>
          <Text style={[stylelist.Semi_Bold,stylelist.black,styles.text1]} >평점</Text></View>
      <View style={styles.itemcontainer}>
        <Text style={[stylelist.Title_SemiBold,stylelist.black,styles.text ]}>{route.params.item.item}</Text>
            <TouchableOpacity onPress ={()=>ButtonClicked(route.params.item.ItemID)} >
              <Icon name={likeState === true ? "heart" : "heart-outline" } color = '#FCA6C5' size={35} style={styles.heart} ></Icon>
            </TouchableOpacity>
          </View>
        <View style={styles.itemcontainer1}>
          <Text style={styles.text2}>{route.params.item.기능.split("\n").join("  |  ")}</Text>
          {youtube}
          {instagram}
        </View>
        <View>
          <Text style={styles.text}>{route.params.item.원료}</Text> 
          <Text style={styles.text}>{route.params.item.섭취방법 }</Text>
          <Text style={styles.text}>{route.params.item.주의사항}</Text>
          <Text style={styles.text}> 상품에 대한 상세 정보 </Text>
        </View>
        <View style={styles.itemcontainer}>
          <Text style = {[stylelist.Semi_Bold,stylelist.black]}>평가하기</Text>
          <View style={styles.rootContainer}>
            <Text>{scores}</Text>
          {/* <StarRating/> */}
    </View>
    </View>
        
      </View>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
  title:{
    width:'100%',
    alignItems: 'left',
    marginLeft:20,
    marginBottom:25,
    
  },
  
  backcontainer: {
    marginTop:30,
    paddingHorizontal:20,
    alignItems: 'left',
    backgroundColor: '#ffffff',
  },
  container: {
   // paddingTop:10,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  

  rootContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
  }
,

  itemcontainer: {
    marginTop:20,
    paddingTop:20,
    backgroundColor: '#ffffff',
    justifyContent:'space-around',
    alignItems:'center',
    width:'90%',
    flexDirection:'row'
  },
  itemcontainer1: {
    paddingTop:15,
    backgroundColor: '#ffffff',
    justifyContent:'flex-start',
    width:'90%',
    flexDirection:'row'
  },

  
  imagecontainer: {
    marginTop:20,
    width:'90%',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor: '#ffffff',
  },
button:{
  backgroundColor:'white',
},
text1:{
  display:'flex',
  marginTop:40,},

text2:{
  display:'flex',
  padding:10,
  borderRadius:15,
  backgroundColor:'#99A799',
  color:'#ffffff'
},
text:{
    width:'90%',
    flexWrap:"nowrap",
  },
  image:{
    width:200,
    height:120,
    resizeMode:'contain',
   
  },
  
});
export default Detail;