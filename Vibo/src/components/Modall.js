import React,{useState} from "react";
import Modal from 'react-native-simple-modal';
import { View, Text, StyleSheet,TouchableOpacity,Image,Pressable, PanResponder} from "react-native";


export default function Modall() {
    const [openState, setOpenState] = useState(false);

    return(
    <Modal //모달창
    animationType="slide"
    transparent="true"
    visible={openState}
    onRequestClose={()=>{
        openState(!openState)
        console.log("modal appear")
    }}>
        <View> 
            <Text style={{fontSize: 20}}>모달창이요!</Text>
            <Text style={{fontSize: 20}}>너무 어려워요!</Text>

            </View>
        </Modal>
    )
  }
  const styles = StyleSheet.create({
    container: {
      zIndex:3,
      position:'absolute',
      height:'100%',
      width:'100%',
      justifyContent:"center",
      alignContent:"center",
      alignItems:"center",
      paddingTop: 50
    },
    buttontext:{
  
      position:'relative',
      left:170,
      bottom:350,
      fontSize:20,
    },
    text:{
      position:'relative',
      fontSize:15,
      fontWeight:'700',
      left:'40%',
    }
  
  })