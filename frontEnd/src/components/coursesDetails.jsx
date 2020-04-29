import React, { Component } from "react";
import { getCourse, saveCourse } from "../services/CoursesService";

class CourseDetails extends Component {
  state = {
    course: {},
  };
  async componentDidMount() {
    const { data: course } = await getCourse(this.props.match.params.id);
    if (!course) return this.props.history.replace("/not-found");
    this.setState({ course });
  }
  handleUpate = async (curCourse) => {
    curCourse.name = "Updated";
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
        <div>id: {course.id}</div>
        <div>Name: {course.name}</div>
        <div>year: {course.semesterOffered}</div>
      </div>
    );
  }
}

export default CourseDetails;
