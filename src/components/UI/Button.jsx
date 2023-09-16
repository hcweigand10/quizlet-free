import React, { useState } from "react";
import classCondition from "../../utils/classCondition"

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
    type={type}
      className={classCondition(disabled ? "opacity-60" : "hover:text-primary hover:bg-white", "bg-primary text-white border-primary border-2 px-1 rounded mr-2")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
