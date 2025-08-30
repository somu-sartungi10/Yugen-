import { NavLink } from "react-router-dom";
import React from "react";

const Button = ({ label, to,icon }) => {

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-1  text-base flex gap-1 items-center   rounded-lg transition-colors ${
          isActive
            ? "bg-primary/40 border border-primary  text-text"
            : "hover:bg-primary/10 hover:border hover:border-primary/80 rounded-  transition  ease-in-out duration-200"
        }`
      }
    >
      <div>
        {icon}
      </div>

      <div className="font-bold">
      {label}
      </div>
    </NavLink>
  );
};

export default Button;
