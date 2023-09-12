import React ,{useEffect,useState} from "react";
import {SafeAreaView, View, Text ,Image,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../../style';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import imagePath from '../../components/imagePath.json'


  
const Best=(userID)=>{
  const [data, setData] = useState([]);
  const [img,setimg] = useState([])
  const navigation = useNavigation();
 
  useEffect(() => {
    // 서버에서 데이터 가져오기

    function loadData(){
    axios.get('http://172.30.1.14:3001/api/data')
      .then((response) => {
        setData(response.data); //data = [ItemID,item,맛,맛 상세,재구매의사, 목넘김,기능]
      // console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  loadData()
  ,[]});


  //console.log('jsontext:',data)
  var jsontext =JSON.parse(JSON.stringify(data))
  var pathjson = JSON.parse(JSON.stringify(imagePath))

   //console.log("2: ", jsontext);
   //// console.log(pathjson[0])
    //console.log(jsontext[0].item)

  function makejson(){  
    var dataarray = []
      for (i = 0; i<= 806; i++){
        if(typeof(jsontext[i])!='undefined'){
            var string  = ' {"ItemID" :"'+ jsontext[i].ItemID + '","item": "'+jsontext[i].item +'","기능": "'+jsontext[i].기능+ '","insta": "'+jsontext[i].insta + '","youtube": "'+jsontext[i].youtube +'","src":"'+ pathjson[i].src+'"}'
            dataarray.push(string)
              }
        else{
          continue
        }}
        return dataarray;  
  
  }
  //console.log('length', dataarray.length)
  const dataarray = makejson()
if (dataarray){
  len =  dataarray.length -1;
 // console.log('len,',len)
  // console.log(typeof(dataarray[263]))
  //console.log((dataarray[264]))
  }
  //console.log('dataarray:',dataarray)
  function makedatajson(){
    var jsondata = []
    for (var i = 0; i<= len ;i++){
      try{
        //console.log(JSON.parse(dataarray[i]))
        jsondata.push(JSON.parse(dataarray[i]))
      }
      catch(err){
        jsondata.push(JSON.parse(JSON.stringify({"ItemID":264,"item":"솔가B-100베지터블캡슐","기능":"피로회복","insta":0,"youtube":0,"src":"https://shopping-phinf.pstatic.net/main_4036648/40366485371.11.jpg?type=f140"})))
      }
    }
  
    return jsondata;  
  }
  const datajson = makedatajson();

  // console.log('datajson: ',datajson)
  // bestrecoverjson = JSON.parse(JSON.stringify(bestrecover))
  // console.log(bestrecoverjson)

  const Recovery = datajson.filter((item)=>item.기능.includes('피로회복'));
  const bestrecover = Recovery.slice(0,5)
 // console.log('bestrecover',bestrecover)
  // const renderItems=(item)=>{ 
  //     sourceitem= item.item
  //    // console.log(sourceitem['src'])
  //    try{
  //    imgsrc = sourceitem['src'] 
  //    if(imgsrc  == 'noimage'){
  //     imgsrc = 'https://www.shutterstock.com/image-illustration/black-paw-print-pet-icon-260nw-705104992.jpg'
  //   }
     
  //   }
  //    catch(err){
  //     console.log('imageerr',err)
  //    }// console.log('imgsrc',imgsrc)
  // }
 // console.log('Recovery',typeof(Recovery))

  return(
      <View style={styles_home.container}>
        <View style={styles_home.title }> 
          <Text style = {[stylelist.black, stylelist.Semi_Bold] }> Best 5 </Text>
        </View>
        <FlatList
        data={bestrecover} // 필수 Props
        renderItem= {({ item })=>(
        <TouchableOpacity onPress={()=>navigation.navigate('DrawerNavigationRoutes',{screen:"DetailPage",params:{item}})}>
        <View style={styles_home.item_container} >
        <View >
        <Image source={item.src ? item.src : require('../images/paw.png') } style = {styles_home.image}/>
        </View> 
        <View style={styles_home.text}>
        <Text style={stylelist.Text_Regular}>{item.item}</Text>
        </View>
        </View>
        </TouchableOpacity>)}
        horizontal={true} // numColumns를 사용할 때 값을 false로 지정해줘야 한다.
        />
      </View>
    );}
      
const All=()=>{
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('http://172.30.1.14:3001/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Recovery = data.filter((item)=>item.기능.includes('피로회복'));
  const notbest = Recovery.slice(5,-1) //best 5이외의 상품들만
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
      </View>
      </TouchableOpacity>)} />
    </View>
    );};
  

function Recovery({navigation}) {
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
export default Recovery;