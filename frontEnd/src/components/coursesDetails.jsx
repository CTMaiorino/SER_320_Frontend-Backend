import React, { Component } from "react";
import { getCourse, saveCourse, getCourses } from "../services/CoursesService";

class CourseDetails extends Component {
  state = {
    course: {},
  };
  async componentDidMount() {
    const { data: course } = await getCourses();
    this.setState({ course });
    const singleCourse = getCourse(this.state.match.params._id);
    if (!singleCourse) return this.props.history.replace("/not-found");
    this.setState({ singleCourse });
  }
  handleUpate = async (curCourse) => {
    curCourse.courseName = "Updated";
    curCourse.courseId = "Updated Num";
    curCourse.semesterOffered = "Updated Semester";
    const { data: course } = await saveCourse(curCourse);
    this.setState({ course });
  };
  render() {
    const { course } = this.state;
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.handleUpate(course);
          }}
        >
          {" "}
          Update{" "}
        </button>
        <h3 class="titleText-login">Course Details</h3>
        <div class="titleText-login">id: {course.courseId}</div>
        <div class="titleText-login">Name: {course.courseName}</div>
        <div class="titleText-login">year: {course.semesterOffered}</div>
        <div class="titleText-login">Info: {course.comment}</div>
      </div>
    );
  }
}

export default CourseDetails;
