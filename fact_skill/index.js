/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask AP History Facts for a test fact"
 *  Alexa: "Here are your test facts: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var APHISTORY_FACTS = [
    "Copperheads nickname was given to those who opposed Lincoln's goal to forcefully restore the Confederate States into the Union.",
    "The proclamation of 1763 forbade colonists to settle west of the Appalachian Mountains.",
    "War Hawks were congressmen who supported the war against Britain in 1812.",
    "Jefferson Davis was president of the Confederate States of America.",
    "The Dawes Act of 1887 gave Native Americans their citizenship rights.",
    "Jackie Robinson broke the color barrier in major league baseball.",
    "The Anaconda Plan was the Union's military strategy for defeating the South during the Civil War.",
    "The Kellogg-Briand Pact Treaty was signed by leading nations outlawing war.",
    "The attack on Fort Sumter sparked the Civil War.",
    "The American Federation of Labor Racial trade/labor union was started by Samuel Gompers.",
    "The Dred Scott Decision reconfirmed African Americans were not citizens and was a major factor in the causes of the Civil War.",
    "Adam Smith condemned government regulation and intervention in economy because he maintained that government tended to disrupt the competitive forces of the free market.",
    "The Emancipation Proclamation abolished slavery ONLY in the states that were in rebellion. It did not abolish slavery everywhere.",
    "General Douglass MacArthur was the commander of U.N. forces fighting in the Korean War and was dismissed because he publicly criticized President Truman's handling of the war.",
    "Taft-Hartley Act a United States law that monitors the activity of labor unions.",
    "The National Labor Union labor union formed right after the Civil War that was the first to organize workers regardless of race, gender, or skill level.",
    "Muller versus Oregon upheld the state law limiting maximum working hours for women.",
    "Tennessee was first Southern state to be readmitted into the Union after the Civil War.",
    "The Philippines ceded to the United Stated as a result of the Spanish-American War.",
    "Brooker T. Washington believed that blacks should forgo political equality until they are achieved economic success; thought that blacks would receive freedom once that were as intelligent as others.",
    "Geraldine Ferraro was the first woman to run for vice president.",
    "Monroe Doctrine warned European nations to not attempt recolonization in the Western Hemisphere.",
    "The Homestead Act was nineteenth century legislation that helped settle the Great Plains by promising land to settlers.",
    "The Elkins Act of 1903 strengthened the Interstate Commerce Act of 1887.",
    "Seward's Folly was a term given to the United States purchase of Alaska from Russia.",
    "Henry Knox was the first United States secretary of war, now defense.",
    "The Jungle was Upton Sinclair's book that depicted conditions in food factories that led to the passing of the Pure Food and Drug Act.",
    "The Truman Doctrine was a document stating that Truman would provide military assistance to the fight against communism in the countries of Greece and Turkey.",
    "The Whiskey Rebellion refers to a group of farmers who refused to pay the excise tax on whiskey. Washington took the militia and seized the rebellion.",
    "W.E.B Du Bois was the founder of the National Association for the Advancement of the Colored People. Major abolitionist who wanted immediate emancipation without compensation.",
    "Woodrow Wilson American President during WWI who had the 14 point plan and strongly wanted the League of Nations.",
    "The Gentlemen's Agreement agreement between the United States and Japan stated that Japan would restrict immigration into the U.S.",
    "The Worcester versus Georgia case decided that Cherokee Indians were entitled to federal protection from the actions of state governments which would infringe on the tribe's sovereignty.",
    "The Compromise of 1850 California enters Union as a free state while the South gets a more strict Fugitive Slave Law.",
    "The Mayflower Compact of 1620 was the first governing document of Plymouth Colony, It was signed on November 11, 1620 by 41 of the ship's one hundred and two passengers, in what is now Provincetown Harbor near Cape Cod.",
    "Roger Williams established Rhode Island 1636.",
    "Salem witch trials of 1692 accussed women of witchcraft.",
    "The Stamp Act of 1765 put taxes on all paper documents.",
    "Townshend Acts of 1767 placed a tax on tea, glass, and paper.",
    "The Boston Tea Party of 1773 represented colonists upset about Tea Act disguised as Native Americans.",
    "The Declaration of Independence was a document written by Thomas Jefferson, declaring the colonies independence from England.",
    "The Articles of Confederation was the first American constitution.  It was a very weak document that limited the power of the Congress by giving states the final authority over all decisions.",
    "The Constitution of the United States sets out the laws and principles of the government of the United States.",
    "George Washington’s Farewell Address advised the United States to stay “neutral in its relations with other nations” and to avoid “entangling alliances.",
    "The Monroe Doctrine was a foreign policy statement delivered by President James Monroe stating that 1) the U.S. would not interfere in European affairs, and 2) that the western hemisphere was closed to colonization and/ or interference by European nations.",
    "The Treaty of Paris of 1763 ended the French and Indian War and effectively kicked the French out of North America.",   
    "The Treaty of Paris of 1783 ended the American Revolution and forced Britain to recognize the United States as an independent nation.",
    "The Northwest Ordinance was a policy of establishing the principles and procedures for the orderly expansion of the United States.",
    "The Mayflower Compact was the agreement signed in 1620 by the Pilgrims in Plymouth, to consult each other about laws for the colony and a promise to work together to make it succeed.",
    "The Federalist Papers were a series of essays written by James Madison, John Jay, and Alexander Hamilton, defending the Constitution and the principles on which the government of the United States was founded.",
    "Common Sense was a pamphlet written by Thomas Paine to convince colonists that it was time to become independent from Britain.",
    "The Bill of Rights is the first ten amendments to the Constitution and detail the protection of individual liberties.",
    "The Gettysburg Address was a short speech given by Abraham Lincoln to dedicate a cemetery for soldiers who died at the Battle of Gettysburg. It is considered to be a profound statement of American ideals.",
    "Abraham Lincoln issued the Emancipation Proclamation on January 1, 1863, setting all slaves in the Confederate states free.",
    "Lincoln’s First Inaugural Address stated that, “no state…can lawfully get out of the Union”, but pledged there would be no war unless the South started it.",
    "Lincoln’s Second Inaugural Address was meant to help heal and restore the country after four years of Civil War.",
    "The Great Compromise created two houses of Congress.  One based on population, the other gave equal representation to each state.",
    "Sam Adams was a member of the Sons of Liberty who started the Committee of Correspondence to stir public support for American independence.",
    "Ben Franklin was an inventor, statesman, diplomat, signer of the Declaration of Independence and delegate to Constitutional Convention."
    "King George III was the King of England who disbanded the colonial legislatures, taxed the colonies, and refused the Olive Branch Petition leading to the final break with the colonies."
    "Thomas Jefferson wrote the Declaration of Independence; became the 3rd President of the United States and purchased the Louisiana territory, doubling the size of the United States."
    "Thomas Paine wrote pamphlets like Common Sense and The Crisis to encourage American independence and resolve.",
    "George Washington was the leader of the Continental Army who became the first President of the United States.",
    "Andrew Jackson was the leader of the original Democratic Party and a “President of the people”. He was also responsible for the Trail of Tears, which forced Native Americans west of the Mississippi River."
    "John C. Calhoun was a South Carolina Congressman and Senator who spoke for the South before the Civil War.",
    "Henry Clay was a powerful Kentucky Congressman and Senator who proposed the American System and the Compromise of 1850.",
    "Daniel Webster was a Massachusetts Congressman and Senator who spoke for the North and the preservation of the Union.",
    "Jefferson Davis was the President of the Confederacy during the Civil War."
    "Ulysses S. Grant was the General of the Union Army and was responsible for winning the Civil War for the North.",
    "Robert E. Lee was the General of the Confederate Army."
    "Abraham Lincoln was the 16th President of the United States who successfully put the Union back together only to be assassinated 5 days after the Civil War ended.",
    "Alexander Hamilton was a leader of the Federalists, first Treasurer of the United States, creator of the Bank of the U.S., and killed in a duel by the Vice President of the United States, Aaron Burr.",
    "Patrick Henry was a passionate patriot who became famous for his fiery speeches in favor of American independence.  His most famous quote included the words, “Give me liberty or give me death!”"
    "James Madison is considered to be the Father of the Constitution.",
    "Frederick Douglass was a former slave who became the best-known black abolitionist in the country.",
    "James Monroe was the author of the Monroe Doctrine, which shut down the western hemisphere to European expansion or interference.",
    "Harriet Tubman was an escaped slave who became a Conductor on the Underground Railroad and helped over 300 slaves to freedom in the North.",
    "Elizabeth Cady Stanton organized the Seneca Falls Convention creating the Women’s Rights Movement in the United States.",
    "Marbury versus Madison was the 1803 Court decision that gave the Supreme Court the right to determine whether a law violates the Constitution.  It set up the principle of judicial review.",
    "Dred Scott versus Sanford was the Supreme Court decision that said slaves were property and not citizens and that Congress had no right to ban slavery in the territories.",
    "Mercantilism is an economic theory that a country’s strength is measured by the amount of gold it has, that a country should sell more than it buys and that the colonies exist for the benefit of the Mother Country.",
    "An abolitionist was a person who wanted to end slavery in the United States.",
    "A tariff is a tax on goods brought into a country.",
    "A protective tariff is a tax placed on goods from another country to protect the home industry.",
    "Sectionalism is a strong sense of loyalty to a state or section instead of to the whole country.",
    "Manifest Destiny is the belief that the United States should own all of the land between the Atlantic and Pacific Oceans.",
    "The Temperance Movement was a campaign against the sale or drinking of alcohol.",
    "Representative Government is a system of government in which voters elect representatives to make laws for them.",
    "A Republic is a nation in which voters choose representatives to govern them.",
    "The House of Burgesses was the first representative assembly in the new world.",
    "The Three Branches of Government are the Legislative Branch, the Judicial Branch, and the Executive branch.",
    "Checks and Balances is a system set up by the Constitution in which each branch of the federal government has the power to check, or control, the actions of the other branches.",
    "Free Enterprise is the freedom of private businesses to operate competitively for profit with minimal government regulation.",
    "Federalism is the sharing of power between the states and the national government.",
    "Separation of Powers is a system in which each branch of government has its own powers.",
    "Popular Sovereignty is the political theory that government is subject to the will of the people.  Before the Civil War, the idea that people living in a territory had the right to decide by voting if slavery would be allowed there.",
    "Unalienable rights are rights that cannot be given up, taken away or transferred.  Life, liberty and the pursuit of happiness are some of those rights.",
    "Tyranny is a cruel and unjust government.",
    "A Democracy is a form of government that is run for and by the people, giving people the supreme power.",
    "Ratify means to approve by vote.",
    "Judicial Review is the right of the Supreme Court to judge laws passed by Congress and determines whether they are constitutional or not.",
    "Civil Disobedience is the refusal to obey a government law or laws as a means of passive resistance because of one’s moral conviction or belief.",
    "Federalists were supporters of the Constitution who favored a strong national government.",
    "Antifederalists were people opposed to the Constitution, preferring more power be given to the state governments than to the national government.",
    "Nullification is the idea of a state declaring a federal law illegal.",
    "Primary Sources are the original records of an event.  They include eyewitness reports, records created at the time of an event, speeches, and letters by people involved in the event, photographs and artifacts.",
    "Secondary Sources are the later writings and interpretations of historians and writers.  Often secondary sources, like textbooks and articles, provide summaries of information found in primary sources.",
    "Republicanism was an attitude toward society in the late 1700s based on the belief that the good virtue and morality of the people was essential to sustain the republican form of government.",
    "Industrial Revolution was the era in which a change from household industries to factory production using powered machinery took place.",
    "Annexation of Texas, 1845 was the annexation of the Republic of Texas to the United States of America as the 28th state. This act quickly led to the Mexican-American War"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var APhistory = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
