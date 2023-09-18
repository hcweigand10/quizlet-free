import React, { useState } from "react";
import classCondition from "../../utils/classCondition"

const ButtonDanger = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
    type={type}
      className={classCondition(disabled ? "opacity-60" : "hover:text-red-500 hover:bg-white", "bg-red-500 text-white border-red-500 border-2 px-1 rounded mr-2")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonDanger;
