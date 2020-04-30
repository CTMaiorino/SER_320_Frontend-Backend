import React, { Component } from "react";
import TableBody from "./components/tableBody";
import TableHead from "./components/tableHead";
import {
  getCourses,
  deleteCourse,
  saveCourse,
} from "./services/CoursesService.jsx";

class Table extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }
  state = {
    courses: [],
    query: "",
  };
  async componentDidMount() {
    console.log("Compontent Did Mount");
    const { data } = await getCourses();
    this.setState({ courses: data });
  }
  handleSearch = (event) => {
    this.setState({ query: event.target.value });
  };
  handleClick() {
    const toggle = !this.state.toggle;
    this.setState({ toggle }); //this.state.toggle =toggle is incorrect
  }
  handleDelete = async (course) => {
    const courses = [...this.state.courses];
    const newCoures = courses.filter((c) => c._id !== course._id);
    this.setState({ courses: newCoures });
    try {
      await deleteCourse(course._id);
    } catch (ex) {
      console.log("delete exception");
      if (ex.respond && ex.respond.status === 404)
        alert("This course had already been deleted");
      this.setState({ courses });
    }
  };
  handleAdd = async () => {
    const obj = { courseId: "491", courseName: "SER", semesterOffered: "SP" };
    const { data: course } = await saveCourse(obj);
    console.log(course);
    const courses = [course, ...this.state.courses];
    this.setState({ courses });
  };
  handleAddToSchedule = async () => {
    // handle the add to schedule here
    // add the selected course to the current users schedule
  };
  filterCoursesByName = () => {
    let courses = [this.state.courses];
    if (this.state.query) {
      const filtered = courses.filter((c) =>
        c.name.toLowerCase().startsWith(this.state.query.toLowerCase())
      );
      courses = filtered;
    }
    return courses;
  };
  render() {
    const courses = this.filterCoursesByName();
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
          <TableHead />
          <TableBody
            courses={this.state.courses}
            onDelete={this.handleDelete}
            onAddToSchedule={this.handleAddToSchedule}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
