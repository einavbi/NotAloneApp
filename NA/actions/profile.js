
export const profileFields = userId => {
  
    const tryprofileFields = async () => {
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
    return resData
    }
    
    return tryprofileFields();

 };


 