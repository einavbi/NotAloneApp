import React , { useState} from 'react';
import { View, Text,StyleSheet, FlatList, Button, Platform, Alert,Image,ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
// import BodyText from '../components/UI/BodyText';
// import TitleText from '../components/UI/TitleText';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import MapPreview from '../components/UI/MapPreview';
import LocationPicker from '../components/UI/LocationPicker';
import * as Actions from "../actions/sosLocation.js";

const SosLocationsHistoryScreen = () => {  
  const l1={lat:37.4217214, lng:-122.0841932}
  const [courseGoals, setCourseGoals] = useState([]);

  const l2={}
  const [data,setData]= useState("");
  const [userId, setUserId] = useState("");
  const getData = async ()=> {
    const userDatas =await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userDatas);
    const { token, userId, expiryDate } =  transformedData;
    setUserId(userId);
    setData(await Actions.getSosLocationsHistory(userId))
 
  };
 
  getData();
  return(
<View >

 
{/* <LocationPicker/> */}
<ScrollView>
<MapPreview style={styles.mapPreview} location={data.lat,data.lng}></MapPreview>
<MapPreview style={styles.mapPreview} location={data.lat,data.lng}></MapPreview>
<MapPreview style={styles.mapPreview} location={data.lat,data.lng}></MapPreview>
<MapPreview style={styles.mapPreview} location={data.lat,data.lng}></MapPreview>
</ScrollView>

</View>
  
  )

}

const styles = StyleSheet.create({
  screen: {

  justifyContent: 'center',
  alignItems: 'center'

 

},
mapPreview: {
  marginBottom: 10,
  width: '100%',
  height: 150,
  borderColor: '#ccc',
  borderWidth: 1
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
  headerTitle: 'SOS Locations History'
};
export default SosLocationsHistoryScreen;
