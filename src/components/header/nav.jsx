import React from "react";
import NavChild from "./nav-child";
const navLinks = [
  {
    href: "/",
    label: "Home",
    image: "",
  },
  {
    href: "/about",
    label: "About",
    image: "",
  },
  {
    href: "/services",
    label: "Services",
    image: "",
  },
  {
    href: "/books",
    label: "Books",
    image: "",
  },
  {
    href: "/login",
    label: "Login",
    image: "",
  },
  {
    href: "/register",
    label: "Register",
    image: "",
  },
];

// hooks - react built in fn
const Nav = () => {
  return (
    <div>
      <ul className="flex justify-center gap-5 bg-violet-500 text-white">
        {navLinks.map((nav, index) => (
          <NavChild nav={nav} test="dev" key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Nav;
