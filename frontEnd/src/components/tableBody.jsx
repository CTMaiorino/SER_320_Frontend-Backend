import React, { Component } from "react";
import { Link } from "react-router-dom";
class TableBody extends Component {
  render() {
    const { courses } = this.props; //this.props.people
    return (
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>
              <Link to={`/student/${course.id}`}>
                {" "}
                {course.name} {course.semesterOffered}{" "}
              </Link>
            </td>
            <td></td>
            <td></td>
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
