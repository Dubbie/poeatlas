import React from "react";

const Counter = ({classes, completed, total}) => {
  return (
    <span class = {classes}>
      {completed}/{total}
    </span>
  );
}

export default Counter;
