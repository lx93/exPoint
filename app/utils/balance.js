var toDollars = require ('display-cents')
var toCents = require ('dollars-to-cents');

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

      // converts cent to usd format
      for (var i=0; i<responseJson.balances.length; i++) {
        responseJson.balances[i].balance = toDollars(responseJson.balances[i].balance)
      }

      return(responseJson.balances)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


// export const updateBalance = async(uri,authToken,amount,balanceId) => {
//     var body = JSON.stringify({ "balanceId": balanceId, "value": toCents(amount)});
//     var options = { 
//       "method": 'PUT',
//       "headers": {
//          'Authorization': 'Bearer ' + authToken,
//          'Content-Type': 'application/json' 
//        },
//       "body": body,
//     };

//     try {
//       let response = await fetch(uri+'users/balances/',options);
//       let responseJson = await response.json();
//       console.log("updateBalance() sent the following to server: " + body)
//       console.log("updateBalance() gets the following message: " + responseJson.message)
//       return(balanceId)
//     } catch (error) {
//       console.error(error);
//       alert('cannot connect to server');
//       return;
//     }
// }

export const createBalance = async(uri,authToken,stripeToken,amount,merchantId) => {
    var body = JSON.stringify({'merchantId': merchantId, 'amount':toCents(amount), 'stripeToken':stripeToken});
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
        alert('updateBalance happens on serverside now. this shouldnt happen.')
        alert('This store is already in your wallet!')
      }

      if (response.status === 422) {
        alert('422 error')
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