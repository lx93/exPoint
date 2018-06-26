// update the state of user using authToken
export const getUserInfo = async(uri,authToken) => {
    var options = {
      "method": "GET",
      "headers": {
        "authorization": "Bearer " + authToken,
        "content-type": "application/json"
    	}
	}
	try {
		let response = await fetch(uri+'users/',options);

		if (response.status === 401){
			alert('Wrong login credentials. Please try again.')
			return false;
		}

		let responseJson = await response.json();
		console.log('getUserInfo() successfully')
		return responseJson;

	} catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}

// send over the username and password to server to retrieve an authToken
export const getToken = async(uri,u,p) => {
	console.log('username is: '+u+' password is: '+p)
    var options = {
    	"method": "POST",
    	"headers": {
    		"content-type": "application/json"
    	},
    	"body": JSON.stringify({
    		"phone": u,
    		"password": p,
    	}),
    };

	try {
		let response = await fetch(uri+'users/login',options);
		let responseJson = await response.json();
		return responseJson.token;
	} catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


export const signup = async(uri,u,p) => {
	console.log('username is: '+u+' password is: '+p)
    var options = {
    	"method": "POST",
    	"headers": {
    		"content-type": "application/json"
    	},
    	"body": JSON.stringify({
    		"phone": u,
    		"password": p,
    	}),
    };

	try {
		let response = await fetch(uri+'users/signup',options);

		if (response.status === 409){
			console.log('409 Conflict. User may already exist.');
			alert('409 Conflict. User may already exist.');
			return false;
		}

		let responseJson = await response.json();

		console.log(responseJson);
		alert(JSON.stringify(responseJson));

		return responseJson.token;

	} catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}



// get a facebook token
export const getFbToken = async() => {
	const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
	  "153479025515649",
	  {
	    permissions: ['email','user_birthday']
	  }
	);
	if (type === "success") {
      console.log('Received facebook token, here it is: ')
	  console.log(token);
	  return token;
	} else {
	  console.log('your papa fucked your ass and fb done fucked up')
	}
}



// login with fbtoken
export const fbAuth = async(uri,fbtoken,phone,verifyCode) => {
	var options = {
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		"body": JSON.stringify({
			"accessToken": fbtoken,
			"phone": phone,
			"code":verifyCode
		}),
	};

	try {
		let response = await fetch(uri+'users/fbauth',options);
		let responseJson = await response.json();
		if (response.status === 201){
			console.log('users/fbauth is returning the following: '+JSON.stringify(responseJson));
			return responseJson.token;			
		}
		if (response.status === 202){
			console.log('users/fbauth is returning the following: '+JSON.stringify(responseJson));
			return undefined;
		}
		if (response.status === 401){
			console.log('users/fbauth is returning the following: '+JSON.stringify(responseJson));
			alert ('Wrong verification code. Try again.')
			return undefined;	
		}
	} catch (error) {
	  console.error(error);
	  alert('cannot connect to server');
	  return;
	}
}


// SMS verify call
export const sendVerifySMS = async(uri,phone) => {
	var options = {
		"method": "POST",
		"headers": {
			"content-type": "application/json"
		},
		"body": JSON.stringify({
			"phone": phone,
		}),
	};

	try {
		let response = await fetch(uri+'users/verify',options);
		let responseJson = await response.json();
		if (response.status === 201){
			console.log('users/verify is returning the following: '+JSON.stringify(responseJson));
			return true;			
		}
		else {
			console.log('users/verify is returning the following: '+JSON.stringify(responseJson));
			alert('sendVerifySMS failed')
			return false;
		}
	} catch (error) {
	  console.error(error);
	  alert('cannot connect to server');
	  return;
	}
}

