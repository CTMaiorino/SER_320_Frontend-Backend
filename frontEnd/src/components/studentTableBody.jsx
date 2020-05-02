import React, { Component } from "react";
import { Link } from "react-router-dom";
class studentTableBody extends Component {
  render() {
    const { students } = this.props;
    console.log("Students being displayed" + students);
    return (
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td class="titleText-login">
              <Link to={`/student/${student._id}`}> {student.firstname} </Link>
            </td>
            <td class="titleText-login">{student.lastname}</td>
            
            <td>
              <button
                onClick={() => {
                  this.props.onDelete(student);
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

export default studentTableBody;
