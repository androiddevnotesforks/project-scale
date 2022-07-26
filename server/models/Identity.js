const { Schema } = require("mongoose");

const ambitionsSchema = require("./Ambitions"); // importing subdoc schema

const identitySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ambitions: [ambitionsSchema] // identity's parent is User
});

module.exports = Identity;