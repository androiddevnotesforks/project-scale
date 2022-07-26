const { Schema } = require("mongoose");

const eventsSchema = new Schema({ // this will be a subdocument schema for ambitions
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeFormat
    },
    dataInput: { // mongoose docs mention string inputs are fine and that entering true gives 1 and false gives zero... idea... for ambitions that have only a yes or no answer put in buttons instead of a text input field. https://mongoosejs.com/docs/schematypes.html#numbers
        type: Number,
        required: true,
        maxLength: 8, // note: consider using buttons for all number inputs, not just the yes/no
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

    function timeFormat(createdAt) { // getter function to format timestamps, taken from my basic-social-network-api code
        return `${createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${createdAt.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }

module.exports = eventsSchema;