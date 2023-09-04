import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { containsKey, getData, removeData, storeData } from "./AsyncService";
import axios from 'axios';


export const storeUserData = async () => {
      try {
        //infoArray=[]
        const userID = JSON.parse( await AsyncStorage.getItem("userID"));

        if (userID) {
          console.log("getData_userID: ", userID);
          try{
                axios.get('http://172.30.1.35:3001/api/onLogin/'+ userID +'/mypage')
                .then((response)=> {
                    if  (response.data.status == 'found_userInfo'){
                        console.log("hi: ", response.data);
                        //storeData('userInfo', response.data.data);
                        //storeData('userName', response.data.data['userName']);   // 로컬저장소에 저장
                        //storeData('userTaste', response.data.data['userTaste']);
                        //storeData('userTasteDetail', response.data.data['userTasteDetail']);
                        //storeData('userRebuy', response.data.data['userRebuy']);
                        //storeData('userTexture', response.data.data['userTexture']);
                        //storeData('userFunction', response.data.data['userFunction']);

                        //infoArray = [...infoArray, response.data.data]
                        //console.log(infoArray);
                        //storeData('userInfo', infoArray);
                        const temp = {user:response.data.data};
                        console.log("temp: ", temp);
                        storeData('userInfo', temp);
                    }
                })
                .catch(error => { console.log("userdata: ", err); });

            } catch (err){
                console.log("userdata: ", err)
            };
        }

      } catch (error) {
        console.log("userdata: ", error);
      }
};

export const getUserData = async (): Promise => {
    const userInfo = await getData("userInfo");
    console.log("userInfo: ", userInfo);
    return userInfo;
};