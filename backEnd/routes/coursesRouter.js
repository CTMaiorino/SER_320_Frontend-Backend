var express = require("express");
var coursesRouter = express.Router();
var bodyParser = require("body-parser");
//
const mongoose = require("mongoose");
let Courses = require("../models/courses");

//
var Verify = require("./verify");

coursesRouter.use(bodyParser.json());

/* GET home page. */
coursesRouter
  .route("/")
  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Courses.find({})
      .populate("comments.postedby")
      .exec(function (err, course) {
        if (err) throw err;
        res.json(course);
      });
  })
  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (
    req,
    res,
    next
  ) {
    Courses.create(req.body, (err, course) => {
      if (err) throw err;
      //
      console.log("course created");
      var id = course._id;
      res.writeHead(200, { "Content-Type": "text-plain" });
      // Send reply with the new course id
      res.end("Added the course with the id: " + id);
    });
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (
    req,
    res,
    next
  ) {
    Courses.remove({}, function (err, course) {
      if (err) throw err;
      res.json(course);
    });
  });

coursesRouter
  .route("/:courseId") //courseId router
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (
    req,
    res,
    next
  ) {
    Courses.findById(req.params.courseId)
      .populate("comments.postedBy")
      .exec(function (err, course) {
        if (err) throw err;
        res.json(course);
      });
  })
  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (
    req,
    res,
    next
  ) {
    Courses.findByIdAndUpdate(
      req.params.courseId,
      { $set: req.body },
      { new: true },
      function (err, course) {
        if (err) throw err;
        res.json(course);
      }
    );
  })
  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (
    req,
    res,
    next
  ) {
    Courses.findByIdAndRemove(req.params.courseId, function (err, course) {
      if (err) throw err;
      res.json(course);
    });
  });

///

coursesRouter
  .route("/:courseId/comments")
  .all(Verify.verifyOrdinaryUser)
  .get(function (req, res, next) {
    Courses.findById(req.params.courseId)
      .populate("comments.postedby") //1.1.6 add code to populate recipe
      .exec(function (err, course) {
        if (err) throw err;
        res.json(course.comments); //retrun recipe.comments
      });
  })

  .post(function (req, res, next) {
    Courses.findById(req.params.courseId, function (err, course) {
      if (err) throw err;

      req.body.postedby = req.decoded._doc._id; //1.1.1. set postedBy id to the _id of the user from the users document

      course.comments.push(req.body); //push to the comments collection

      course.save(function (err, course) {
        if (err) throw err;
        console.log("Updated Comments!");
        res.json(course);
      });
    });
  })

  .delete(Verify.verifyAdmin, function (req, res, next) {
    //1.1.5 verification added
    Courses.findById(req.params.courseId, function (err, course) {
      if (err) throw err;
      for (var i = course.comments.length - 1; i >= 0; i--) {
        //remove comments one at a time using a loop since remove does not support an array
        course.comments.id(course.comments[i]._id).remove();
      }
      course.save(function (err, result) {
        if (err) throw err;
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Deleted all comments!");
      });
    });
  });

coursesRouter
  .route("/:courseId/comments/:commentId")
  .all(Verify.verifyOrdinaryUser) //1.1.6 verification added
  .get(function (req, res, next) {
    Courses.findById(req.params.courseId)
      .populate("comments.postedby") //1.1.6 add code to populate recipe
      .exec(function (err, course) {
        if (err) throw err;
        res.json(course.comments.id(req.params.commentId)); //return the comment using commentid in the respond object
      });
  })

  .put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Courses.findById(req.params.courseId, function (err, course) {
      if (err) throw err;
      course.comments.id(req.params.commentId).remove(); //remove comment

      req.body.postedby = req.decoded._doc._id; //1.1.2 set postedby id to the _id of the user from the users document

      course.comments.push(req.body); //add new comment instead
      course.save(function (err, course) {
        if (err) throw err;
        console.log("Updated Comments!");
        res.json(course);
      });
    });
  })

  .delete(function (req, res, next) {
    Courses.findById(req.params.CourseId, function (err, course) {
      //1.1.2 deletion is allowed to a specific user
      if (
        course.comments.id(req.params.commentId).postedby !=
        req.decoded._doc._id
      ) {
        var err = new Error(
          "You are not authorized to perform this operation!"
        );
        err.status = 403;
        return next(err);
      }
      course.comments.id(req.params.commentId).remove(); //remove a single comment

      course.save(function (err, course) {
        if (err) throw err;
        res.json(course);
      });
    });
  });

module.exports = coursesRouter;

//course.save();
//res.end("Course with id " + req.params.courseId + " was updated");
