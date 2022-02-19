export const addSafeWords = (userId,word1=null,word2=null,word3=null) => {
    
    let Data=getSafeWords(userId)
    if (word1==null){name3=Data.Word1}
    if (word2==null){name1=Data.Word2}
    if (word3==null){name2=Data.Word3}

    const response =  fetch(
    `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/safeWords.json`,
    {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Word1:word1,
          Word2:word2,
          Word3:word3
    
       })
      }
    );  
 };


export const getSafeWords = userId => {
  
  const tryFields = async () => {
  const response = await fetch(
  `https://notaloneapp-9aecd-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/safeWords.json`,
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

