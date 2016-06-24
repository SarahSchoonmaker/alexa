/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Web service: communicate with an external web service to get events for specified days in history (Wikipedia API)
 * - Pagination: after obtaining a list of events, read a small subset of events and wait for user prompt to read the next subset of events by maintaining session state
 * - Dialog and Session state: Handles two models, both a one-shot ask and tell model, and a multi-turn dialog model.
 * - SSML: Using SSML tags to control how Alexa renders the text-to-speech.
 *
 * Examples:
 * One-shot model:
 * User:  "Alexa, ask History Buff what happened on August thirtieth."
 * Alexa: "For August thirtieth, in 2003, [...] . Wanna go deeper in history?"
 * User: "No."
 * Alexa: "Good bye!"
 *
 * Dialog model:
 * User:  "Alexa, open History Buff"
 * Alexa: "History Buff. What day do you want events for?"
 * User:  "August thirtieth."
 * Alexa: "For August thirtieth, in 2003, [...] . Wanna go deeper in history?"
 * User:  "Yes."
 * Alexa: "In 1995, Bosnian war [...] . Wanna go deeper in history?"
 * User: "No."
 * Alexa: "Good bye!"
 */


/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.fb7d0d80-1f56-4551-9f5b-da0bda711437';

var https = require('https');

/**
 * The AlexaSkill Module that has the AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * URL prefix to download history content from Wikipedia
 */
var apiEndPoint = 'https://api.indiegogo.com/1.1/search/campaigns.json?api_token=96fff3a8e1d76972efe9d8a7b08f805b4506980bd66b37a7d214a63b280f5314&sort=popular_all';

/**
 * Variable defining number of events to be read at one time
 */
var paginationSize = 3;

/**
 * Variable defining the length of the delimiter between events
 */
var delimiterSize = 2;

/**
 * HistoryBuffSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var IndieGogoSearch = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
IndieGogoSearch.prototype = Object.create(AlexaSkill.prototype);
IndieGogoSearch.prototype.constructor = IndieGogoSearch;

IndieGogoSearch.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("IndieGogoSearch onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
};

IndieGogoSearch.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("IndieGogoSearch onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

IndieGogoSearch.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};

IndieGogoSearch.prototype.intentHandlers = {

    "SearchIndieGogo": function (intent, session, response) {
        handleFirstEventRequest(intent, session, response);
    },

    "GetNextEventIntent": function (intent, session, response) {
        handleNextEventRequest(intent, session, response);
    },

    "AMAZON.YesIntent": function (intent, session, response) {
        handleNextEventRequest(intent, session, response);
    },

    "AMAZON.NoIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Goodbye",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "With IndieGogo Search, you can discover the most popular trending products listed at IndieGogo." +
            "For example, you could say top trending for today, or you can say exit.";
        var repromptText = "which option would you like?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Goodbye",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = {
                speech: "Goodbye",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tell(speechOutput);
    }
};

/**
 * Function to handle the onLaunch skill behavior
 */

function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var cardTitle = "Today at IndieGogo";
    var repromptText = "With IndieGogo Search, you can discover the most popular trending products listed at IndieGogo.  " +
            "For example, you could say top trending for today, or you can say exit.";
    var speechText = "<p>IndieGogoSearch.</p> <p>What are the top products today?</p>";
    var cardOutput = "IndieGogoSearch. Would you like a list of top products for today?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.

    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardOutput);
}

/**
 * Gets a poster prepares the speech to reply to the user.
 */

