const { Schema } = require("mongoose");

const eventsSchema = new Schema({ // this will be a subdocument schema for ambitions
    createdAt: {
        type: String,
        required: true,
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
});

    // function timeFormat(createdAt) { // getter function to format timestamps, taken from my basic-social-network-api code, removed toLocaleTimeString to be able to parse the date for the calendar
    //     return `${createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    // } // no longer needed here due to previous createdAt issue where type was Date and default was Date.now and the issue with that is where the server is located.

module.exports = eventsSchema;