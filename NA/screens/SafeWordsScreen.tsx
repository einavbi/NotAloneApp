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
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Actions from "../actions/safeWords";
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";

const SafeWordsScreen = props => {
  const [Data, setData] = useState({
    Word1:"",
    Word2:"",
    Word3:""
  });
  const [userId, setUserId] = useState("");
  const [word1, setWord1] = useState("");
  const [word2,setWord2 ] = useState("");
  const [word3, setWord3] = useState("");
  const [recordFlag1, setRecordFlag1] = useState(false);
  const [recordFlag2, setRecordFlag2] = useState(false);
  const [recordFlag3, setRecordFlag3] = useState(false);
  const updateData =()=>{
    if(word1=='')
    {
      setWord1(Data.Word1)
    }
    if(word2=='')
    {
      setWord2(Data.Word2)
    }
    if(word3=='')
    {
      setWord3(Data.Word3)
    }

  }
  const getData = async ()=> {
    const userDatas =await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userDatas);
    const { token, userId, expiryDate } =  transformedData;
    setUserId(userId);
    setData(await Actions.getSafeWords(userId))
 
  };
  getData();
  const startRecord1 = async () => {
    setRecordFlag1(true);
  }
  const startRecord2 = async () => {
    setRecordFlag2(true);
  }
  const startRecord3 = async () => {
    setRecordFlag3(true);
  }
  const stopRecord1 = async () => {
    setRecordFlag1(false);
  }
  const stopRecord2 = async () => {
    setRecordFlag2(false);
  }

  const stopRecord3 = async () => {
    setRecordFlag3(false);
  }
  const [results, setResults] = useState([] as string[]);
  const [isListening, setIsListening] = useState(false);

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
     <TouchableHighlight underlayColor="#DDDDDD" onPress={() =>{recordFlag1=== false? startRecord1(): stopRecord1()}}>
     <View>
     <Ionicons  style={styles.icon}
             name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={30}
               color={recordFlag1 ===false ? Colors.primary : Colors.accent}
             />
     </View>
 </TouchableHighlight>
    

     <TitleText style={styles.wordContainer}>  Word 1:  </TitleText> 
     <TextInput placeholder={Data.Word1} onChangeText={word1 => setWord1(word1)} defaultValue={word1} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button  title="Save" color={Colors.primary} onPress={() =>{  updateData();
    Actions.addSafeWords(userId,word1,word2,word3);
    getData();}}/>

   
     </View>
     <Text></Text>
   </Card>
 
   <Card style={styles.card}>
     <Text></Text>
     <View style={styles.inputCom}>
     <TouchableHighlight underlayColor="#DDDDDD" onPress={() =>{recordFlag2=== false? startRecord2(): stopRecord2()}}>
     <View>
     <Ionicons  style={styles.icon}
             name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={30}
               color={recordFlag2 ===false ? Colors.primary : Colors.accent}
             />
     </View>
 </TouchableHighlight>
    

     <TitleText style={styles.wordContainer}>  Word 2:  </TitleText> 
     <TextInput placeholder={Data.Word2} onChangeText={word2 => setWord2(word2)} defaultValue={word2} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button  title="Save" color={Colors.primary} onPress={() =>{  updateData();
    Actions.addSafeWords(userId,word1,word2,word3);
    getData();}}/>

   
     </View>
     <Text></Text>
   </Card>
 
   <Card style={styles.card}>
     <Text></Text>
     <View style={styles.inputCom}>
     <TouchableHighlight underlayColor="#DDDDDD" onPress={() =>{recordFlag3=== false? startRecord3(): stopRecord3()}}>
     <View>
     <Ionicons  style={styles.icon}
             name={Platform.OS === 'android' ? 'md-mic' : 'ios-mic'}
               size={30}
               color={recordFlag3 ===false ? Colors.primary : Colors.accent}
             />
     </View>
 </TouchableHighlight>
    

     <TitleText style={styles.wordContainer}>  Word 3:  </TitleText> 
     <TextInput placeholder={Data.Word3} onChangeText={word3 => setWord3(word3)} defaultValue={word3} style={styles.input}/>
     </View>
     <Text></Text>
     <View style={styles.inputCom}>
     <Button title="Save" color={Colors.primary} onPress={() =>{  updateData();
    Actions.addSafeWords(userId,word1,word2,word3);
    getData();}}/>

   
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
     wordContainer:{
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
     input:{  fontSize: 19, width: 230},
     icon:{ marginLeft: 21}
      
});
export default SafeWordsScreen;



