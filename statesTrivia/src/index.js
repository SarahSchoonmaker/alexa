/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "The Adirondack Mountains are located in northern New York between what two lakes?": [   
            "Lake Champlain and Lake Ontario",
            "Lake Champlain and Lake George",
            "Lake George and Saranac Lake",
            "Lake Huron and Lake Erie"
        ]
    },
    {
        "When did Maine become a state of the United States of America?": [
            "March fifteenth eighteen twenty",
            "May fourteenth seventeen eighty six", 
            "July eleventh seventeen ninty two",
            "December sixteenth eighteen ten"
            ]
    },

    {
        "The final episode of ‘The Sopranos’ was filmed at this popular New Jersey ice cream parlor": [
            "Holsten’s in Bloomfield",
            "Halo Pub in Princeton",
            "Ice Cream on nine in Howell",
            "Applegate Farm in Montclair"
        ]
    },
    {
        "What is the official state flower of New Hampshire?": [
            "The official state flower is Purple Lilac",
            "The official state flower is Native Violet",
            "The official state flower is Mountain Laurel",
            "The official state flower is Silk Daisy"
        ]
    },
    {
        "Which ocean is to the east of Massachusetts?": [
            "Atlantic",
            "Pacific",
            "Indian",
            "Antarctic"
        ]
    },
    {
        "What is the capital city of Rhode Island?": [
            "The capital is Providence",
            "The capital is Narragansett",
            "The capital is Newport",
            "The capital is Warwick"
        ]
    },
    {
        "Which is Ohio’s state tree?": [
            "Buckeye tree",
            "Oak tree",
            "Pine tree",
            "Apple tree"
        ]
    },
    {
        "What is the largest city in Indiana?": [
            "The largest city is Indianapolis",
            "The largest city is Fort Wayne",
            "The largest city is Muncie",
            "The largest city is Evansville"
        ]
    },
    {
        "Although it is no longer as important as it was previously, this industry remains the most vital part of Michigan's economy": [
            "The important industry is Automotive and Manufacturing",
            "The important industry is Agriculture",
            "The important industry is Tourism",
            "The important industry is Financial Services"
        ]
    },
    {
        "What is the motto of Virginia?": [
            "Sic semper tyrannis",
            "The motto is Semper idem",
            "The motto is God, union, liberty",
            "Peace and justice"
        ]
    },
    {
        "What do the two men depicted on West Virginia's seal and the state flag represent?": [
            "Agriculture and mining",
            "Native Americans and European Settlers",
            "Separation of Church and State",
            "Exploration and farming"
        ]
    },
    {
        "North Carolina is known by two nicknames. The more popular one is Tar Heel State; what is the less popular nickname?": [
            "Old North",
            "Glory North",
            "Ocean State",
            "Palmetto State"
        ]
    },
    {
        "Who designed the World War two Memorial in Washington D C?": [
            "Friedrich Saint Florian",
            "Frank Gaylord",
            "Rudolph Evans",
            "Felix De Weldon"
        ]
    },
    {
        "What is the motto of Vermont?": [
            "Freedom and unity",
            "God, union, liberty",
            "To each his own",
            "All for fatherland"
        ]
    },
    {
        "What United States President was born in South Carolina?": [
            "Andrew Jackson",
            "James Abram Garfield",
            "James Buchanan",
            "Warren Harding"
        ]
    },
    {
        "What is the official floral emblem of Maryland?": [
            "Black-eyed Susan",
            "Common Sunflower",
            "Goldenrod",
            "Aster"
        ]
    },
    {
        "What is Pennsylvania known as?": [
            "The Keystone State",
            "The Natural State",
            "The Constitution State",
            "The Independence State"
        ]
    },
    {
        "In what Kentucky land region did the Mississippi River flow backwards?": [
            "The Jackson Purchase Region",
            "The Bluegrass Region",
            "The Western Coal Field",
            "The Pennyroyal Plateau"
        ]
    },
    {
        "What Tennessee city is referred to as The Birthplace of the Blues?": [
            "Memphis",
            "Chattanooga",
            "Nashville",
            "Knoxville"
        ]
    },
    {
        "What is the official state bird of Georgia?": [
            "Brown Thrasher",
            "Mockingbird",
            "Yellowhammer",
            "Robin"
        ]
    },
    {
        "What two figures are depicted on the Delaware State flag and the Great Seal?": [
            "A Farmer and Militiaman",
            "A Sailor and a Farmer",
            "A Miner and a Soldier",
            "A Fireman and a Soldier"
        ]
    },
    {
        "What famous aviator was born in Pensacola Florida?": [
            "Jacqueline Cochran",
            "Neil Alden Armstrong",
            "Charles Augustus Lindbergh",
            "Howard Hughes"
        ]
    },
    {
        "What is the official state horse of Alabama?": [
            "The Racking Horse",
            "The Thoroughbred",
            "The Morgan Horse",
            "The Quarter Horse"
        ]
    },
    {
        "Before 1907, Mississippi was a one-crop state. What devastated the cotton crops in 1907?": [
            "The Boll Weevil",
            "Dry season",
            "Cotton blight",
            "Wild fire"
        ]
    },
    {
        "Which of these is a nickname for Illinois?": [
            "The Prairie State",
            "The Hoosier State",
            "Midway, U.S.A.",
            "Wheat State"
        ]
    },
    {
        "What is the official state doughnut of Louisiana?": [
            "The Beignet doughnut",
            "The Cruller doughnut",
            "The Fritter doughnut",
            "The Glazed doughnut"
        ]
    },
    {
        "Which famous actor was born in Wisconsin?": [
            "Spencer Tracy",
            "Katherine Hepburn",
            "Douglas Fairbanks",
            "Alec Baldwin"
        ]
    },
    {
        "What do the three stars, below the word 'Arkansas' on the Arkansas State flag, represent?": [
            "The three countries that the territory belonged to",
            "The three major rivers in Arkansas",
            "The three major production crops of Arkansas",
            "The three major war heros from Arkansas"
        ]
    },
    {
        "Which of these is a nickname for Missouri?": [
            "The Show Me State",
            "The Flickertail State",
            "The Sunshine State",
            "The Bear State"
        ]
    },
    {
        "What is the official state bird of Iowa?": [
            "The Eastern Goldfinch",
            "The Western Meadowlark",
            "The Cardinal ",
            "The Robin"
        ]
    },

    {
        "Which of these is a nickname for Minnesota?": [
            "The Gopher State",
            "The Roughrider State",
            "The Mountain State",
            "The Plains State"
        ]
    },

    {
        "The name Dakota is a Sioux word. What does it mean?": [
            "Friends",
            "River people",
            "People from the flat land",
            "Loyalty"
        ]
    },

    {
        "In which South Dakota land region do the South Dakota Badlands reside?": [
            "The Great Plains",
            "The Drift Prairie",
            "The Till Plains",
            "Disected Till Plains"
        ]
    },

    {
        "What river is depicted on the Great Seal and the Nebraska State flag?": [
            "The Missouri River",
            "The Ohio River",
            "The Great Plains",
            "The Mississippi River"
        ]
    },

    {
        "What is the capital city of Kansas?": [
            "Topeka",
            "Wichita",
            "Kansas City",
            "Lawrence"
        ]
    },

    {
        "What famous baseball player was born in Spavinaw, Oklahoma?": [
            "Mickey Charles Mantle",
            "Henry Louis (Lou) Gehrig",
            "Roger Eugene Maris",
            "Ty Cobb"
        ]
    },

    {
        "The Texas state capital building is larger than any other state's. What kind of stone is it built of?": [
            "Pink Granite",
            "Marble",
            "Brick",
            "Roxbury Puddingstone"
        ]
    },

    {
        "Which of these Native Americans was born in New Mexico?": [
            "Mangas Coloradas",
            "Geronimo",
            "Cochise",
            "Apache"
        ]
    },

    {
        "The C on the Colorado State flag is filled with gold. What does this color represent?": [
            "The abundant sunshine of Colorado",
            "The Autumn colors of the Rocky Mountains",
            "Gold mining of Colorado",
            "The sunset"
        ]
    },

    {
        "Which of these rivers does not run through Wyoming?": [
            "Red River of the North",
            "The Bighorn River",
            "The Green River",
            "The Snake River"
        ]
    },

    {
        "The Yellowstone River runs through what region of Montana?": [
            "The Great Plains",
            "The Columbia Plateau",
            "The Rocky Mountains",
            "The Flathead"
        ]
    },

    {
        "Monument Valley, home to some of the most striking land formations in the southwest, lies in what Arizona land region?": [
            "The Colorado Plateau",
            "The Basin and Ridge Region",
            "The Rocky Mountains",
            "The Transition Zone"
        ]
    },

    {
        "Brigham Young led what group of people to settle in Utah?": [
            "The Mormons",
            "The Quakers",
            "The German Lutherans",
            "The Baptists"
        ]
    },

    {
        "Higher than Niagra Falls, Shoshone Falls is found on what river?": [
            "The Snake River",
            "The Coeur d'Alene River",
            "The Salmon River",
            "The Bear River"
        ]
    },

    {
        "In what year did Washington become a state?": [
            "1889",
            "1919",
            "1902",
            "1895"
        ]
    },

    {
        "The deepest lake in the United States is found in Oregon. What is the name of this lake?": [
            "Crater Lake",
            "Upper Klamath Lake",
            "Lake Tahoe",
            "East Lake"
        ]
    },

    {
        "An item depicted on the Nevada seal symbolizes transportation. What item is this?": [
            "Steam Train",
            "Mule Train",
            "Steam Ship",
            "Airplane"
        ]
    },

    {
        "Where did the red star on the California State Flag come from?": [
            "Lone star of Texas",
            "Represented California as the largest state at the time",
            "North Star",
            "China"
        ]
    },

    {
        "What is the official marine mammal of Hawaii?": [
            "The Humpback Whale",
            "The Bowhead Whale",
            "The Sperm Whale",
            "The Baleen Whale"
        ]
    },

    {
        "What two animals are shown on the Great Seal of Alaska?": [
            "Fish and Seal",
            "Grizzly Bear and Bald Eagle",
            "Whale and Fish",
            "Black Bear and Fish"
        ]
    },
    
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "States Trivia Game"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "States Trivia. I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

