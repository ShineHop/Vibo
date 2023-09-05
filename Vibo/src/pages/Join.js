import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Pressable,
    Button,
    Image
} from "react-native";

import colors from './colors/colors';
import fonts from './fonts/fonts';

import { useNavigation } from "@react-navigation/native";

import axios from 'axios';

function Join({route, navigation}) {
    const [joinInputs, setJoinInputs] = useState({
        username: '',
        birthday: '',
        sex: '',
        id: '',
        password: ''
    });

    const handleInputChange=(key:string, value:string)=>{
        setJoinInputs(prevState => ({
            ...prevState,
            [key]:value,
        }));
    };

    // Next custom button
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

    // 임시 확인용
    const onProfilePressed = () => {
        console.warn("onProfilePressed");
    };

    // port 전송 코드
    const onJoinNextPressed = () => {
        console.log(joinInputs)
            try{
                axios.post('http://172.30.1.35:3001/api/join/' + joinInputs.id + '/' + joinInputs.username + '/' + joinInputs.password,
                    {'username': joinInputs.username, 'birthday': joinInputs.birthday, 'sex': joinInputs.sex,
                    'id': joinInputs.id, 'password': joinInputs.password})
                .then((response)=> {
                    if  (response.data.status == 'check_success'){
                        joinID = response.data.data['id'];
                        joinName = response.data.data['username'];
                        joinPwd = response.data.data['password'];
                        //joinBirth = response.data.data['birthday'];
                        //joinSex = response.data.data['sex'];

                        navigation.navigate('JoinCharPage');

                    } else {
                        console.log(response.data.status);
                        console.warn('이미 존재하는 아이디입니다.')     // 재입력 문구 띄우기
                    }
                })
                .catch(error => {
                    if (error.response) {
                      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                      console.log('response')
                      console.log(error.response.data)
                      console.log(error.response.status)
                      console.log(error.response.headers)
                    } else if (error.request) {
                      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                      // Node.js의 http.ClientRequest 인스턴스입니다.
                      console.log('request')
                      console.log(error.request)
                    } else {
                      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                      console.log('Error', error.message)
                    }
                    console.log(error.config)
                });

            } catch (err){
                console.log(err)
            };
    };

    return (
        <SafeAreaView style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, backgroundColor: colors.Blue}}>
            <View style={styles.joinTextContainer}>
                <Text style={styles.joinText}>회원가입</Text>
                <Text style={styles.joinTextS}>VIBO와 함께해주셔서 감사합니다.</Text>
            </View>

            <View style={styles.joinContainer}>

                <Text> 프로필 </Text>
                <View style={styles.profileContainer}>
                    <Pressable onPress={onProfilePressed}>
                        <Image
                              style={styles.profile}
                              source={require('./images/vibo_profile.png')} />
                    </Pressable>
                    <Pressable onPress={onProfilePressed}>
                        <Image
                              style={styles.profile}
                              source={require('./images/babo_profile.png')} />
                    </Pressable>
                </View>

                <View>
                <Text> 닉네임 </Text>
                <TextInput
                    style={styles.customInput}
                    value={joinInputs.username}
                    onChangeText={(text) => {handleInputChange('username', text)}}
                    placeholder="Username"
                />
                <Text style={{marginBottom: '2%'}}> 주민번호 앞 6자리 </Text>
                <View  style={{flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%'}}>
                    <TextInput
                        style={styles.customInput2}
                        value={joinInputs.birthday}
                        onChangeText={(text) => {handleInputChange('birthday', text)}}
                        placeholder="Birthday"
                        keyboardType="numeric"
                    />
                    <Text style={{alignSelf: 'center', fontSize: 40}}> - </Text>
                    <TextInput
                        style={styles.customInput3}
                        value={joinInputs.sex}
                        onChangeText={(text) => handleInputChange('sex', text)}
                        keyboardType="numeric"
                    />
                    <Text style={{alignSelf: 'center', fontSize: 20}}> ****** </Text>
                </View>

                <Text> ID </Text>
                <TextInput
                    style={styles.customInput}
                    value={joinInputs.id}
                    onChangeText={(text) => {handleInputChange('id', text)}}
                    placeholder="ID"
                />
                <Text> PW </Text>
                <TextInput
                    style={styles.customInput}
                    value={joinInputs.password}
                    onChangeText={(text) => {handleInputChange('password', text)}}
                    placeholder="Password"
                    secureTextEntry
                />
                </View>
                <View style={{flexDirection: "row", alignSelf: 'flex-end'}}>
                    <Image
                        style={styles.icon}
                        source={require('./images/paw.png')} />
                    <CustomButton
                        onPress={onJoinNextPressed}
                        text="취향정보 입력하기"
                    />
                </View>
            </View>

        </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    joinTextContainer: {
        flex: 1,
        justifyContent: 'flex-end'
        },
    joinText: {
        marginLeft: '9%',
        fontFamily: 'inter',
        fontSize: 25,
        fontWeight: '700',
        color: colors.Black,
        lineHeight: 29.3,
    },
    joinTextS: {
        marginLeft: '9%',
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
        color: colors.Black
    },
    joinContainer: {
        flex:5,
        marginLeft: '5%',
        justifyContent: 'center'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    profile: {
        width: 110, height: 110
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

export default Join;