import React, {useState, useContext} from "react";
import {
    SafeAreaView, ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Text,
    Pressable,
    View,
    Image,
    Button,
    Modal, Alert
} from "react-native";

import CheckBox from '@react-native-community/checkbox';

import colors from '../pages/colors/colors';
import fonts from '../pages/fonts/fonts';
import axios from 'axios';
import stylelist from '../style';

const FunctionModal = (props) => {
    const {modalVisible, setModalVisible} = props;
    const [functionUpdate, setFunctionUpdate] = useState({
        vita: false, bio: false, diet: false, vagina: false
    })

    const changeCheck = (key:string, value) => {
        setFunctionUpdate(prevState => ({
             ...prevState,
             [key]: value,
        }));
    };

    // port 전송 코드
    const onFuncUpdatePressed = () => {
            try{
                axios.post('http://172.30.1.36:3001/api/user/2023052702/mypage/edit/function',
                    {'vita': functionUpdate.vita, 'bio': functionUpdate.bio, 'diet': functionUpdate.diet, 'vagina': functionUpdate.vagina })
                .then((response)=> {
                    if  (response.data.status == 'update_func_success'){
                        setModalVisible(!modalVisible)
                    }
                })
                .catch(error => {
                    console.log(err);
                });
            } catch (err){
                console.log(err)
            };
    };

    // Function 수정사항 저장 Btn
    const FuncUpdateButton = ({ onPress, text }) => {
        return (
            <Pressable
                style={styles.modalButton}
                onPress={onFuncUpdatePressed}
            >
                <Text style={styles.modalText}>
                    {text}
                </Text>
            </Pressable>
        );
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
        }}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row'}}>
                        <CheckBox
                            value={functionUpdate.vita}
                            onValueChange={(status) => {changeCheck('vita', status)}}
                         />
                        <Text style={styles.modalText}>피로회복</Text>
                        <CheckBox
                            value={functionUpdate.bio}
                            onValueChange={(status) => {changeCheck('bio', status)}}
                         />
                        <Text style={styles.modalText}>장건강</Text>
                        <CheckBox
                            value={functionUpdate.diet}
                            onValueChange={(status) => {changeCheck('diet', status)}}
                         />
                        <Text style={styles.modalText}>다이어트</Text>
                        <CheckBox
                            value={functionUpdate.vagina}
                            onValueChange={(status) => {changeCheck('vagina', status)}}
                         />
                        <Text style={styles.modalText}>질건강</Text>
                    </View>
                    <FuncUpdateButton
                        text="저장하기"
                    />
                </View>
            </View>
        </Modal>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        alignSelf: 'center'
    },

    modalButton: {
        justifyContent: 'flex-end'
    }
});

export default FunctionModal;