import React , { useState,} from 'react';
import { View, Text,StyleSheet, FlatList, Button, Platform, Alert,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import * as authActions from "../actions/profile";
import BodyText from '../components/UI/BodyText';
import TitleText from '../components/UI/TitleText';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 



const profileScreen = () => {  
  const [finalData, setfinalData] = useState("");
 
  const tryprofile = async ()=> {
    const userDatas =await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userDatas);
    const { token, userId, expiryDate } =  transformedData;
    setfinalData(await authActions.profileFields(userId))
  
  };
  tryprofile();

  return(
<View style={styles.screen}>
<Text></Text>
 <View style={styles.line}>
  <View style={styles.imageContainer}>
    <Image source={require('../assets/user.png')} style={styles.image} resizeMode="cover"/>
  </View>
  <Feather style= {styles.icon} name="edit-2" size={24} color="black" onPress={()=>{  Alert.alert(
        'בפיתוח',
      
      );
}} /></View>
  <Text></Text>
  <View style={styles.headline}><TitleText >Email</TitleText></View>
  <BodyText style={styles.text}>{finalData.email}</BodyText>
  <View style={styles.headline}><TitleText>First Name</TitleText></View>
  <BodyText style={styles.text}>{finalData.firstName}</BodyText>
  <View style={styles.headline}><TitleText >Last Name</TitleText></View>
  <BodyText style={styles.text}>{finalData.lastName}</BodyText>
  <View style={styles.headline}><TitleText >Phone number</TitleText></View>
  <BodyText style={styles.text}>{finalData.phone}</BodyText>
 
</View>
  
  )

}

const styles = StyleSheet.create({
  screen: {

  justifyContent: 'center',
  alignItems: 'center'

 

},
imageContainer: {
  width: 150,
  height: 150,
  borderRadius: 75,
  borderWidth: 3,
  borderColor: 'black',
  overflow: 'hidden'
 
},
image: {
  width: '100%',
  height: '100%'
  
},
headline:{
 paddingBottom:2,
 flexDirection: 'row'

},
icon:{
  marginVertical: 10

},
line:{
  paddingBottom:10,
  flexDirection: 'column',
  justifyContent: 'space-around' 

 
 },
text:{
  paddingBottom:15
 
 }
});
export const screenOptions = {
  headerTitle: 'profile'
};
export default profileScreen;