function handleFirstEventRequest(intent, session, response) {
    //var daySlot = intent.slots.day;
    var repromptText = "With IndieGogoSearch, you can get today's most popular inventions. For example, you could say today's products, or tell me today's IndieGogo products.";
    // var monthNames = ["January", "February", "March", "April", "May", "June",
    //                   "July", "August", "September", "October", "November", "December"
    // ];
    var sessionAttributes = {};
    // Read the first 3 events, then set the count to 3
    sessionAttributes.index = paginationSize;
    // var date = "";

    // If the user provides a date, then use that, otherwise use today
    // The date is in server time, not in the user's time zone. So "today" for the user may actually be tomorrow
    // if (daySlot && daySlot.value) {
    //     date = new Date(daySlot.value);
    // } else {
    //     date = new Date();
    // }

    // var prefixContent = "<p>For " + monthNames[date.getMonth()] + " " + date.getDate() + ", </p>";
    // var cardContent = "For " + monthNames[date.getMonth()] + " " + date.getDate() + ", ";

    // var cardTitle = "Events on " + monthNames[date.getMonth()] + " " + date.getDate();

    getJsonEventsFromIndieGogoSearch(response, function (campaigns, response) {
        var speechText = "",
            i;
        // sessionAttributes.text = events;
        // session.attributes = sessionAttributes;
        if (campaigns.length == 0) {
            console.log("campaigns.length == 0: TRUE")
            speechText = "There is a problem connecting to IndieGogo at this time. Please try again later.";
            cardContent = speechText;
            response.tell(speechText);
        } else {
            for (i = 0; i < paginationSize; i++) {
                //cardContent = cardContent + events[i] + " ";
                speechText =  speechText + "<p>" +  campaigns["response"][i]["title"] + ", has " + campaigns["response"][i]["contributions_count"] + " contributors to date, and raised " + campaigns["response"][i]["currency"]["symbol"] + campaigns["response"][i]["collected_funds"] + ".</p>";
            }
            speechText = "<p>Here are the top 3 projects from IndieGogo today.</p>" + speechText + " <p>Want to get more top products at IndieGogo?</p>";
            console.log("speechText: " + speechText);
            var speechOutput = {
                speech: "<speak>" + speechText + "</speak>",
                type: AlexaSkill.speechOutputType.SSML
            };
            var repromptOutput = {
                speech: repromptText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            console.log("about to call response.ask - " + speechOutput + " - " + repromptOutput);
            response.ask(speechOutput, repromptOutput);
            //response.askWithCard(speechOutput, repromptOutput, cardTitle, cardContent);
        }
    });
}


/**
 * Gets a poster prepares the speech to reply to the user.
 */
function handleNextEventRequest(intent, session, response) {
    var cardTitle = "More top products at Indie Gogo",
        sessionAttributes = session.attributes,
        result = sessionAttributes.text,
        speechText = "",
        cardContent = "",
        repromptText = "Do you want a list of more top products?",
        i;
    if (!result) {
        speechText = "";
        cardContent = speechText;
    } else if (sessionAttributes.index >= result.length) {
        speechText = "There are no more products to list for today. Try again tomorrow";
        cardContent = "There are no more products to list for today. Try again tomorrow";
    } else {
        for (i = 0; i < paginationSize; i++) {
            if (sessionAttributes.index>= result.length) {
                break;
            }
            speechText = speechText + "<p>" + result[sessionAttributes.index] + "</p> ";
            cardContent = cardContent + result[sessionAttributes.index] + " ";
            sessionAttributes.index++;
        }
        if (sessionAttributes.index < result.length) {
            speechText = speechText + " Do you want a list of more top products?";
            cardContent = cardContent + " Do you want a list of more top products?";
        }
    }
    var speechOutput = {
        speech: "<speak>Here are the next top 3 projects from IndieGogo today.</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, cardTitle, cardContent);
}

function getJsonEventsFromIndieGogoSearch(response, eventCallback) {
    //var url = urlPrefix + day + '_' + date;


    https.get(apiEndPoint, function(res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            console.log("body:" + body);
            var stringResult = JSON.parse(body);
            //console.log("stringResult:" + stringResult);
            eventCallback(stringResult, response);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}


// function parseJson(inputText) {
//     // sizeOf (/nEvents/n) is 10
//     var text = inputText.substring(inputText.indexOf("\\nEvents\\n")+10, inputText.indexOf("\\n\\n\\nBirths")),
//         retArr = [],
//         retString = "",
//         endIndex,
//         startIndex = 0;

//     if (text.length == 0) {
//         return retArr;
//     }

//     while(true) {
//         endIndex = text.indexOf("\\n", startIndex+delimiterSize);
//         var eventText = (endIndex == -1 ? text.substring(startIndex) : text.substring(startIndex, endIndex));
//         // replace dashes returned in text from Wikipedia's API
//         eventText = eventText.replace(/\\u2013\s*/g, '');
//         // add comma after year so Alexa pauses before continuing with the sentence
//         eventText = eventText.replace(/(^\d+)/,'$1,');
//         eventText = 'In ' + eventText;
//         startIndex = endIndex+delimiterSize;
//         retArr.push(eventText);
//         if (endIndex == -1) {
//             break;
//         }
//     }
//     if (retString != "") {
//         retArr.push(retString);
//     }
//     retArr.reverse();
//     return retArr;
// }

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the IndieGogoSearch Skill.
    var skill = new IndieGogoSearch();
    skill.execute(event, context);
};
