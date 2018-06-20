export const getAllMerchants = async(authToken) => {
    var options = { 
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
    };
    try {
      let response = await fetch('https://api.pointup.io/users/merchants/',options);
      console.log('getAllMerchants() has got a response from /users/merchants');
      let responseJson = await response.json();
      console.log('getAllMerchants() got this back from server: ');
      console.log(responseJson.merchants);
      return(responseJson.merchants)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}
