import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View, FlatList,
    Image,
    Button
} from "react-native";

import colors from './colors/colors';
import fonts from './fonts/fonts';
import stylelist from '../style';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { containsKey, getData, removeData, storeData } from "./AsyncService";
import { storeUserData, getUserData } from './UserData';


function MyPage({route, navigation}) {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function getData() {
          const _persons = await getUserData();
          setUserData(_persons);
        }

        getData();

    },[]);

    const renderItem=({ item }) =>{
        const searchRegExp1 = new RegExp('\\[', 'g');
        const searchRegExp2 = new RegExp('\\]', 'g');
        const searchRegExp3 = new RegExp('\\"', 'g');

        userData[item].userTasteDetail =  userData[item].userTasteDetail.replace(searchRegExp1, '');
        userData[item].userTasteDetail =  userData[item].userTasteDetail.replace(searchRegExp2, '');
        userData[item].userTasteDetail =  userData[item].userTasteDetail.replace(searchRegExp3, '');
        userData[item].userFunction =  userData[item].userFunction.replace(searchRegExp1, '');
        userData[item].userFunction =  userData[item].userFunction.replace(searchRegExp2, '');
        userData[item].userFunction =  userData[item].userFunction.replace(searchRegExp3, '');

        if (userData[item].userTasteDetail == ''){userData[item].userTasteDetail = "상관없음"}
        if (userData[item].userTexture == ''){userData[item].userTexture = '상관없음'};
        if (userData[item].userFunction == ''){userData[item].userFunction = '상관없음'};

        return(
            <View>
                <View style={styles.infoSet}>
                    <Text>회원정보</Text>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={styles.profile}
                            source={require('./images/vibo_profile.png')} />
                        <View>
                            <Text style={styles.infoText}>{userData[item].userName}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginTop: '20%'}}>20대</Text>
                                <Text style={{marginTop: '20%'}}>/</Text>
                                <Text style={{marginTop: '20%'}}>여성</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.infoSet}>
                    <Text>추천 받고 싶은 맛</Text>
                    <Text style={styles.infoText}>{userData[item].userTasteDetail}</Text>
                </View>
                <View style={styles.infoSet}>
                    <Text>제품의 목넘김 여부</Text>
                    <Text style={styles.infoText}>{userData[item].userTexture}</Text>
                </View>
                <View style={styles.infoSet}>
                    <Text>추천 받고 싶은 기능의 제품</Text>
                    <Text style={styles.infoText}>{userData[item].userFunction}</Text>
                </View>
            </View>
        )
    }

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
                <View style={styles.infoTextContainer}>
                      <FlatList
                        data={Object.keys(userData)}
                        renderItem= {renderItem}/>
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
        flex: 1,
        backgroundColor: colors.Blue,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    joinText: {
        marginRight: '30%',
        alignSelf: 'center',
        fontFamily: 'inter',
        fontSize: 25,
        fontWeight: '700',
        color: colors.Black,
        lineHeight: 29.3,
    },
    logoutBtnText: {
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
        marginTop: 30
    },
    infoSet: {
        width: '80%',
        padding: 5,
        marginBottom: 15,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: colors.Gray3,
        alignSelf: 'center',
    },
    infoText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.Black,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5
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
        marginTop: 20,
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