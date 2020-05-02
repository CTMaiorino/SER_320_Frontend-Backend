var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user"); // user model added
var Verify = require("./verify"); // verfication
const bcrypt = require("bcrypt");
var ObjectId = require("mongodb").ObjectID;
var Course = require("../models/courses");
/* GET users listing. */
// verification is added to all get requests
router.get("/",  function (
  req,
  res,
  next
) {
  User.find({}, function (err, users) {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

// 3- register a new user on end poitn register, info is sent as a json object
router.post("/register", async function (req, res) {
  User.register(
    new User({
      id: new ObjectId(),
      username: req.body.username,
      password: req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname
    }),
    req.body.password,
    function (err, user) {
      if (err) return res.status(500).json({ err: err });
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      passport.authenticate("local")(req, res, function () {
        var token = Verify.getToken(user);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .json({ status: "Registration Successful !" });
      });
    }
  );
});
// 4- user login
router.post("/login", (req, res, next) => {
  //req.body will have username and password
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log("no user");
      return res.status(401).json({ err: info });
    }
    req.logIn(user, function (err) {
      if (err) return res.status(500).json({ err: "Could not log in user" });

      console.log("User in users: ", user);

      var token = Verify.getToken(user);

      res.status(200);
      res.send(token);
    });
  })(req, res, next);
});

// 5- implementing logout
router.get("/logout", function (req, res) {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});
router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) throw err;
    console.log(user)
    res.json(user);
  });
});
router.get("/:userId/student", (req, res, next) => {
  console.log("GET /:userId/students");
  User.findById(req.params.userId)
  .populate('studentList')
  .exec((err, user) => {
    if (err) throw err;
   res.json(user.studentList);
  });
});
router.post("/:userId/:studentId", (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) throw err;
    console.log(user)
      User.findById(req.params.studentId,(err, student)=>{
        if (err) throw err;
        console.log(student)
        user.addStudent(student);
        user.save( (err, user)=>{
          if (err) throw err;
          console.log('Updated student list!');
          res.json(user);
      });
        
      })
      
  });
});
router.get("/:userId/courses", (req, res, next) => {
  console.log("GET /:userId/courses");
  User.findById(req.params.userId)
  .populate('registeredCourses')
  .exec((err, user) => {
    if (err) throw err;
   res.json(user.registeredCourses);
  });
});
router.post("/:userId/courses/:courseId", (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) throw err;
    console.log(user)
      Course.findById(req.params.courseId,(err, course)=>{
        if (err) throw err;
        console.log(course)
        user.addCourse(course);
        user.save( (err, user)=>{
          if (err) throw err;
          console.log('Updated course list!');
          res.json(user);
      });
        
      })
      
  });
});
module.exports = router;
