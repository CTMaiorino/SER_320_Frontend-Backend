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
        <h3>Course Details</h3>
        <div>id: {course.courseId}</div>
        <div>Name: {course.courseName}</div>
        <div>year: {course.semesterOffered}</div>
        <div>Info: {course.comment}</div>
      </div>
    );
  }
}

export default CourseDetails;
