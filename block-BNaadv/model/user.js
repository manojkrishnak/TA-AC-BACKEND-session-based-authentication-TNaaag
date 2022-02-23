const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8 },
}, {timestamps: true});

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10,  (err, hash) => {
        console.log("thissss ",this)
      if (err) next(err);
      this.password = hash;
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

const User = mongoose.model("User", userSchema);

module.exports = User;
