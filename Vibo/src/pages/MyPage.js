import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    Image,
    Button
} from "react-native";

import colors from './colors/colors';
import fonts from './fonts/fonts';
import axios from 'axios';
import stylelist from '../style';

// Edit custom button
const CustomButton = ({ onPress, text }) => {
	return (
    	<Pressable
        	onPress={onPress}
            style={styles.customBtnContainer}
        >
        	<Text style={styles.customBtnText}>
            	{text}
            </Text>
        </Pressable>
    );
}

function MyPage({route, navigation}) {
    const [userInfo, setUserInfo] = useState({
        userID: '', userPwd: '', userName: '',
        userTaste: '', userTasteDetail: '',
        userRebuy: '', userTexture: '', userFunction: ''
    });

    const changeCheck = (key:string, value) => {
        setUserInfo(prevState => ({
             ...prevState,
             [key]: value,
        }));
    };

    try{
        axios.get('http://172.30.1.36:3001/api/onLogin/2023052702/mypage')
        .then((response)=> {
            if  (response.data.status == 'found_userInfo'){
                console.log("hi: ", response.data);
                setUserInfo.userID = response.data.data['userID'];
                setUserInfo.userPwd = response.data.data['userPwd']
                setUserInfo.userName = response.data.data['userName'];
                setUserInfo.userTaste = response.data.data['userTaste'];
                setUserInfo.userTasteDetail = response.data.data['userTasteDetail'];
                setUserInfo.userRebuy = response.data.data['userRebuy'];
                setUserInfo.userTexture = response.data.data['userTexture'];
                setUserInfo.userFunction = response.data.data['userFunction'];
            }
        })
        .catch(error => {
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              console.log('mypage_response')
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log('mypage_request')
              console.log(error.request)
            } else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              console.log('mypage_Error', error.message)
            }
            console.log(error.config)
        });
    } catch (err){
        console.log(err)
    };

    return (
        <SafeAreaView style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1}}>
            <View style={styles.mypageTopContainer}>
                <Text style={styles.joinText}>My Page</Text>
                <Pressable onPress={() => navigation.navigate('JoinPage')}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </Pressable>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profile}
                        source={require('./images/vibo_profile.png')} />
                    <View style={{flexDirection:'col'}}>
                        <Text>{setUserInfo.userName}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>20대</Text>
                            <Text>/</Text>
                            <Text>여성</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>{setUserInfo.userTasteDetail} </Text>
                    <Text style={styles.infoText}>{setUserInfo.userRebuy} </Text>
                    <Text style={styles.infoText}>{setUserInfo.userTexture} </Text>
                    <Text style={styles.infoText}>{setUserInfo.userFunction} </Text>
                </View>

                <View style={{flexDirection: "row", alignSelf: 'flex-end'}}>
                    <Image
                        style={styles.icon}
                        source={require('./images/paw.png')} />
                    <CustomButton
                        onPress={()=>
                        navigation.navigate('DrawerNavigationRoutes',{screen:"EditPage"})}
                        text="취향이 바뀌었어요"
                    />
                </View>

            </View>

        </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    mypageTopContainer: {
        flex: 1.5,
        backgroundColor: colors.Blue,
        flexDirection: 'row',
    },
    joinText: {
        marginLeft: '30%',
        alignSelf: 'center',
        fontFamily: 'inter',
        fontSize: 25,
        fontWeight: '700',
        color: colors.Black,
        lineHeight: 29.3,
    },
    logoutBtnText: {
        marginRight: '5%',
        marginTop: '30%',
        alignSelf: 'center',
        color: colors.White,
    },
    infoContainer: {
        flex: 5,
        backgroundColor: colors.White
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    profile: {
        width: 110, height: 110
    },
    infoTextContainer: {

    },
    infoText: {
        width: '80%',
        padding: 5,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: colors.Gray3,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '700',
        color: colors.Black,
        alignSelf: 'center'
    },




    customInput: {
        backgroundColor: colors.White,
        width: '78%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 5,
        marginRight: '5%',
        alignSelf: 'flex-end'
    },
    customInput2: {
        backgroundColor: colors.White,
        width: '47%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    customInput3: {
        backgroundColor: colors.White,
        width: '10%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    icon: {
        width: 55, height: 55,
        position: 'relative',
        left: 30,
        bottom: -5,
        zIndex: 1
    },
    customBtnContainer: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 11,
        marginRight: '5%',
        borderRadius: 50,
        backgroundColor: colors.Gray2,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    customBtnText: {
        color: colors.Black,
        fontWeight: '700',
        fontSize: 15
    },
});

export default MyPage;