export const addEmergencyContactFields = (userId,name1,name2,name3,phone1,phone2,phone3) => {
    
    let Data=getEmergencyContactFields(userId)
    if (name3==''){name3=Data.Name3}
    if (name1==''){name1=Data.Name1}
    if (name2==''){name2=Data.Name2}
    if (phone1==''){phone1=Data.Phone1}
    if (phone2==''){phone2=Data.Phone2}
    if (phone3==''){phone3=Data.Phone3}
    const response =  fetch(
    `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/emergency.json`,
    {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name1:name1,
          Name2:name2,
          Name3:name3,
          Phone1:phone1,
          Phone2:phone2,
          Phone3:phone3
      
       })
      }
    );  
 };


export const getEmergencyContactFields = userId => {
  
  const tryFields = async () => {
  const response = await fetch(
  `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/emergency.json`,
  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const resData = await response.json()
//  alert(resData.email)
  if (!response.ok) {
      console.log('Something went wrong!');
 
  }
  return resData
  }
  
  return tryFields();

};

