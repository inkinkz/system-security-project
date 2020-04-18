import React from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";

import AssignmentIcon from "@material-ui/icons/Assignment";
import StarIcon from "@material-ui/icons/Star";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SideBar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const name = localStorage.getItem("name").toString();
  const timeTableShow =
    localStorage.getItem("accountType") === "student" ? "" : "none";
  return (
    <div className="side-bar">
      <div className="user-info">
        <div className="greeting">
          Hello{localStorage.accountType === "admin" ? " Admin" : ""},
        </div>
        <div className="name">{name.substring(0, name.indexOf(" "))} </div>
        <div className="type">{localStorage.getItem("accountType")}</div>
      </div>
      <hr />

      <ul className="menu">
        <li>
          <div className="icon">
            <AssignmentIcon />
          </div>
          <Link className="link" to="/dashboard">
            Overall Result
          </Link>
        </li>
        <li>
          <div className="icon">
            <StarIcon />
          </div>
          Course Registration
        </li>
        <li style={{ display: timeTableShow }}>
          <div className="icon">
            <CalendarTodayIcon />
          </div>
          Class Timetable
        </li>
        <li>
          <div className="icon">
            <AccessibilityNewIcon />
          </div>
          Personal Information
        </li>
      </ul>
      <hr />
      <ul className="menu">
        <li onClick={() => logout()}>
          <div className="icon">
            <ExitToAppIcon />
          </div>
          Log out
        </li>
      </ul>
      <div className="copyright">Copyright &copy; 2020 RegPlsUseMyDesign</div>
    </div>
  );
};

export default SideBar;
