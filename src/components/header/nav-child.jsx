import React from "react";
import { Link } from "react-router-dom";

const NavChild = ({ nav, test }) => {
  return (
      <Link to={nav.href}  className="py-3" >
        <li >{nav.label}</li>
      </Link>
  );
};

export default NavChild;
