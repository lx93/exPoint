import React, { Component } from 'react';


const fetchBalance = async(qs) =>{
    try {
      let response = await fetch('https://ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress='+qs+'&address=0x25d677b8907619fa359f89945106c150391ee23d&tag=latest&apikey=YourApiKkmkmeyToken');
      let responseJson = await response.json();
      return responseJson.result;
    } catch (error) {console.error(error);}
  }


const fetchBBYBalance = async() => {
	var options = {
		"method": "POST",
		"headers": {
		"accept": "application/json, text/javascript, */*; q=0.01",
		"origin": "https://www.bestbuy.com",
		"x-user-interface": "DotCom-Optimized",
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
		"referer": "https://www.bestbuy.com/gift-card-balance",
		"accept-encoding": "gzip, deflate, br",
		"accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7",
		"cookie": "UID=824f1cf1-9c9f-4fce-838c-249063ca596a; abt949=b; physical_dma=560; oid=680751509; CTT=cc8a2b14a378b6878fd94aedbe02b4ae; SID=faf2c773-2c81-4e20-9204-1a0f64c82c8e; optimizelyProtocol=https; optimizelyEndUserId=oeu1523582216075r0.8803952465655869; vt=5baae0b5-3eb8-11e8-a623-0e89ee2c7f7e; AMCVS_F6301253512D2BDB0A490D45%40AdobeOrg=1; 52245=; s_vi=[CS]v1|2D6802850507D83C-60000112000014C9[CE]; context_id=5cd937ac-3eb8-11e8-9acb-0ed039a22ec8; context_session=5cd939d2-3eb8-11e8-a96a-0ed039a22ec8; s_cc=true; aam_uuid=75426687966854032744096435153892804519; customerZipCode=27707|Y; pst2=160; s_sq=%5B%5BB%5D%5D; DYN_USER_ID=ATG29192851243; DYN_USER_CONFIRM=669298ab97425bfa9952455ddcb7d80c; sc-location-v2=%7B%22meta%22%3A%7B%22CreatedAt%22%3A%222018-04-13T01%3A17%3A27.087Z%22%2C%22ModifiedAt%22%3A%222018-04-13T17%3A56%3A42.860Z%22%2C%22ExpiresAt%22%3A%222019-04-13T17%3A56%3A42.860Z%22%7D%2C%22value%22%3A%22%7B%5C%22physical%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2227514%5C%22%2C%5C%22source%5C%22%3A%5C%22A%5C%22%2C%5C%22captureTime%5C%22%3A%5C%222018-04-13T01%3A17%3A26.702Z%5C%22%7D%2C%5C%22store%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2227707%5C%22%2C%5C%22searchZipCode%5C%22%3A%5C%2227514%5C%22%2C%5C%22storeId%5C%22%3A%5C%22160%5C%22%7D%2C%5C%22destination%5C%22%3A%7B%5C%22zipCode%5C%22%3A%5C%2227514%5C%22%7D%7D%22%7D; AMCV_F6301253512D2BDB0A490D45%40AdobeOrg=2096510701%7CMCMID%7C70296653664024938643601723259196157573%7CMCAAMLH-1524187018%7C7%7CMCAAMB-1524247003%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1523649403s%7CNONE%7CMCAID%7C2D6802850507D83C-60000112000014C9%7CMCCIDH%7C-293578219%7CvVersion%7C2.0.0; c2=no%20value; bby_rdp=l; ak_bmsc=19838C340AF97AAA3EEF49C71635750B17C91FC5B13A00007D3CD25AEE53B02F~pltdWg3Q6jazPAlyx9i2+Q577jD+/Vb3h7HLbmr7JwgV1JPUq5+MDLfgYYi8k1jsBZB81NZ1CchFxbLZkusgse2blpJemKtVYre2bK10sBPNPNYxSZwZvvEIrn37aDUsr9Qb41c92S8b9psJa0xmywY15u+BLcrfu5y40HL0KT6rDz+DtTyCGs+IZnCtlNEgYL57zCcWWfpKSbwmUHsgf2BLwB6SlN4r724QQjH2LCI2M=",
		"content-type": "application/json",
		"cache-control": "no-cache",
		"postman-token": "0e69c5c7-3b11-387d-e0ab-878a8a46f090"},
		"body": JSON.stringify({ cardNumber: '6143055128391395', pin: '3953' }),
	};
	try {
		let response = await fetch('https://www.bestbuy.com/gift-card-balance/api/lookup',options);
		let responseJson = await response.text();
		alert(responseJson);
	} catch (error) {console.error(error);}
}

export {fetchBalance,fetchBBYBalance};