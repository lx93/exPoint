export const sendSMS = async(uri,dst,text) => {
    var options = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "body": JSON.stringify({dst: dst, text: text })
    };

    try {
      let response = await fetch(uri+"messaging/",options);
      let responseJson = await response.text();
      alert(responseJson);
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


export const smsGenerator = (giftValue,phoneNumber,merchantName,balanceId) => {
    var content = "You have just received a $" + giftValue + " giftcard from " + merchantName + "! \n https://api.pointup.io/qr/" + balanceId
    console.log ("the following SMS has been sent to: " + phoneNumber + '! ' + content)
    return (content)
}