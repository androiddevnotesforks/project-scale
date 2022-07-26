const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    identityCategories: {
        type: String,
        required: true,
        trim: true
    },
    ambitionCategories: {
        type: String,
        required: true,
        trim: true
    }
});

const Category = model("Category", categorySchema);

module.exports = Category;
