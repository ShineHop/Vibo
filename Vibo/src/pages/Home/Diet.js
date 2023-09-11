import React ,{useEffect,useState} from "react";
import {SafeAreaView, View, Text ,Image,TouchableOpacity,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../../style';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";




const Item = (item) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('http://192.168.142.1:3001/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
const dietdata = data.filter((item)=>item.기능.includes('다이어트'));
  return (
    <View style={styles_home.item_container}>
      <View >
      <Image source={require('../images/paw.png')} style = {styles_home.image}></Image>
      </View>
      <View style={styles_home.text}>
      <Text style={stylelist.Text_Regular} key={item.ItemID}>{item.item}</Text>
      </View>
    </View>
  );
  };
  
const Best=()=>{
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  
  
  async function drawImage() {
    let imgobj = document.createElement("img");
    // promise 선언
    let imgPromise = new Promise( (resolve , reject) => {
        resolve();
    });
    
    // resolve가 호출 될때 에는 , then() 메서드가 실행 
    // , reject 일시에는 catch() 
    imgPromise.then(() => {
        imgobj.onload = () => {
        let cur_img_width = this.naturalWidth;  
            let cur_img_height = this.naturalHeight;
        
        };
    });
   
   
   console.log("Image Load Start");
    console.log(new Date().getTime());

    imgobj.src = "${pageContext.request.contextPath}/imageAction.do?process=testImageDownload";
    
    // await 키워드로 기다림 
    await imgPromise ; 

    console.log(new Date().getTime());
    console.log("Image Load End ");
   
}

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('http://192.168.142.1:3001/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const dietdata = data.filter((item)=>item.기능.includes('다이어트'));
  const bestdiet = dietdata.slice(0,5);

    return(
      <View style={styles_home.container}>
        <View style={styles_home.title }> 
          <Text style = {[stylelist.black, stylelist.Semi_Bold] }> Best 5 </Text>
        </View>
        <FlatList
        data={bestdiet} // 필수 Props
        renderItem= {({ item })=>(
          <TouchableOpacity onPress={()=>navigation.navigate('DrawerNavigationRoutes',{screen:"DetailPage",params:{item}})}>

        <View style={styles_home.item_container}>
          <View >
          <Image source={'../../../../'} style = {styles_home.image}></Image>
          </View>
          <View style={styles_home.text}>
          <Text style={stylelist.Text_Regular} key={item.ItemID}>{item.item}</Text>
          </View>
        </View></TouchableOpacity>)} horizontal={true} // numColumns를 사용할 때 값을 false로 지정해줘야 한다.
        />
      </View>
    );
  };
const All=()=>{
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('http://192.168.142.1:3001/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const dietdata = data.filter((item)=>item.기능.includes('다이어트'));
  const notbest = dietdata.slice(5,-1) //best 5이외의 상품들만 
    return(
      <View style={styles_home.container}>
      <View style={styles_home.title }> 
        <Text style = {[stylelist.black, stylelist.Semi_Bold] }> ALL </Text>
      </View>
    <FlatList data={notbest} // 필수 Props  
      numColumns={2}
      keyExtractor={(item) => item.ItemID}
      renderItem= {({ item })=>(
        <TouchableOpacity onPress={()=>navigation.navigate('DrawerNavigationRoutes',{screen:"DetailPage",params:{item}})}>
        
        <View style={styles_home.item_container}>
        <View >
        <Image source={require('../images/paw.png')} style = {styles_home.image}></Image>
        </View>
        <View style={styles_home.text}>
        <Text style={stylelist.Text_Regular} key={item.ItemID}>{item.item}</Text>
        </View>
      </View></TouchableOpacity>)} />
    </View>
    );};
  

function Diet({navigation}) {
  return (      
    <SafeAreaView style={{flex:1}}   >    
    <Best/><All/> 
    <StatusBar style='auto' />
    </SafeAreaView> 
    
  )
  };
const styles_home = StyleSheet.create({
  title:{
    width:'100%',
    alignItems: 'left',
    marginLeft:20,
    marginBottom:25,
    
  },
  container: {
    paddingTop:20,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  item_container:{
    alignItems: 'center',
    //alignContent:'center',
    width:150,
    margin:5,
    height:185,
    backgroundColor:'#f6f6f6',
    paddingTop:10,
  },  
  text:{
    display:'flex',
    width:'80%',
    height:'20%',
    flexWrap:"nowrap",
    marginTop:10,
    marginLeft:30,
    marginRight:20,
  },
  image:{
    width:120,
    height:120,
    resizeMode:'contain',
   
  },
  
});
export default Diet;