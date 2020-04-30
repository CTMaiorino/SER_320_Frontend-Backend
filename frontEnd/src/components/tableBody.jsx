import React, { Component } from "react";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    const { courses } = this.props;
    return (
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td class="titleText-login">
              <Link to={`/courses/${course._id}`}> {course.courseName} </Link>
            </td>
            <td class="titleText-login">{course.courseId}</td>
            <td class="titleText-login">{course.semesterOffered}</td>
            <td>
              <button
                onClick={() => {
                  this.props.onDelete(course);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  this.props.onAddToSchedule(course);
                }}
                className="btn btn-primary btn-sm"
              >
                Add to Schedule
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
