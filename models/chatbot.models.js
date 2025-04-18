const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatBotSchema = new Schema({
    headerColor: { 
        type: String 
    },
    backgroundColor: { 
        type: String 
    },
    introForm: {
        welcomeMessage: { 
            type: String 
        },
        fields: [{ 
            type: String 
        }]
    },
    initialMessages: [{ 
        type: String 
    }],
    missedChatTimer: { 
        type: Number // in minutes 
    }
});

module.exports = mongoose.model("ChatBot", ChatBotSchema);
