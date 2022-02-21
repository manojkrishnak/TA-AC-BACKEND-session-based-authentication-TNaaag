const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true, min: 5},
age: {type: Number, default: 0},
phone: {type: Number}
})


const User = mongoose.model("User", userSchema);

module.exports = User;