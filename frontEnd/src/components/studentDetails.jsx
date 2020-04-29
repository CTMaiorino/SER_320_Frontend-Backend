import React, { Component } from "react";
import { getStudent, saveStudent } from "../services/StudentService";

class StudentDetails extends Component {
  state = {
    student: {},
  };
  async componentDidMount() {
    const { data: student } = await getStudent(this.props.match.params.id);
    if (!student) return this.props.history.replace("/not-found");
    this.setState({ student });
  }
  handleUpate = async (curStudent) => {
    curStudent.name = "Updated";
    const { data: student } = await saveStudent(curStudent);
    this.setState({ student });
  };
  render() {
    const { student } = this.state;
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.handleUpate(student);
          }}
        >
          {" "}
          Update{" "}
        </button>
        <h3>Student Details</h3>
        <div>id: {student.id}</div>
        <div>Name: {student.name}</div>
        <div>year: {student.year}</div>
      </div>
    );
  }
}

export default StudentDetails;
