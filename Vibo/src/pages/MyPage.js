import React, {useState} from "react";
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

function MyPage({navigation}) {


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
                        <Text>김OO</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>20대</Text>
                            <Text>/</Text>
                            <Text>여성</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>임시 text 입니다. </Text>
                    <Text style={styles.infoText}>임시 text 입니다. </Text>
                    <Text style={styles.infoText}>임시 text 입니다. </Text>
                    <Text style={styles.infoText}>임시 text 입니다. </Text>
                </View>

                <View style={{flexDirection: "row", alignSelf: 'flex-end'}}>
                    <Image
                        style={styles.icon}
                        source={require('./images/paw.png')} />
                    <CustomButton
                        onPress={()=>
                        axios.get("http://localhost:4000/")
                                .then((res: any) => {
                                    console.log(res);
                                }).catch((err: any) => {
                                    console.log(err);
                                })}
                        /* navigation.navigate('Edit')} */
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
        flexDirection: 'row'
    },
    joinText: {
        justifyContent: 'center',
        fontFamily: 'inter',
        fontSize: 25,
        fontWeight: '700',
        color: colors.Black,
        lineHeight: 29.3,
    },
    logoutBtnText: {
        marginRight: '10%',
        justifyContent: 'flex-end',
        color: colors.White
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