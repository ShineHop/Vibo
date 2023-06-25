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

// Sign Up custom button
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
                <Text> 생년월일 </Text>
                <CustomInput
                    value={birthday}
                    setValue={setBirthday}
                    placeholder="Birthday"
                />
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

                <CustomButton
                    onPress={()=>navigation.navigate('Home')}
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
            flex: 1,
            marginLeft: '9%',
            justifyContent: 'flex-end'
        },
    joinText: {
        fontFamily: 'inter',
        fontSize: 25,
        fontWeight: '700',
        color: colors.Black,
        lineHeight: 29.3,
    },
    joinTextS: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.Black,
        marginTop: 10,
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
    customBtnContainer: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 11,
        borderRadius: 5,
        backgroundColor: colors.Green,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    customBtnText: {
        color: colors.Gray2,
        fontWeight: '700',
        fontSize: 15
    },
});

export default Join;