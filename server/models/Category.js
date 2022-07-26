const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    ambitionCategories: {
        type: String,
        trim: true
    }
});

const Category = model("Category", categorySchema);

module.exports = Category;
