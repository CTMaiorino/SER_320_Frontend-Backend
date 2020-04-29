import React from "react";
const ToggleButton = props => {
  return (
    <button
      type="button"
      onClick={props.whenYouClick}
      className={props.toggle ? "btn btn-danger" : "btn btn-primary"}
    >
      Click Me
    </button>
  );
};

export default ToggleButton;
