import React, { Component } from "react";
import Table from "./table";
import NavBar from "./components/navBar";
import { Switch, Route, Redirect } from "react-router-dom";

import About from "./components/about";
import NotFound from "./components/notFound";
import StudentDetails from "./components/studentDetails";
import CourseDetails from "./components/coursesDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import Logout from "./components/logout";
import studentTable from "./studentTable";
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <body className="backgroud-color">
        <div className="container">
          <NavBar user={user} />
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/student/:id" component={StudentDetails} />
            <Route path="/students" component={studentTable} />
            <Route path="/logout" component={Logout} />
            <Route path="/about" component={About}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Table}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </body>
    );
  }
}

export default App;
