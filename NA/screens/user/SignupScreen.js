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

const SignupScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navHandler = () => {
    props.navigation.navigate('AddContact');
  };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      firstName:'',
      lastName:'',
      phone:'',
      repassword:''

    },
    inputValidities: {
      email: false,
      password: false,
      firstName:false,
      lastName:false,
      phone:false,
      repassword:false
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
    
   //to do
       action=authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.phone
         
      );
      
    
    }
    setError(null);
    setIsLoading(true);
    

    if ( formState.inputValues.password== formState.inputValues.repassword){
    try {
      await dispatch(action);

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }}   else{
      Alert.alert('The password entered for the first time is different from the second');
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
              id="firstName"
              label="First Name"
              required
              autoCapitalize="none"
              errorText="Please enter your name."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
              <Input
              id="lastName"
              label="Last Name"
              required
              autoCapitalize="none"
              errorText="Please enter your last name."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
               <Input
              id="phone"
              label="Phone"
             keyboardType="number-pad"
              required
              autoCapitalize="none"
              errorText="Please enter your last name."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
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
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
             <Input
              id="repassword"
              label="Renter Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
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
                  title= 'Sign Up' 
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
          
        
          </ScrollView>
        </Card>
      </LinearGradient>
      

    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: 'sign up'
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
    maxHeight: 550,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default SignupScreen;
