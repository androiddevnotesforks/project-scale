const { Schema } = require("mongoose");

const eventsSchema = new Schema({ // this will be a subdocument schema for ambitions
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeFormat
    },
    dataInput: { 
        type: Number,
        required: true,
        maxLength: 8, 
    },
    notes: {
        type: String,
        maxLength: 255,
    },

},
    {
     toJSON: { // to get timeFormat
        getters: true,
     },
     id: false, // forgot what this is for but it's always used after toJSON
    });

    function timeFormat(createdAt) { // getter function to format timestamps, taken from my basic-social-network-api code, removed toLocaleTimeString to be able to parse the date for the calendar
        return `${createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    }

module.exports = eventsSchema;