const { Schema, model } = require("mongoose");

const identitySchema = new Schema({
    identityCategories: {
        type: String,
        trim: true
    },
});

const Identity = model("Identity", identitySchema);

module.exports = Identity;