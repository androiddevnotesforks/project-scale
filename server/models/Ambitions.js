const { Schema, model } = require('mongoose');

const eventsSchema = require("./Events"); // importing subdocument schema

const ambitionsSchema = new Schema({
    identity: { 
        // type: Schema.Types.ObjectId,
        // ref: "Identity",
        // required: true
        type: String,
        required: true 
    },
    // timeLimit: { // might end up not using a time limit
    //     type: Number,
    //     required: true,
    //     max: 365, //days...
    //     min: 7 //days
    // },
    dailyPlan: { // starting value
        type: String,
        required: true
    },
    endValue: { // where they want to end up
        type: String,
        required: true
    },
    category: { // every ambition belongs to a category
        // type: Schema.Types.ObjectId,
        // ref: "Category",
        // required: true
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
// do i create sideEffects as a submodel or just put it in with the schema?...

module.exports = Ambitions;