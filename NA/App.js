import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'expo-dev-client'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import firebaseConfig from './firebaseConfig.tsx';
import { initializeApp  } from 'firebase/app';
import * as firebase from 'firebase';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);



import authReducer from './reducers/auth';
import AppNavigator from './navigation/AppNavigator';
firebase.initializeApp(firebaseConfig)
const rootReducer = combineReducers({


  auth: authReducer
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
