/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

var APP_ID = 'jean-luc-picard';

const answers = {
    CITATIONS: [
        "Ein Name muss in allen Geschichtsbüchern stehen. Der Name: Enterprise!",
        "Wissen Sie, als ich ein Schuljunge war, habe ich einige Worte gehört: Mit dem ersten Glied ist die Kette geschmiedet. Wenn die erste Rede zensiert, der erste Gedanke verboten, die erste Freiheit verweigert wird, sind wir alle unwiderruflich gefesselt",
        "Sie haben noch gar nichts begriffen. In den letzten drei Jahrhunderten hat sich unglaublich viel verändert. Es ist für die Menschen nicht länger wichtig, große Reichtümer zu besitzen. Wir haben den Hunger eliminiert, die Not, die Notwendigkeit, reich zu sein. Die Menschheit ist erwachsen geworden.",
        "Merde!",
        "Wieviele Menschen sind nötig, Admiral, bis aus Recht Unrecht wird?",
        "Jemand hat mir mal gesagt, die Zeit würde uns wie ein Raubtier ein Leben lang verfolgen. Ich möchte viel lieber glauben, dass die Zeit unser Gefährte ist, der uns auf unserer Reise begleitet und uns daran erinnert, jeden Moment zu genießen. Denn er wird nicht wieder kommen. Was wir hinterlassen, ist nicht so wichtig, wie die Art, wie wir gelebt haben; denn letztlich, Nummer Eins, sind wir alle nur sterblich!",
        "Es ist immer klüger, seiner Unkenntnis zuzugeben und Fragen zu stellen als aus falschem Stolz blind vorwärts zu stolpern.",
        "Tee. Earl Grey. Heiß.",
        "Einige der dunkelsten Kapitel unserer Welt handeln von der Vertreibung einer kleinen Gruppe von Menschen zum Wohle der Mehrheit. Ich hatte gehofft, dass wir aus unseren Fehlern gelernt haben, aber einige von uns haben das anscheinend nicht.",
        "Machen Sie es so!",
        "Auf den Schirm!",
        "Energie!",
        "Nummer Eins!",
        "Halt den Mund, Wesley!"
    ],
    SKILL_NAME: 'Jean-Luc Picard Zitate',
    HELP_MESSAGE: 'Sage Ich möchte ein Zitat hören um ein neues Zitat zu hören?',
    HELP_REPROMPT: 'Wie kann ich dir helfen?',
    STOP_MESSAGE: 'Machen Sie es so.'
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('CitationIntent');
    },
    'GetNewFactIntent': function () {
        this.emit('CitationIntent');
    },
    'CitationIntent': function () {
        // Get a random bonmot
        const citations = answers.CITATIONS;
        const citationIndex = Math.floor(Math.random() * citations.length);
        const randomCitation = citations[citationIndex];

        // Create speech output
        const speechOutput = randomCitation;
        
        // image
       const imageObj = {
            smallImageUrl: 'https://en.wikipedia.org/wiki/Jean-Luc_Picard#/media/File:Captain_Picard_Chair.jpg',
            largeImageUrl: 'https://en.wikiquote.org/wiki/Jean-Luc_Picard#/media/File:Jean-Luc_Picard_2.jpg'
        };
        
        this.emit(':tellWithCard', speechOutput, answers.SKILL_NAME, randomCitation, imageObj);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', answers.HELP_MESSAGE, answers.HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', answers.STOP_MESSAGE);
    },
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
