// update the state of user using authToken
export const getUserInfo = async(authToken) => {
    var options = {
      "method": "GET",
      "headers": {
        "authorization": "Bearer " + authToken,
        "content-type": "application/json"
    	}
	}
	try {
		let response = await fetch('https://api.pointup.io/users/',options);

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
export const getToken = async(u,p) => {
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
		let response = await fetch('https://api.pointup.io/users/login',options);
		let responseJson = await response.json();
		return responseJson.token;
	} catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


export const signup = async(u,p) => {
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
		let response = await fetch('https://api.pointup.io/users/signup',options);

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



// manages the facebook login, gets back a facebook token
export const fbLogin = async() => {
	const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
	  "153479025515649",
	  {
	    permissions: ['email','user_birthday']
	  }
	);
	if (type === "success") {
	  console.log(token);
	} else {
	  console.log('your papa fucked your ass and fb done fucked up')
	}
}