import React from "react";
import "./NavBar.scss";
import Logo from "../../shared/images/nav_logo.png";

const NavBar = () => {
  return (
    <div className="nav">
      <img src={Logo} alt="lachu" />
    </div>
  );
};

export default NavBar;
