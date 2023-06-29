import React ,{useEffect} from "react";
import {SafeAreaView, View, Text ,Button,StatusBar,StyleSheet,FlatList} from "react-native";
import stylelist from '../../style';

const DATA = ['First','Second','Third','Four','Five'
];

const Item = ({num}) => {
return (
  <View style={styles_home.container}>
    <Text style={styles_home.item}>{num}</Text>
  </View>
);
};

const Best=()=>{
    return(
    <View style={styles_home.title }> 
    <Text style = {[stylelist.black, stylelist.Semi_Bold] }> Best 5 </Text>
    <FlatList
    data={DATA} // 필수 Props
    renderItem= {({ item })=>(
     <Text style={styles_home.item}><Item num={item} /></Text> )}
          // 필수 Props
// Multiple Columns
    horizontal={true} // numColumns를 사용할 때 값을 false로 지정해줘야 한다.
  />
    </View>
    
    );
  };
const All=()=>{
    return(<View>
      <View style={styles_home.title }> 
      <Text style = {[stylelist.black, stylelist.Semi_Bold] }> ALL </Text>
      </View>
      <View style={styles_home.container}>
    <FlatList 
    data={DATA} // 필수 Props
    numColumns={2}
    renderItem= {({ item })=>(
      <Item num={item} />)}/>
      </View>
    </View>
    );};
  

function Recovery({navigation}) {
  return (       <SafeAreaView style={{flex:1}}   >    
    <Best/><All/> 
       <StatusBar style='auto' />
    </SafeAreaView> 
    
  )
  };
const styles_home = StyleSheet.create({
  title:{
    width:'100%',
    alignItems: 'left',
    marginLeft:10,
    marginBottom:5,
    marginTop:5,
  
  },
  container: { 
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

export default Recovery;