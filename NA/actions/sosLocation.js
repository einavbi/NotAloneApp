import moment from "moment";
import * as firebase from 'firebase';

export const getSosLocationsHistory = async (userId) => {
  
   
    const response = await fetch(
    `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/sosLocationHistory.json`,
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
    return resData
    
  };

export const changeSOSflag = (userId,flag) => {
    
    try{
    const response =  fetch(
    `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
    {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sosFlag:flag
          
    
       })
      }
    ); 
   }catch(error){
     throw new error;
   }
 };

export const saveSOSlocation = (userId,lon,lat) => {
    //create date
  let today = moment(new Date()).format("YYYY-MM-DD, h:mm:ss a")
  try{
  const response =  fetch(
  `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/SOSlocationsHistory/${today}.json`,
  {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Lon:lon,
        Lat:lat
        
  
     })
    }
  ); 
 }catch(error){
   throw new error;
 }
};


export const getUsersData = async () => {
    const response = await fetch(
      `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`,
      {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  const resData = await response.json()
//  alert(resData.email)
  let array=[];
  for( const pro in resData){
    let obj = {
      user_id : pro,
      firstName :resData[pro].firstName,
      lastName :resData[pro].lastName,
      phone : resData[pro].phone,
      sosFlag : resData[pro].sosFlag,
      email : resData[pro].email,
      image : resData[pro].image,
      emergency : resData[pro].emergency,
      safeWords : resData[pro].safeWords,
      SOSlocationsHistory: resData[pro].SOSlocationsHistory

    }
    if(obj.image !== ''){
      const mDownloadUrl = await firebase.storage().ref().child("images/"+obj.user_id).getDownloadURL();
      obj.image=mDownloadUrl
     
    }
    array.push(obj)
  }
  // console.log(resData)
  if (!response.ok) {
      console.log('Something went wrong!');
 
  }
  return array;
  
  

};

