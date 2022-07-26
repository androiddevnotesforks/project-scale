const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
// note: import other models here if related to user profile...

const identitySchema = require("./Identity");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'], // validation for now
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    identity: [identitySchema] // to top-level parent of deeply nested subdocuments
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10; // enough salt?
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
  // compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;