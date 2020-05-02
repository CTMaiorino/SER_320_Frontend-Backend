import React, { Component } from "react";
import StudentTableHead from "./components/studentTableHead";
import StudentTableBody from "./components/studentTableBody";
import {
 getStudentList, deleteStudent
 
} from "./services/StudentService.jsx";
import {  getCurrentUser } from "./services/authService";

class studentTable extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }
  state = {
    students: [],
    query: "",
  };
  async componentDidMount() {
    console.log("Compontent Did Mount");
    var currUser = getCurrentUser()._doc;
    console.log(currUser);
    const { data } = await getStudentList(currUser._id);
    console.log("The students are : ");
    console.log(data);
    this.setState({ students: data });
  }
  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };
  handleClick() {
    const toggle = !this.state.toggle;
    this.setState({ toggle }); //this.state.toggle =toggle is incorrect
  }
  handleDelete = async (student) => {
    const students = [...this.state.students];
    const newStudents = students.filter((c) => c._id !== student._id);
    this.setState({ students: newStudents });
    try {
      await deleteStudent(student._id);
    } catch (ex) {
      console.log("delete exception");
      if (ex.respond && ex.respond.status === 404)
        alert("This course had already been deleted");
      this.setState({ students });
    }
  };
  
  
  filterStudentsByName = () => {
    let students = [this.state.students];

    if (this.state.query) {
      const filtered = students.filter((c) =>
        c.name.toLowerCase().startsWith(this.state.query.toLowerCase())
      );
      students = filtered;
    }
    return students;
  };
  render() {
    var students = [this.state.students];
    
    return (
      <React.Fragment>
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Search by Name"
          value={this.state.query}
          onChange={this.handleSearch}
        />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
        <StudentTableHead />
          <StudentTableBody
            students={this.state.students}
            onDelete={this.handleDelete}
            
          />
        </table>
      </React.Fragment>
    );
  }
}

export default studentTable;
