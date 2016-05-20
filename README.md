A Voice Interactive Restaurant Reservation Service

Invocation Name: GetMeATable

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


On first use of the skill, provide phone number to validate account. 

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


Sample Utterances:
MakeReservationIntent a reservation
MakeReservationIntent get me a reservation
MakeReservationIntent make me a reservation
MakeReservationIntent make reservation
MakeReservationIntent make a reservation

Accessing Yelp's API:

I'm using this template: https://arian.io/how-to-use-yelps-api-with-node/
See yelpdata.js. I have tokens already for Yelp's API, so added those to the template, but might need to generate new ones. 





