import React ,{Component,useState,useEffect} from "react";
import {SafeAreaView,TouchableOpacity, View, Text ,StatusBar,StyleSheet,FlatList,Image} from "react-native";
import stylelist from '../style';
import HeartButton from "../components/HeartButtonClicked";
import axios from 'axios'

const DATA = ['First','Second','Third','Four','Five','SIX'
];

//자신의 user_Id 에 해당하는 찜 아이템 목록 값들 불러오기


const Item = ({userID}) => {

  return (
    <View style={styles_home.item_container} >
      <View > 
      <Image source={require('./images/paw.png')} style = {styles_home.image}></Image>
      </View>
      <View > 
      <Text style={styles_home.item}> {title} </Text>
      </View>
     
      <View  > 
        <HeartButton style={styles_home.heart}  />
      </View>
    </View>
     
  );
  };
  
const All=({userID})=>{
  
  //const [columnIndices, setColumnIndices] = useState([]);
 // const [userId, setUserId] = useState('john'); // 로그인된 사용자 ID를 상태로 관리
  const [rowData, setRowData] = useState([]);

  useEffect(() => {  axios.get(`http://192.168.142.1:3001/api/user/${userID}/likes`)
  .then((response) => {
    setRowData(response.data.rows);
    console.log(res);
   // setColumnIndices(response.data.columnIndices);
    
  })
  .catch((error) => {
    console.error(error);
  });
}, [userID]); // 로그인된 사용자 ID가 변경될 때마다 실행


  return(
  <View >
  <FlatList data={rowData} // 필수 Props
   keyExtractor={(item,index) => index}
  renderItem= {({ item })=>(
     <View style={styles_home.item_container} >
    <View > 
    <Image source={require('./images/paw.png')} style = {styles_home.image}></Image>
    </View>
    <View >

    <Text style={styles_home.item}> {item} </Text>
    </View>
   
    <View  > 
      <HeartButton style={styles_home.heart}  />
    </View>
  </View>
   )}

  />
  </View>
  );};

const Like = ({userID})=>{
  useEffect(() => {
    axios.get(`http://192.168.142.1:3001/api/user/${userID}/likes`)
      .then((response) => {
        setRowData(response.data.rows);
       // setColumnIndices(response.data.columnIndices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userID]); // userId가 변경될 때마다 실행

  state = {ButtonClicked:true};
  onClick = () =>{ 
    this.setState({ButtonClicked:false});
  };
  
    return(  <SafeAreaView style={stylelist.container}>
      <View style={stylelist.titlecontainer}>
      <Text style = {[stylelist.title,stylelist.Title_Bold,stylelist.black,stylelist.line]}> LIKE </Text>
      </View>
      <View style={stylelist.container}>
      <All/>
      </View>
      </SafeAreaView>
    )
  };
const styles_home = StyleSheet.create({
  image:{
 
    width:50,
    resizeMode:'contain'
  }
  ,
item_container:{
  height:90,
  alignItems:'center',
  justifyContent:"space-between",
  width:'90%',
  marginLeft:'5%',
  flexDirection:'row',
  //backgroundColor: 'yellow',
},

heart:{
  marginRight:50,
 // backgroundColor:'pink',
},
item: {
  
//backgroundColor:'green',
borderWidth:1,
borderTopWidth:0,
borderColor:'#E8E8E8',
borderLeftWidth:0,
borderRightWidth:0,
fontSize: 24,


}
});
export default Like;