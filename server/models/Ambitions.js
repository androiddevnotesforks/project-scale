const mongoose = require("mongoose");

const { Schema } = mongoose;

const ambitionsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    timeLimit: {
        type: Number,
        required: true,
        max: 365, //days...
        min: 7 //days
    },
    category: { // every ambition belongs to a category
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    user: { // every ambition belongs to a user
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// do i create sideEffects as a submodel or just put it in with the schema?...

const Ambitions = mongoose.model("Ambitions", ambitionsSchema);

module.exports = Ambitions;