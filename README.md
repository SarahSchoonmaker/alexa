A Voice Interactive Restaurant Reservation Service

Invocation Name: GetMeATable
```
{
"intents": [
{
"intent": "MakeReservation",
"slots": [
{
"name": "Restaurant",
"type": "SAMPLE_LIST"
},
{
"name": "Date",
"type": "AMAZON.DATE"
},
{
"name": "Cities",
"type": "AMAZON.US_CITY"
},
{
"name": "State",
"type": " LIST_OF_STATES"
},
{
"name": "Time",
"type": " LIST_OF_TIMES"
},

{
"name": "Party_number",
"type": "Number_OF_PEOPLE"
},
{
"intent": "DontKnowIntent"
},
{
"intent": "AMAZON.StartOverIntent"
},
{
"intent": "AMAZON.RepeatIntent"
},
{
"intent": "AMAZON.HelpIntent"
},
{
"intent": "AMAZON.YesIntent"
},
{
"intent": "AMAZON.NoIntent"
},
{
"intent": "AMAZON.StopIntent"
},
{
"intent": "AMAZON.CancelIntent"
}
]
},
{
"intent": "CompleteReservation"
}
]
}
```

On first use of the skill, provide phone number to validate account. 
```
Sample Utterances:
User: Alexa, get me a reservation.
Alexa: Ok, which city and state?
User: Seattle, Washington 
Alexa: Got it. Seattle, Washington. Which restaurant?
User: Lure Fish Bar
Alexa: Ok, Lure Fish Bar. How many people?
User: 4 people. 
Alexa Ok, 4 people. What date?
User: May 23rd
Alexa: Ok, May 23rd. What time?
User: 7pm
Alexa: Got it, 7pm 
Alexa: Your reservation is complete (Use MailGun to send email confirmation to user). 
```

```

Sample Utterances:

MakeReservationIntent a reservation

MakeReservationIntent get me a reservation

MakeReservationIntent make me a reservation

MakeReservationIntent make reservation

MakeReservationIntent make a reservation

Accessing Yelp's API:


```

I'm using this template: https://arian.io/how-to-use-yelps-api-with-node/ for accessing the Eat24 API, which is part of Yelp's reservation service. I have tokens already for Yelp's API, so added those to the template, but might need to generate new ones. 

```
/* require the modules needed */
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');

/* Function for yelp call
* ------------------------
* set_parameters: object with params to search
* callback: callback(error, response, body)
*/
var request_yelp = function(set_parameters, callback) {

/* The type of request */
var httpMethod = 'GET';

/* The url we are using for the request */
//This url accesses Yelp's main API, but I'm using Eat24's API for the reservation functionality. Here's Yelp's main API: 'http://api.yelp.com/v2/search'; 
var url = 'http://e24.io/r/5769?utm_campaign=public&utm_medium=yelpapi&utm_source=yelpapi';

/* We can setup default parameters here */
var default_parameters = {
location: 'New+York',
sort: '2'
};

/* We set the require parameters here */
var required_parameters = {
oauth_consumer_key : 'UMlQ9RNta0lYi9G91XAAdQ',
oauth_token : 'JwbdjODUgedHJoyKiEQCncxKYs8Mcr02',
oauth_nonce : n(),
oauth_timestamp : n().toString().substr(0,10),
oauth_signature_method : 'HMAC-SHA1',
oauth_version : '1.0'
};

/* We combine all the parameters in order of importance */ 
var parameters = _.assign(default_parameters, set_parameters, required_parameters);

/* We set our secrets here */
var consumerSecret = 'ej010L_-0xIF0FtzsrXUtJObM7k';
var tokenSecret = 'CH5Wg0Aki-gIvkHTOsqntlj-3D8';

/* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
/* Note: This signature is only good for 300 seconds after the oauth_timestamp */
var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

/* We add the signature to the list of paramters */
parameters.oauth_signature = signature;

/* Then we turn the paramters object, to a query string */
var paramURL = qs.stringify(parameters);

/* Add the query string to the url */
var apiURL = url+'http://e24.io/r/5769?utm_campaign=public&utm_medium=yelpapi&utm_source=yelpapi'+paramURL;

/* Then we use request to send make the API Request */
request(apiURL, function(error, response, body){
return callback(error, response, body);
});

};
```




