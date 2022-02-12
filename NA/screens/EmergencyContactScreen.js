import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import BodyText from '../components/UI/BodyText';
import TitleText from '../components/UI/TitleText';
import Card from '../components/UI/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/UI/Input';

import Colors from '../constants/Colors';
import * as Actions from "../actions/emergencyContact";
import { set } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';


const EmergencyContactScreen = props => {
  const [Data, setData] = useState("");
  const [name1, setName1] = useState("");
  const [name2,setName2 ] = useState("");
  const [name3, setName3] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const [userId, setUserId] = useState("");
  const updateData =()=>{
    if(name3=='')
    {
      setName3(Data.Name3)
    }
    if(name1=='')
    {
      setName1(Data.Name1)
    }
    if(name2=='')
    {
      setName2(Data.Name2)
    }
    if(phone1=='')
    {
      setPhone1(Data.Phone1)
    }
    if(phone2=='')
    {
      setPhone2(Data.Phone2)
    }
    if(phone3=='')
    {
      setPhone3(Data.Phone3)
    }
  }
  const getData = async ()=> {
    const userDatas =await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userDatas);
    const { token, userId, expiryDate } =  transformedData;
    setUserId(userId);
    setData(await Actions.getEmergencyContactFields(userId))
 
  };
  getData();
  
 return (
  <View style={styles.cards}>
  <Card style={styles.card}>
    <Text></Text>
    <View style={styles.inputCom}>
    <Ionicons  style={styles.icon}
            name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Name:</TitleText>
    <TextInput placeholder={Data.Name1} onChangeText={name1 => setName1(name1)} defaultValue={name1} style={styles.input}/>
    </View>
    <Text></Text>
    <View style={styles.inputCom}>
    <Ionicons style={styles.icon}
            name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Phone:</TitleText>
    <TextInput keyboardType="number-pad" placeholder={Data.Phone1} onChangeText={phone1 => setPhone1(phone1)} defaultValue={phone1} style={styles.input}/>
    </View>
    <Text></Text>
  </Card>

  <Card style={styles.card}>
    <Text></Text>
    <View style={styles.inputCom}>
    <Ionicons  style={styles.icon}
            name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Name:</TitleText> 
    <TextInput placeholder={Data.Name2} onChangeText={name2 => setName2(name2)} defaultValue={name2} style={styles.input}/>
    </View>
    <Text></Text>
    <View style={styles.inputCom}>
    <Ionicons style={styles.icon}
            name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Phone:</TitleText>
    <TextInput keyboardType="number-pad" placeholder={Data.Phone2} onChangeText={phone2 => setPhone2(phone2)} defaultValue={phone2} style={styles.input}/>
    </View>
    <Text></Text>
  </Card>

  <Card style={styles.card}>
    <Text></Text>
    <View style={styles.inputCom}>
    <Ionicons  style={styles.icon}
            name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Name:</TitleText>
    <TextInput placeholder={Data.Name3} onChangeText={name3 => setName3(name3)} defaultValue={name3} style={styles.input}/>
    </View>
    <Text></Text
    ><View style={styles.inputCom}>
    <Ionicons style={styles.icon}
            name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
              size={23}
              color={Colors.primary}
            />
    <TitleText style={styles.nameAndPhone}>Phone:</TitleText>
    <TextInput keyboardType="number-pad" placeholder={Data.Phone3} onChangeText={phone3 => setPhone3(phone3)} defaultValue={phone3} style={styles.input}/>
    </View>
    <Text></Text>
 
  </Card>
  <Button title="Save" color={Colors.primary} onPress={() =>{ 
  
    updateData();
    Actions.addEmergencyContactFields(userId,name1,name2,name3,phone1,phone2,phone3);
    getData();

                }
            
                }
                
              />
  </View>
 );
}
const styles = StyleSheet.create({
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
export const screenOptions = {
  headerTitle: 'Emergency Contact '
};
export default EmergencyContactScreen;
