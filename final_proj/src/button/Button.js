import React from "react";

export const Button = ({ onClick, buttonText, className, isDirectedMain }) => {
  // console.log(isDirectedMain)
  // const {onClick, buttonText, className} = {props}
  return (
    <button
      onClick={onClick ? () => onClick(buttonText, isDirectedMain) : null}
      className={className}
    >
      {buttonText}
    </button>
  );
};
