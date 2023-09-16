import React, { useState } from "react";
import classCondition from "../../utils/classCondition"

const ButtonGray = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
    type={type}
      className={classCondition(disabled ? "opacity-60" : "hover:text-slate-500 hover:bg-white", "bg-slate-500 text-white border-slate-500 border-2 px-1 rounded mr-2")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonGray;
