import React from "react";
import "./ButtonStyles.css";
// style={{ backgroundColor: 'transparent' }}
const Button = ({ onClick, buttonText, className, isDirectedMain }) => {
  // console.log(isDirectedMain)
  // const {onClick, buttonText, className} = {props}
  return (
    <button
      onClick={onClick ? () => onClick(buttonText, isDirectedMain) : null}
      // style={{ backgroundColor: "transparent" }}
      className={className}
    >
      {buttonText}
    </button>
  );
};
export default Button;
