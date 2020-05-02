import React, { Component } from "react";
import { getStudent, saveStudent, getCourseList } from "../services/StudentService";
import {getCurrentUser} from "../services/authService";
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
        <div>id: {student._id}</div>
        <div>Name: {student.firstname}</div>
        <div>Registered Courses : {student.registeredCourses}</div>
      </div>
    );
  }
}

export default StudentDetails;
