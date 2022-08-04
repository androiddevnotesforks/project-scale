const { Schema, model } = require('mongoose');

const eventsSchema = require("./Events"); // importing subdocument schema

const ambitionsSchema = new Schema({
    identity: { 
        type: String,
        required: true 
    },
    dailyPlan: {
        type: String,
        required: true
    },
    endValue: { // where they want to end up
        type: String,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    public: { // if true = public, false = private
        type: Boolean,
        default: false,
    },
    events: [eventsSchema],
  },
  {
    toJSON: {
        virtuals: true,        
    },
    id: false, // forgot what this is for but it's always used after toJSON
  }
);

ambitionsSchema.virtual("daysCount").get(function () {
    return this.events.length;
})

const Ambitions = model("Ambitions", ambitionsSchema);

module.exports = Ambitions;