import React, { useState, useEffect, useCallback } from 'react';
import BodyText from '../components/UI/BodyText';
import TitleText from '../components/UI/TitleText';
import Card from '../components/UI/Card';
const ENCODING = 'LINEAR16';
const SAMPLE_RATE_HERTZ = 41000;
const LANGUAGE = 'en-US';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Platform,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import * as Speech from 'expo-speech'
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as Actions from "../actions/emergencyContact";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const SafeWordsScreen = props => {
  // const [results, setResults] = useState([] as string[]);
  // const [isListening, setIsListening] = useState(false);

  // useEffect(() => {
  //   function onSpeechResults(e: SpeechResultsEvent) {
  //     setResults(e.value ?? []);
  //   }
  //   function onSpeechError(e: SpeechErrorEvent) {
  //     console.error(e);
  //   }
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;
  //   return function cleanup() {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // async function toggleListening() {
  //   try {
  //     if (isListening) {
  //       await Voice.stop();
  //       setIsListening(false);
  //     } else {
  //       setResults([]);
  //       await Voice.start("en-US");
  //       setIsListening(true);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
 return (
    //<View><Text>Please record up to 3 security words in case of emergency.</Text></View>
   //  <Button title="Speak!" onPress={() => Speech.speak('bla bla bla')} />
   
   <View style={styles.cards}>
    <Text>Please record/type up to 3 security words in case of emergency.</Text> 
    <Text></Text>
    <Text></Text>
   <Card style={styles.card}>
     <Text></Text>
     <View style={styles.inputCom}>
     <Ionicons  style={styles.icon}
                   name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={23}
               color={Colors.primary}
             />
     <TitleText style={styles.nameAndPhone}>Word 1:</TitleText>
     <TextInput placeholder={""} onChangeText={() =>{ }} defaultValue={""} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button  title="Save" color={Colors.primary} onPress={() =>{ }}/>

   
     </View>
     <Text></Text>
   </Card>
 
   <Card style={styles.card}>
     <Text></Text>
     <View style={styles.inputCom}>
     <Ionicons  style={styles.icon}
           name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={23}
               color={Colors.primary}
             />
     <TitleText style={styles.nameAndPhone}>Word 2:</TitleText> 
     <TextInput placeholder={""} onChangeText={() =>{ }} defaultValue={""} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button  title="Save" color={Colors.primary} onPress={() =>{ }}/>

   
     </View>
     <Text></Text>
   </Card>
 
   <Card style={styles.card}>
     <Text></Text>
     <View style={styles.inputCom}>
     <TouchableHighlight onPress={()=>{}}>
     <View>
     <Ionicons  style={styles.icon}
             name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={23}
               color={Colors.primary}
             />
       <Text>hiii</Text>
     </View>
 </TouchableHighlight>
    

     <TitleText style={styles.nameAndPhone}>Word 3:</TitleText> 
     <TextInput placeholder={""} onChangeText={() =>{ }} defaultValue={""} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button  title="Save" color={Colors.primary} onPress={() =>{ }}/>

   
     </View>
     <Text></Text>
   </Card>
 
   </View>

 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  headline:{
    //   marginTop:10
      },
      cards:{  
       padding: 20,
       alignItems: 'center',
     },
     card:{  
       margin: 10,
       width: '95%'
   
     },
     nameAndPhone:{
       fontSize: 19,
       marginLeft:1,
     },
     inputCom:{
     paddingBottom:10,
     flexDirection: 'row',
     justifyContent: 'space-around' ,
     //width:200
     //  margin: 20
     },
     input:{  fontSize: 19, width:230},
     icon:{ marginLeft:20}
        
});
export default SafeWordsScreen;




{/* <View style={styles.container}> 
  <Text>Press the button and start speaking.</Text>
   <Button
       title={"Start Recognizing"}
       onPress={()=>{}}
    />
      <Text>Results:</Text>
  
     
    </View>
    
     </View>    */}