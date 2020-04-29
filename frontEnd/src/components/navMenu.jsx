import React, { Component } from "react";
// Component that will return an unordered list
export class NavMenu extends Component {
  state = {
    numlist: [1, 2, 3, 4, 5]
  };
  render() {
    return (
      <ul>
        {this.state.numlist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}
