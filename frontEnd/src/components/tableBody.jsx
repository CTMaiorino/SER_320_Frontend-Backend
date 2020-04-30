import React, { Component } from "react";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    const { courses } = this.props;
    return (
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>
              <Link to={`/courses/${course._id}`}> {course.courseName} </Link>
            </td>
            <td>{course.courseId}</td>
            <td>{course.semesterOffered}</td>
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
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
