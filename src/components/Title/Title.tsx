import React from "react";
import "./Title.css";

function Title({ text, className = "" }) {
  return <h1 className={`title ${className}`}>{text}</h1>;
}

export default Title;
