import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Actions from "../actions/sosLocation";
import * as emergencyContactActions from '../actions/emergencyContact';
import * as profileActions from "../actions/profile";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SendSMS from 'react-native-sms'
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';
import MapView, { PROVIDER_GOOGLE , AnimatedRegion, MarkerAnimated, Marker } from 'react-native-maps'
import { Link } from '@react-navigation/native';
const MapScreen = props => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResults] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({image:""});
  const [usersInSOS, setUsersInSOS] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [imageSosTmp, setImageSosTmp ] = useState("");
  const [userEmergencyContact, setUserEmergencyContact] = useState({
    Name1:"",
    Name2:"",
    Name3:""
  });
   
  const getData = async ()=> {
    const userDatas = await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userDatas);
    const { token, userId, expiryDate } =  transformedData;
    setUserId(userId);
    setUserEmergencyContact(await emergencyContactActions.getEmergencyContactFields(userId));
    setUserData(await profileActions.profileFields(userId));
    setAllUsers(await Actions.getUsersData())

    
  };
  useEffect(() => {

    function onSpeechResults(e) {
      
      setResults(e.value ?? []);
      e.value.map((word) =>{
        for( const pro in userData.safeWords){
          console.log(userData.safeWords[pro])
          if(word === userData.safeWords[pro]){
            sosActive();
          }}})

    }
    function onSpeechError(e) {
      console.error(e);
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return function cleanup() {
      setResults([])
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isListening]);

  async function toggleListening() {
    try {
      if (isListening) {

        await Voice.stop();
        setIsListening(false);

      } else { 
        setResults([]);
        await Voice.start("en-US");
        setIsListening(true);

      }
    } catch (e) {
      console.error(e);
    }
  }

  const [mapRegion,setMapRegion]=useState( {
    latitude:32.08806210738426,
    longitude: 34.784654458108164,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421
  });

  const [sosFlag,setSosFlag]=useState(false);
  const verifyPermissions = async () =>{
    const result =  await Location.requestForegroundPermissionsAsync();
    if (result.status !== 'granted'){
        Alert.alert('you need to grant location permissions to use this app.',[{text :'Okay'}]);
        return false;
    }
    return true;
  };
  
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions({});
    if (!hasPermission){
        return;
    }
    try{
        
        let location = await Location.getCurrentPositionAsync({timeout:5000});
        setMapRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta:0.0922,
              longitudeDelta:0.0421
            });
      
    }catch(err){
        Alert.alert("could not fetch location",[{text:'Okay'}])
    }
  };
  const sosActive = async () =>{
    setSosFlag(true);
    await getLocationHandler();
    Actions.changeSOSflag(userId,true);
    Actions.saveSOSlocation(userId,mapRegion.latitude,mapRegion.longitude)
    const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    if(userEmergencyContact.Phone1 === '' && userEmergencyContact.Phone2 === '' && userEmergencyContact.Phone3 === ''){
    }else{
      let contactArray=[];
      if(userEmergencyContact.Phone1 !== ''){contactArray.push(userEmergencyContact.Phone1)}
      if(userEmergencyContact.Phone2 !== ''){contactArray.push(userEmergencyContact.Phone2)}
      if(userEmergencyContact.Phone3 !== ''){contactArray.push(userEmergencyContact.Phone3)}
     
    
      const { result } = await SMS.sendSMSAsync(
        contactArray,
        `Hi, ${userData.firstName} need your help !!! Her location: ${`http://www.google.com/maps/place/${mapRegion.latitude},${mapRegion.longitude}`}
        `,
        
        // {
        //   attachments: {
        //     uri: 'http://www.google.com/maps/place/${mapRegion.latitude},${mapRegion.longitude}',
        //     // mimeType: 'image/png',
        //     // filename: 'myfile.png',
        //   },
        // }
      );
    } 
    }
  else {
  }
  }
  const sosInActive = () =>{
    setSosFlag(false);
    Actions.changeSOSflag(userId,false);
  }


  useEffect(() => {
    let isMounted = true;
      if(isMounted ){
        getData();
        getLocationHandler();
      }  
    return() => {isMounted = false;}
  }, [])

  useEffect(() => { const interval = setInterval(() => { 
      let sosArray=[];

      async function getData(){
        setAllUsers(await Actions.getUsersData());
        setUserData(await profileActions.profileFields(userId));

      }
      getData(); 
     
      
      allUsers.forEach(element => {
        console.log()
        if(element.sosFlag === true){

          let currentSosLocation = Object.values(element.SOSlocationsHistory).pop()
          if(currentSosLocation){
         
            sosArray.push({...element, currentSosLocationLat:Object.values(currentSosLocation)[0],currentSosLocationLon:Object.values(currentSosLocation)[1]});


          }
        
        }
      });   
    
      setUsersInSOS(sosArray);

     }, 20000); return () => 
     clearInterval(interval);
     

    
  }, [allUsers]); 

  useEffect(() => { const interval = setInterval(() => { 
    console.log("hi")
    toggleListening()
    console.log(".................................")
    }, 3000); return () => 
    clearInterval(interval);
  }, []); 
 return (
    <View  style={styles.map}>
    <MapView style={styles.map} followUserLocation={true} showsUserLocation={true} region={mapRegion}>    

    {usersInSOS.map((user) => <Marker  
                    title={`${user.firstName}`+" need your help !" }//popup text 
                    description={"Location: "+ `${user.currentSosLocationLat}` +' , '+ `${user.currentSosLocationLon}`}// pop up description
                    pinColor='red'//popup color
                    coordinate={{ latitude :user.currentSosLocationLat  , longitude : user.currentSosLocationLon }}
                    pinColor={'green'}
                    
                    >
                    <View 
                      style = {{
                        borderRadius:160,
                        width: 70 ,
                        height:70 ,
                        backgroundColor:'#f00',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >                    
                    
                    {(user.image === "") ?
                      (<Image source={require('../assets/user.png')} resizeMode="cover"/>)
                     : (<Image fadeDuration={0} style={{width:60,height:60,borderRadius:160 }} source={{uri:user.image}} />) }
                    </View>
                    
                </Marker>)}
    </MapView>
    <Button 
        title="SOS"
        color= {sosFlag === false ? Colors.primary : "red"}
        onPress={sosFlag === false ? sosActive : sosInActive }
      />
    </View>
 )
}
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: {flex:1}

});
export const screenOptions = {
  headerTitle: 'Map'
};
export default MapScreen;

