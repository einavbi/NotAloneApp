import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../actions/auth';
import * as Facebook from 'expo-facebook';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [facebookflag, setFacebookflag] = useState(false);
  const dispatch = useDispatch();
  const navHandler = () => {
    props.navigation.navigate('SignUp');
  };
  const navHandlerMap = () => {
    props.navigation.navigate('SignUp');
  };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
       
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  // async function facebookLogIn() {
  //   //  Facebook.logOutAsync()
  //     try {
  //       await Facebook.initializeAsync({
  //         appId: '3312891855634260',
  //       });
  //       const { type, token, expirationDate, permissions, declinedPermissions } =
  //         await Facebook.logInWithReadPermissionsAsync({
  //           permissions: ['public_profile', 'email'],
  //         });
  //       if (type === 'success') {
  //         // Get the user's name using Facebook's Graph API
  //         const response = await fetch(`https://graph.facebook.com/me/?access_token=${token}&fields=email,name`)
  
  //         //test if exist 
        
  
  //         let email=(await response.json()).email
  //         let usersData= await authActions.getUsersData();
  //         for (const key in usersData) {
  //           if(usersData[key].email===email){
            
  //             setFacebookflag(true);
  //             //
              
  //             //authActions.facebookLogin(token); 
              
  //           }
           
              
  //           }
  //          if (facebookflag==true){
             
  //           Alert.alert('WELCOME!', `Hi ${email}!`);
  //           }
  //            else{
  //            Alert.alert('You are not registered to NotAlone Please register first');
  //          //   navHandler()

  //           }
  //       } else {
  //         // type === 'cancel'
  //       }
  //     } catch ({ message }) {
  //       alert(`Facebook Login Error: ${message}`);
  //     }
  //   }




  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>

              {/* <Button 
                title="Facebook logIn"
                onPress={facebookLogIn}
                /> */}
              </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={navHandler}
              />
      
            </View>
        
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
export const screenOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
