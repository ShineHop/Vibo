import React, {useState} from "react";
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

function JoinCharacter({navigation}) {
    const [taste, setTaste] = useState(false);
    const [repurchase, setRepurchase] = useState(false);
    const [func, setFunc] = useState(false);

    const [sweet, setSweet] = useState(false);
    const [sour, setSour] = useState(false);
    const [fruit, setFruit] = useState(false);
    const [milk, setMilk] = useState(false);

    const [vita, setVita] = useState(false);
    const [bio, setBio] = useState(false);
    const [diet, setDiet] = useState(false);
    const [vagina, setVagina] = useState(false);

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
                            value={taste}
                            onValueChange={setTaste}
                         />
                        <Text style={styles.checkText}>맛</Text>
                        <CheckBox
                            value={repurchase}
                            onValueChange={setRepurchase}
                        />
                        <Text style={styles.checkText}>재구매 의사</Text>
                        <CheckBox
                            value={func}
                            onValueChange={setFunc}
                        />
                        <Text style={styles.checkText}>목넘김</Text>
                    </View>

                    {taste ? (
                        <View style={{flexDirection: 'row', marginLeft: '5%', marginTop: 12, marginBottom: 5}}>
                            <CheckBox
                                value={sweet}
                                onValueChange={setSweet}
                                onPress={(isChecked: boolean) => {}}
                            />
                            <Text style={styles.checkText}>단맛</Text>
                            <CheckBox
                                value={sour}
                                onValueChange={setSour}
                                onPress={(isChecked: boolean) => {}}
                            />
                            <Text style={styles.checkText}>새콤한맛</Text>
                            <CheckBox
                                value={fruit}
                                onValueChange={setFruit}
                                onPress={(isChecked: boolean) => {}}
                            />
                            <Text style={styles.checkText}>과일맛</Text>
                            <CheckBox
                                value={milk}
                                onValueChange={setMilk}
                                onPress={(isChecked: boolean) => {}}
                            />
                            <Text style={styles.checkText}>우유맛</Text>
                        </View>
                    ) : null}

                    <Text style={styles.titleText2}>기능</Text>
                    <View style={{flexDirection: 'row'}}>
                        <CheckBox
                            value={vita}
                            onValueChange={setVita}
                        />
                        <Text style={styles.checkText}>피로회복</Text>
                        <CheckBox
                            value={bio}
                            onValueChange={setBio}
                        />
                        <Text style={styles.checkText}>장 건강</Text>
                        <CheckBox
                            value={diet}
                            onValueChange={setDiet}
                        />
                        <Text style={styles.checkText}>다이어트</Text>
                        <CheckBox
                            value={vagina}
                            onValueChange={setVagina}
                        />
                        <Text style={styles.checkText}>질 건강</Text>
                    </View>
                </ScrollView>
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