APhistory.prototype = Object.create(AlexaSkill.prototype);
APhistory.prototype.constructor = APhistory;

APhistory.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("AP history facts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

APhistory.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("AP history facts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
APhistory.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("AP history facts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

APhistory.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask AP history facts to tell me a history fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * APHISTORY_FACTS.length);
    var fact = APHISTORY_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your AP History fact: " + fact;

    response.tellWithCard(speechOutput, "AP History facts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var APhistory = new APhistory();
    APhistory.execute(event, context);
};

/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask AP History Facts for a test fact"
 *  Alexa: "Here are your test facts: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var APHISTORY_FACTS = [
    "Copperheads nickname was given to those who opposed Lincoln's goal to forcefully restore the Confederate States into the Union.",
    "The proclamation of 1763 forbade colonists to settle west of the Appalachian Mountains.",
    "War Hawks were congressmen who supported the war against Britain in 1812.",
    "Jefferson Davis was president of the Confederate States of America.",
    "The Dawes Act of 1887 gave Native Americans their citizenship rights.",
    "Jackie Robinson broke the color barrier in major league baseball.",
    "The Anaconda Plan was the Union's military strategy for defeating the South during the Civil War.",
    "The Kellogg-Briand Pact Treaty was signed by leading nations outlawing war.",
    "The attack on Fort Sumter sparked the Civil War.",
    "The American Federation of Labor Racial trade/labor union was started by Samuel Gompers.",
    "The Dred Scott Decision reconfirmed African Americans were not citizens and was a major factor in the causes of the Civil War.",
    "Adam Smith condemned government regulation and intervention in economy because he maintained that government tended to disrupt the competitive forces of the free market.",
    "The Emancipation Proclamation abolished slavery ONLY in the states that were in rebellion. It did not abolish slavery everywhere.",
    "General Douglass MacArthur was the commander of U.N. forces fighting in the Korean War and was dismissed because he publicly criticized President Truman's handling of the war.",
    "Taft-Hartley Act a United States law that monitors the activity of labor unions.",
    "The National Labor Union labor union formed right after the Civil War that was the first to organize workers regardless of race, gender, or skill level.",
    "Muller versus Oregon upheld the state law limiting maximum working hours for women.",
    "Tennessee was first Southern state to be readmitted into the Union after the Civil War.",
    "The Philippines ceded to the United Stated as a result of the Spanish-American War.",
    "Brooker T. Washington believed that blacks should forgo political equality until they are achieved economic success; thought that blacks would receive freedom once that were as intelligent as others.",
    "Geraldine Ferraro was the first woman to run for vice president.",
    "Monroe Doctrine warned European nations to not attempt recolonization in the Western Hemisphere.",
    "The Homestead Act was nineteenth century legislation that helped settle the Great Plains by promising land to settlers.",
    "The Elkins Act of 1903 strengthened the Interstate Commerce Act of 1887.",
    "Seward's Folly was a term given to the United States purchase of Alaska from Russia.",
    "Henry Knox was the first United States secretary of war, now defense.",
    "The Jungle was Upton Sinclair's book that depicted conditions in food factories that led to the passing of the Pure Food and Drug Act.",
    "The Truman Doctrine was a document stating that Truman would provide military assistance to the fight against communism in the countries of Greece and Turkey.",
    "The Whiskey Rebellion refers to a group of farmers who refused to pay the excise tax on whiskey. Washington took the militia and seized the rebellion.",
    "W.E.B Du Bois was the founder of the National Association for the Advancement of the Colored People. Major abolitionist who wanted immediate emancipation without compensation.",
    "Woodrow Wilson American President during WWI who had the 14 point plan and strongly wanted the League of Nations.",
    "The Gentlemen's Agreement agreement between the United States and Japan stated that Japan would restrict immigration into the U.S.",
    "The Worcester versus Georgia case decided that Cherokee Indians were entitled to federal protection from the actions of state governments which would infringe on the tribe's sovereignty.",
    "The Compromise of 1850 California enters Union as a free state while the South gets a more strict Fugitive Slave Law.",
    "The Mayflower Compact of 1620 was the first governing document of Plymouth Colony, It was signed on November 11, 1620 by 41 of the ship's one hundred and two passengers, in what is now Provincetown Harbor near Cape Cod.",
    "Roger Williams established Rhode Island 1636.",
    "Salem witch trials of 1692 accussed women of witchcraft.",
    "The Stamp Act of 1765 put taxes on all paper documents.",
    "Townshend Acts of 1767 placed a tax on tea, glass, and paper.",
    "The Boston Tea Party of 1773 represented colonists upset about Tea Act disguised as Native Americans.",
    "The Declaration of Independence was a document written by Thomas Jefferson, declaring the colonies independence from England.",
    "The Articles of Confederation was the first American constitution.  It was a very weak document that limited the power of the Congress by giving states the final authority over all decisions.",
    "The Constitution of the United States sets out the laws and principles of the government of the United States.",
    "George Washington’s Farewell Address advised the United States to stay “neutral in its relations with other nations” and to avoid “entangling alliances.",
    "The Monroe Doctrine was a foreign policy statement delivered by President James Monroe stating that 1) the U.S. would not interfere in European affairs, and 2) that the western hemisphere was closed to colonization and/ or interference by European nations.",
    "The Treaty of Paris of 1763 ended the French and Indian War and effectively kicked the French out of North America.",   
    "The Treaty of Paris of 1783 ended the American Revolution and forced Britain to recognize the United States as an independent nation.",
    "The Northwest Ordinance was a policy of establishing the principles and procedures for the orderly expansion of the United States.",
    "The Mayflower Compact was the agreement signed in 1620 by the Pilgrims in Plymouth, to consult each other about laws for the colony and a promise to work together to make it succeed.",
    "The Federalist Papers were a series of essays written by James Madison, John Jay, and Alexander Hamilton, defending the Constitution and the principles on which the government of the United States was founded.",
    "Common Sense was a pamphlet written by Thomas Paine to convince colonists that it was time to become independent from Britain.",
    "The Bill of Rights is the first ten amendments to the Constitution and detail the protection of individual liberties.",
    "The Gettysburg Address was a short speech given by Abraham Lincoln to dedicate a cemetery for soldiers who died at the Battle of Gettysburg. It is considered to be a profound statement of American ideals.",
    "Abraham Lincoln issued the Emancipation Proclamation on January 1, 1863, setting all slaves in the Confederate states free.",
    "Lincoln’s First Inaugural Address stated that, “no state…can lawfully get out of the Union”, but pledged there would be no war unless the South started it.",
    "Lincoln’s Second Inaugural Address was meant to help heal and restore the country after four years of Civil War.",
    "The Great Compromise created two houses of Congress.  One based on population, the other gave equal representation to each state.",
    "Sam Adams was a member of the Sons of Liberty who started the Committee of Correspondence to stir public support for American independence.",
    "Ben Franklin was an inventor, statesman, diplomat, signer of the Declaration of Independence and delegate to Constitutional Convention."
    "King George III was the King of England who disbanded the colonial legislatures, taxed the colonies, and refused the Olive Branch Petition leading to the final break with the colonies."
    "Thomas Jefferson wrote the Declaration of Independence; became the 3rd President of the United States and purchased the Louisiana territory, doubling the size of the United States."
    "Thomas Paine wrote pamphlets like Common Sense and The Crisis to encourage American independence and resolve.",
    "George Washington was the leader of the Continental Army who became the first President of the United States.",
    "Andrew Jackson was the leader of the original Democratic Party and a “President of the people”. He was also responsible for the Trail of Tears, which forced Native Americans west of the Mississippi River."
    "John C. Calhoun was a South Carolina Congressman and Senator who spoke for the South before the Civil War.",
    "Henry Clay was a powerful Kentucky Congressman and Senator who proposed the American System and the Compromise of 1850.",
    "Daniel Webster was a Massachusetts Congressman and Senator who spoke for the North and the preservation of the Union.",
    "Jefferson Davis was the President of the Confederacy during the Civil War."
    "Ulysses S. Grant was the General of the Union Army and was responsible for winning the Civil War for the North.",
    "Robert E. Lee was the General of the Confederate Army."
    "Abraham Lincoln was the 16th President of the United States who successfully put the Union back together only to be assassinated 5 days after the Civil War ended.",
    "Alexander Hamilton was a leader of the Federalists, first Treasurer of the United States, creator of the Bank of the U.S., and killed in a duel by the Vice President of the United States, Aaron Burr.",
    "Patrick Henry was a passionate patriot who became famous for his fiery speeches in favor of American independence.  His most famous quote included the words, “Give me liberty or give me death!”"
    "James Madison is considered to be the Father of the Constitution.",
    "Frederick Douglass was a former slave who became the best-known black abolitionist in the country.",
    "James Monroe was the author of the Monroe Doctrine, which shut down the western hemisphere to European expansion or interference.",
    "Harriet Tubman was an escaped slave who became a Conductor on the Underground Railroad and helped over 300 slaves to freedom in the North.",
    "Elizabeth Cady Stanton organized the Seneca Falls Convention creating the Women’s Rights Movement in the United States.",
    "Marbury v. Madison was the 1803 Court decision that gave the Supreme Court the right to determine whether a law violates the Constitution.  It set up the principle of judicial review.",
    "Dred Scott v. Sanford was the Supreme Court decision that said slaves were property and not citizens and that Congress had no right to ban slavery in the territories.",
    "Mercantilism is an economic theory that a country’s strength is measured by the amount of gold it has, that a country should sell more than it buys and that the colonies exist for the benefit of the Mother Country.",
    "An abolitionist was a person who wanted to end slavery in the United States.",
    "A tariff is a tax on goods brought into a country.",
    "A protective tariff is a tax placed on goods from another country to protect the home industry.",
    "Sectionalism is a strong sense of loyalty to a state or section instead of to the whole country.",
    "Manifest Destiny is the belief that the United States should own all of the land between the Atlantic and Pacific Oceans.",
    "The Temperance Movement was a campaign against the sale or drinking of alcohol.",
    "Representative Government is a system of government in which voters elect representatives to make laws for them.",
    "A Republic is a nation in which voters choose representatives to govern them.",
    "The House of Burgesses was the first representative assembly in the new world.",
    "The Three Branches of Government are the Legislative Branch, the Judicial Branch, and the Executive branch.",
    "Checks and Balances is a system set up by the Constitution in which each branch of the federal government has the power to check, or control, the actions of the other branches.",
    "Free Enterprise is the freedom of private businesses to operate competitively for profit with minimal government regulation.",
    "Federalism is the sharing of power between the states and the national government.",
    "Separation of Powers is a system in which each branch of government has its own powers.",
    "Popular Sovereignty is the political theory that government is subject to the will of the people.  Before the Civil War, the idea that people living in a territory had the right to decide by voting if slavery would be allowed there.",
    "Unalienable rights are rights that cannot be given up, taken away or transferred.  Life, liberty and the pursuit of happiness are some of those rights.",
    "Tyranny is a cruel and unjust government.",
    "A Democracy is a form of government that is run for and by the people, giving people the supreme power.",
    "Ratify means to approve by vote.",
    "Judicial Review is the right of the Supreme Court to judge laws passed by Congress and determines whether they are constitutional or not.",
    "Civil Disobedience is the refusal to obey a government law or laws as a means of passive resistance because of one’s moral conviction or belief.",
    "Federalists were supporters of the Constitution who favored a strong national government.",
    "Antifederalists were people opposed to the Constitution, preferring more power be given to the state governments than to the national government.",
    "Nullification is the idea of a state declaring a federal law illegal.",
    "Primary Sources are the original records of an event.  They include eyewitness reports, records created at the time of an event, speeches, and letters by people involved in the event, photographs and artifacts.",
    "Secondary Sources are the later writings and interpretations of historians and writers.  Often secondary sources, like textbooks and articles, provide summaries of information found in primary sources.",
    "Republicanism was an attitude toward society in the late 1700s based on the belief that the good virtue and morality of the people was essential to sustain the republican form of government.",
    "Industrial Revolution was the era in which a change from household industries to factory production using powered machinery took place.",
    "Annexation of Texas, 1845 was the annexation of the Republic of Texas to the United States of America as the 28th state. This act quickly led to the Mexican-American War"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var APhistory = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
APhistory.prototype = Object.create(AlexaSkill.prototype);
APhistory.prototype.constructor = APhistory;

APhistory.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("AP history facts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

APhistory.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("AP history facts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
APhistory.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("AP history facts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

APhistory.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask AP history facts to tell me a history fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * APHISTORY_FACTS.length);
    var fact = APHISTORY_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your AP History fact: " + fact;

    response.tellWithCard(speechOutput, "AP History facts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var APhistory = new APhistory();
    APhistory.execute(event, context);
};

