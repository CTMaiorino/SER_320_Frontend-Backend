var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  username: String,
  password: String,
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  admin: {
    //true or false for admin
    type: Boolean,
    default: false,
  },
});
//an instance method added here to return fullname of the user
User.methods.getName = function () {
  return this.firstname + " " + this.lastname;
};
User.plugin(passportLocalMongoose); //adds the user hash and salt fileds to store the user name, the hashed password and salted value

var Users = mongoose.model("User", User);

module.exports = Users;
