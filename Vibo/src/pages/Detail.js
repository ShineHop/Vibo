import React from "react";
import { View, Text,Modal,Pressable, PanResponder} from "react-native";
//임의로 짬

function RelateRecommend(){
  const [isModalVisible,setIsModalVisible] = useNavigationState(false);
  return(
    <Modal 
    animationType="{slide}"
    transparent = {true}
    visible = {isModalVisible}
    onRequestClose={()=>{
      isModalVisible(!isModalVisible)
      console.log("modal appear")
    }}>
      <Text>MOdal</Text>
    <Pressable onPress={()=>{
      isSearchBarAvailableForCurrentPlatform.alert("Modal", "모달 나타남")
    }}>
      <Text>View Alert</Text>

</Pressable>
</Modal>      )
}
const starRender = (e) =>{
  const result = [];
  for (let i = 0; i < e.is_score; i++) {
    result.push(<FontAwesomeIcon key={i} icon={faStar} color='red'/>);
  }
  return result;
}


class Detail {
async componentDidMount() {
  this.getUserID().then(() => {
       this.callGetWishIdAPI().then((response) => { 
          if(response.includes(this.item.id)==true){
              this.setState({ButtonClicked:true})
          }
       });
  });
}
async callGetWishIdAPI() {
  let manager = new WebServiceManager(Constant.serviceURL + "/GetWishIdList?user_id="+this.id);
  let response = await manager.start();
  if (response.ok)
      return response.json();
  else
      Promise.reject(response);
}
render() {
  if(this.state.isclick){
    this.componentDidMount()
    this.callGetWishIdAPI()
  }
  return(
  <div>
    <View>
      <Text>detail</Text>
      {starRender(e)}
      {RelateRecommend}
    </View>
  </div>
)}}
export default Detail;