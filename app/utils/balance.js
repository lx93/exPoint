export const getOwnedBalanceIDs = async(uri,authToken) => {
    var options = { 
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
    };
    try {
      let response = await fetch(uri+'users/balances/',options);
      console.log('getOwnedBalanceIDs() has got a response from /users/balances');
      let responseJson = await response.json();
      console.log('getOwnedBalanceIDs() got this back from server: ');
      console.log(responseJson.balances);
      return(responseJson.balances)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


export const updateBalance = async(uri,authToken,amount,balanceId) => {
    var body = JSON.stringify({ "balanceId": balanceId, "value": parseFloat(amount).toFixed(2).toString()});
    var options = { 
      "method": 'PUT',
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": body,
    };

    try {
      let response = await fetch(uri+'merchants/balances/',options);
      let responseJson = await response.json();
      console.log("updateBalance() sent the following to server: " + body)
      console.log("updateBalance() gets the following message: " + responseJson.message)
      return(balanceId)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}

export const createBalance = async(uri,authToken,merchantId) => {
    var body = JSON.stringify({"merchantId": merchantId});
    var options = { 
      "method": 'POST', 
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": body,
    };

    try {
      let response = await fetch(uri+'users/balances/',options);
      let responseJson = await response.json();
      console.log("createBalance() sent the following to server: " + body)
      console.log("createBalance() gets the following message: " + responseJson.message)

      // check if the balanceId already exists for this phone number. if it does, call updateBalance() instead
      if (response.status === 409) {
        alert('This store is already in your wallet!')
      }
      
      if (response.status === 201) {
        console.log('createBalance() successful!');
        return (responseJson.balanceId);
      }


    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}