var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");


var User = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
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
  studentList : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  registeredCourses : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]

  

  
});
//an instance method added here to return fullname of the user
User.methods.getName = function () {
  return this.firstname + " " + this.lastname;
};
User.methods.getStudents = function () {
  
  return this.studentList;
};
User.methods.addStudent = function (student) {
  this.studentList.push(student);
  console.log("pushing student : " + student)
  return this.studentList;
};
User.methods.addCourse = function (course) {
  this.registeredCourses.push(course);
  console.log("pushing course : " + course)
  return this.registeredCourses;
};
User.methods.getCourses = function () {
  
  return this.registeredCourses;
};

User.plugin(passportLocalMongoose); //adds the user hash and salt fileds to store the user name, the hashed password and salted value

var Users = mongoose.model("User", User);

module.exports = Users;
