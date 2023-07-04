import React, {useState} from "react";
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

//Name, Birthday, ID, PW custom
const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.customInput}
            secureTextEntry={secureTextEntry}
        />
    );
}
const CustomInput2 = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.customInput2}
            secureTextEntry={secureTextEntry}
        />
    );
}
const CustomInput3 = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.customInput3}
            secureTextEntry={secureTextEntry}
        />
    );
}

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

function Join({navigation}) {
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

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
                <CustomInput
                    value={username}
                    setValue={setUsername}
                    placeholder="Username"
                />
                <Text style={{marginBottom: '2%'}}> 주민번호 앞 6자리 </Text>
                <View  style={{flexDirection: "row", justifyContent: 'flex-end', marginRight: '5%'}}>
                    <CustomInput2
                        value={birthday}
                        setValue={setBirthday}
                        placeholder="Birthday"
                        keyboardType="numeric"
                    />
                    <Text style={{alignSelf: 'center', fontSize: 40}}> - </Text>
                    <CustomInput3
                        value={sex}
                        setValue={setSex}
                        keyboardType="numeric"
                    />
                    <Text style={{alignSelf: 'center', fontSize: 20}}> ****** </Text>
                </View>

                <Text> ID </Text>
                <CustomInput
                    value={id}
                    setValue={setID}
                    placeholder="ID"
                />
                <Text> PW </Text>
                <CustomInput
                    value={password}
                    setValue={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />
                </View>
                <View style={{flexDirection: "row", alignSelf: 'flex-end'}}>
                    <Image
                        style={styles.icon}
                        source={require('./images/paw.png')} />
                    <CustomButton
                        onPress={()=>navigation.navigate('JoinCharPage')}
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