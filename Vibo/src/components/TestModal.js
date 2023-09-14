import React, {useEffect} from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Pressable,
    View,
    Image,
    Modal, Alert, FlatList
} from "react-native";

import axios from 'axios';
import stylelist from '../style';
import {imagePath} from '../components/imagePath.js'
import { useNavigation ,NavigationContainer} from "@react-navigation/native";

const TestModal = (props) => {
    const navigation = useNavigation();
    const {modalVisible, setModalVisible} = props;
    const {IBCFitemlist, setIBCFitems} = props;
    const {clicked, setclick} = props;
    
    console.log("props: ", props);

    useEffect(() => {
        async function IBCFList(){
            await axios.get('http://192.168.142.1:3001/api/user/IBCF/'+props.itemID).then((response)=>{
              console.log('IBCFLIST',response.data);
              setIBCFitems(response.data); 
            }
            ),[]
         }
        
         IBCFList();

    }, []);


    // port 전송 코드
    const onTextureUpdatePressed = () => {
            try{
                setModalVisible(!modalVisible)
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

    if (props.likeState == true){

    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            Alert.alert('변경사항이 저장되지 않습니다.');
            setModalVisible(!modalVisible);
        }}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{flexDirection:'row'}}>

                        <FlatList data={IBCFitemlist}
                        keyExtractor={(item) => item.ItemID}
                        horizontal = {true}
                        renderItem= {({ item })=>(
                            
                            <TouchableOpacity onPress={()=>[navigation.navigate('DrawerNavigationRoutes',{screen:"DetailPage",params:{item}}),setclick(false)]}>
                            <View style={styles.flatlistcontainer}>
                            <View >
                                <Image source={imagePath[item.ItemID]['src']} style = {styles.image}/>
                                
                            </View>
                                <View style={styles.flatlisttext}>
                                <Text style={[stylelist.Text_Medium,paddingTop=15, marginTop =10]} key={item.ItemID}>{item.item}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )}/>

                        
                    </View>
                    <TextureUpdateButton
                        text="닫기"
                    />
                </View>
            </View>
        </Modal>            
    );
                        }
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

export default TestModal;