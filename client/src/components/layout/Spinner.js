import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <img src={spinner} alt="Loading..." style={spinnerStyle} />
);

const spinnerStyle = {
  width: "200px",
  display: "block",
  margin: "auto"
};

export default Spinner;
