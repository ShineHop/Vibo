import React, {useState, useContext} from "react";
import {
    SafeAreaView, ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    Image,
    Button,
    Modal, Alert
} from "react-native";

import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';

import colors from '../pages/colors/colors';
import fonts from '../pages/fonts/fonts';
import axios from 'axios';
import stylelist from '../style';


const TextureModal = (props) => {
    const {modalVisible, setModalVisible} = props;
    const [textureUpdate, setTextureUpdate] = useState('yes')

    // port 전송 코드
    const onTextureUpdatePressed = () => {
            try{
                axios.post('http://172.30.1.35:3001/api/user/2023052702/mypage/edit/texture',
                    {'texture': textureUpdate})
                .then((response)=> {
                    if  (response.data.status == 'update_texture_success'){
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

    // Texture 수정사항 저장 Btn
    const TextureUpdateButton = ({ onPress, text }) => {
        return (
            <Pressable
                style={styles.modalButton}
                onPress={onTextureUpdatePressed}
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
                        <RadioButton
                            value='yes'
                            status = {textureUpdate==='yes' ? 'checked' : 'unchecked'}
                            onPress={() => setTextureUpdate('yes')}
                        />
                        <Text style={styles.modalText}>목넘김 좋은 제품</Text>
                        <RadioButton
                            value='no'
                            status = {textureUpdate==='no' ? 'checked' : 'unchecked'}
                            onPress={() => setTextureUpdate('no')}
                        />
                        <Text style={styles.modalText}>목넘김 여부 상관없음</Text>
                    </View>
                    <TextureUpdateButton
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

export default TextureModal;