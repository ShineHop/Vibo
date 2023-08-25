import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Pressable,
    Button,
    Image
} from "react-native";

import CheckBox from '@react-native-community/checkbox';
import colors from './colors/colors';
import fonts from './fonts/fonts';

import axios from 'axios';

function JoinCharacter({route, navigation}) {
    const [joinInfoInputs, setJoinInfoInputs] = useState({
        joinID: joinID,
        taste: false, repurchase: false, texture: false,
        sweet: false, sour: false, fruit: false, milk: false,
        vita: false, bio: false, diet: false, vagina: false
    })

    const changeCheck = (key:string, value) => {
        setJoinInfoInputs(prevState => ({
             ...prevState,
             [key]: value,
        }));
    };

    // port 전송 코드
    const onJoinFinalPressed = () => {
        console.log(joinInfoInputs)
            try{
                axios.post('http://172.30.1.35:3001/api/join/:joinID/final',
                    {'joinID': joinID, 'taste': joinInfoInputs.taste, 'repurchase': joinInfoInputs.repurchase, 'texture': joinInfoInputs.texture,
                    'sweet': joinInfoInputs.sweet, 'sour': joinInfoInputs.sour, 'fruit': joinInfoInputs.fruit, 'milk': joinInfoInputs.milk,
                    'vita': joinInfoInputs.vita, 'bio': joinInfoInputs.bio, 'diet': joinInfoInputs.diet, 'vagina': joinInfoInputs.vagina})
                .then((response)=> {
                    if  (response.data.status == 'detail_success'){
                        navigation.replace('Tab');      // 해당 id의 home으로 접속해야 함 !!!!!
                    } else {
                        console.log(err);
                    }
                    console.log(response);
                })
            } catch (err){
                console.log(err)
            };
    };

    // Sign Up custom button
    const CustomButton = ({ onPress, text }) => {
    	return (
        	<Pressable
            	onPress={onJoinFinalPressed}
                style={styles.customBtnContainer}
            >
            	<Text style={styles.customBtnText}>
                	{text}
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1}}>
            <View style={styles.joinTextContainer}>
                <Text style={styles.joinText}>회원가입</Text>
                <Text style={styles.joinTextS}>회원님의 취향정보를 입력해주세요.</Text>
            </View>

            <View style={styles.joinContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profile}
                        source={require('./images/vibo_profile.png')} />
                </View>

                <ScrollView style={styles.checkContainer}>
                <Text style={styles.titleText1}> 고려사항 </Text>
                <View style={{flexDirection: 'row'}}>
                         <CheckBox
                            value={joinInfoInputs.taste}
                            onValueChange={(status) => {changeCheck('taste', status)}}
                         />
                        <Text style={styles.checkText}>맛</Text>
                        <CheckBox
                            value={joinInfoInputs.repurchase}
                            onValueChange={(status) => {changeCheck('repurchase', status)}}
                        />
                        <Text style={styles.checkText}>재구매 의사</Text>
                        <CheckBox
                            value={joinInfoInputs.texture}
                            onValueChange={(status) => {changeCheck('texture', status)}}
                        />
                        <Text style={styles.checkText}>목넘김</Text>
                    </View>

                    {joinInfoInputs.taste ? (
                        <View style={{flexDirection: 'row', marginLeft: '5%', marginTop: 12, marginBottom: 5}}>
                            <CheckBox
                                value={joinInfoInputs.sweet}
                                onValueChange={(status) => {changeCheck('sweet', status)}}

                            />
                            <Text style={styles.checkText}>단맛</Text>
                            <CheckBox
                                value={joinInfoInputs.sour}
                                onValueChange={(status) => {changeCheck('sour', status)}}

                            />
                            <Text style={styles.checkText}>새콤한맛</Text>
                            <CheckBox
                                value={joinInfoInputs.fruit}
                                onValueChange={(status) => {changeCheck('fruit', status)}}

                            />
                            <Text style={styles.checkText}>과일맛</Text>
                            <CheckBox
                                value={joinInfoInputs.milk}
                                onValueChange={(status) => {changeCheck('milk', status)}}

                            />
                            <Text style={styles.checkText}>우유맛</Text>
                        </View>
                    ) : null}

                    <Text style={styles.titleText2}>기능</Text>
                    <View style={{flexDirection: 'row'}}>
                        <CheckBox
                            value={joinInfoInputs.vita}
                            onValueChange={(status) => {changeCheck('vita', status)}}
                        />
                        <Text style={styles.checkText}>피로회복</Text>
                        <CheckBox
                            value={joinInfoInputs.bio}
                            onValueChange={(status) => {changeCheck('bio', status)}}
                        />
                        <Text style={styles.checkText}>장 건강</Text>
                        <CheckBox
                            value={joinInfoInputs.diet}
                            onValueChange={(status) => {changeCheck('diet', status)}}
                        />
                        <Text style={styles.checkText}>다이어트</Text>
                        <CheckBox
                            value={joinInfoInputs.vagina}
                            onValueChange={(status) => {changeCheck('vagina', status)}}
                        />
                        <Text style={styles.checkText}>질 건강</Text>
                    </View>
                </ScrollView>
                <CustomButton
                    text="Sign Up"
                />
                </View>

        </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    joinTextContainer: {
            flex: 1.5,
            justifyContent: 'center',
            backgroundColor: colors.Blue
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
        fontSize: 12,
        fontWeight: '500',
        color: colors.Black,
        marginTop: 10,
    },
    joinContainer: {
        flex:5,
        justifyContent: 'center',
        backgroundColor: colors.White
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    profile: {
        width: 120, height: 120,
        borderWidth: 15,
        borderColor: colors.Gray1,
        borderRadius: 100,
        position: 'relative',
        top: -30,
        zIndex: 1
    },
    titleText1: {
        width: '23%',
        padding: 5,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: colors.Gray3,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '700',
        color: colors.Black,
    },
    titleText2: {
        width: '12%',
        padding: 5,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: colors.Gray3,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '700',
        color: colors.Black,
    },
    checkContainer: {
        marginLeft: '5%',
    },
    checkText: {
        color: colors.Black,
        alignSelf: 'center'
    },
    customBtnContainer: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        marginBottom: '10%',
        borderRadius: 5,
        backgroundColor: colors.Blue,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    customBtnText: {
        color: colors.Black,
        fontWeight: '700',
        fontSize: 15
    },
});

export default JoinCharacter;