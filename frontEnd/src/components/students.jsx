import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
class Students extends Component {
  state = {
    students: [
      { id: 2, name: "Matt M." },
      { id: 3, name: "Rob L." },
      { id: 1, name: "Peter P." },
    ],
  };
  sortStudents = () => {
    let sortedStudents = this.state.students;
    if (this.props.sortBy === "name")
      sortedStudents = _.orderBy(sortedStudents, ["name"], "asc");
    return sortedStudents;
  };
  render() {
    let sortedStudents = this.sortStudents();
    return (
      <div>
        <h1>Students</h1>
        <ul>
          {sortedStudents.map((Student) => (
            <li key={Student.id}>
              <Link to={`/students/${Student.id}`}>{Student.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Students;
