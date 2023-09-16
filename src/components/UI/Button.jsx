import React, { useState } from "react";
import classCondition from "../../utils/classCondition"

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
    type={type}
      className={classCondition("bg-primary text-white border-primary border-2 hover:text-primary hover:bg-white px-1 rounded")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
