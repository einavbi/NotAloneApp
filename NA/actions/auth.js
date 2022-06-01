
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { profileFields } from '../actions/profile';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password,firstName,lastName,phone) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNnJDhz6Yu_VU3f8DZIYYdF6_RNc1e3II',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
 
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
   
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    signupFields(email,firstName,lastName,phone, resData.localId)
   

  };
};
export const signupFields = (email,firstName,lastName,phone,userId) => {


 const response = fetch(

 `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
 {
     method: 'PATCH',
      headers: {
         'Content-Type': 'application/json'
       },
     body: JSON.stringify({
          email:email,
          firstName:firstName,
          lastName:lastName,
          phone:phone,
          emergency:{
          Name1:"",
          Name2:"",
          Name3:"",
          Phone1:"",
          Phone2:"",
          Phone3:""

          
          },
          safeWords:{
          Word1:"",
          Word2:"",
          Word3:""
          },
          sosFlag: false,
          image:""
       })
    });
  
    if (!response.ok) {
      const errorResData =  response.json();
      const errorId = errorResData.error.message;
     let message = 'Something went wrong!';
    if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
       throw new Error(message);
    }
  
     const resData =  response.json();
     console.log(resData);
  

};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNnJDhz6Yu_VU3f8DZIYYdF6_RNc1e3II',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
 // Facebook.logOutAsync()
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
  
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};


export const getUsersData = () => {
  
  const tryFields = async () => {
    const response = await fetch(
  `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`,
  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const resData = response.json()
  
  if (!response.ok) {
      console.log('Something went wrong!');
 
    }
    return resData
    }
    
    return tryFields();
  
  };

    export const facebookLogin =  (token) => {
    
      saveDataToStorage(token, null, null);
    
    };

    