import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import EmergencyContactScreen from '../screens/EmergencyContactScreen'
import MapScreen from '../screens/MapScreen';
import profileScreen, {
  screenOptions as profileScreenOptions
} from '../screens/profileScreen';
import AddContactScreen from '../screens/user/AddContactScreen';
import SafeWordsScreen from '../screens/SafeWordsScreen';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import * as authActions from '../actions/auth';
import SignupScreen, { screenOptions as signupScreenOptions } from '../screens/user/SignupScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="Map"
        component={MapScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};


const OrdersStackNavigator = createStackNavigator();
export const EmergencyNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Emergency contacts"
        component={EmergencyContactScreen}
     
      />
    </OrdersStackNavigator.Navigator>
  );
};


const SafeWordsStackNavigator = createStackNavigator();
export const SafeWordsNavigator = () => {
  return (
    <SafeWordsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SafeWordsStackNavigator.Screen
        name="Safe Words"
        component={SafeWordsScreen}
     
      />
    </SafeWordsStackNavigator.Navigator>
  );
};

const profileStackNavigator = createStackNavigator();
export const profileNavigator = () => {
  return (
    <profileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <profileStackNavigator.Screen
        name="profile"
        component={profileScreen}
        options={profileScreenOptions}
      />
    </profileStackNavigator.Navigator>
  );
};


const DrawerNavigator = createDrawerNavigator();
export const Navigator = () => {
  const dispatch = useDispatch();
  return (
    <DrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
               
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <DrawerNavigator.Screen
        name="Map"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'ios-map-outline' : 'ios-map'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <DrawerNavigator.Screen
        name="Emergency Contacts"
        component={EmergencyNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
            name={Platform.OS === 'android' ? 'ios-call-outline' : 'ios-call'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
        <DrawerNavigator.Screen
        name="safe words"
        component={SafeWordsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
            name={Platform.OS === 'android' ? 'ios-mic-outline' : 'ios-mic'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <DrawerNavigator.Screen
        name="Profile"
        component={profileNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </DrawerNavigator.Navigator>
  );
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />      
      <AuthStackNavigator.Screen
      name="SignUp"
      component={SignupScreen}
      options={signupScreenOptions}
    />

    </AuthStackNavigator.Navigator>
  );
};


