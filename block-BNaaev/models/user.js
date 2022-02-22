const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, min: 5},
    age:{type: Number, default: 0},
    phoneNum: {type: Number}
});

userSchema.pre("save", function(next){
    if(this.password && this.isModified("password")){
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            return next();
        })
    }else{
        next();
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;