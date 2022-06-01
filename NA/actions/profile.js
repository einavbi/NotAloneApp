import { getStorage, ref, uploadBytes,uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';


export const profileFields = userId => {
  
    const tryprofileFields = async () => {
    let result
    const response = await fetch(
    `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const resData = await response.json()
    if (!response.ok) {
        console.log('Something went wrong!');
   
    }
    
    if(resData.image !== ''){
      const mDownloadUrl = await firebase.storage().ref().child("images/"+userId).getDownloadURL();
      result={
        ...resData,
        image:mDownloadUrl
        }
    }else{
    result=resData
    }
    return result
    }
    
    return tryprofileFields();

 };

 export const addProfileFields = async (userId, selectedImage) => {
      const respond = await fetch(selectedImage)
      const blob = await respond.blob();
      let ref = firebase.storage().ref().child("images/"+userId)
      ref.put(blob);
      try{
        const response =  fetch(
        `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
        {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image:selectedImage
        
              
        
           })
          }
        ); 
       }catch(error){
         throw new error;
       }
      
  }
  export const getProfileImage  = userId => {
    const getImage = async () => {
    // let ref = firebase.storage().ref().child("images/"+userId)
    const mDownloadUrl = await firebase.storage().ref().child("images/"+userId).getDownloadURL();
    // ref.getDownloadURL()
    
     return mDownloadUrl
    }
    return getImage();

}


 



