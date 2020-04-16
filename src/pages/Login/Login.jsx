import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.scss";

import { database } from "../../firebase";
import Logo from "../../shared/images/logo.png";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const buttonStyle = {
  marginTop: "32px",
  width: "160px",
  height: "41px",
  backgroundColor: "#CF658D",
  borderRadius: "2px",
};

const usersDatabase = database.ref("users");

const Login = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState({ path: "", go: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const login = () => {
    usersDatabase.child(credentials.id).once(
      "value",
      (snapshot) => {
        const snap = snapshot.val();
        if (snap) {
          const type = snap.type.toString();
          // Correct Password
          if (snap.password.toString() === credentials.password) {
            setCurrentUser(credentials.id, snap.info.name);
            setRedirect({
              path: type === "student" ? "dashboard" : "admin/dashboard",
              go: true,
            });
            // Incorrect Password
          } else {
            setErrors(["Password"]);
          }
          // Incorrect Username
        } else {
          setErrors(["Username"]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const setCurrentUser = (id, name) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
  };

  const onEnter = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) login();
  };

  if (redirect.go) {
    return <Redirect to={`/${redirect.path}`} />;
  } else
    return (
      <>
        <div className="background"></div>
        <div className="login-container">
          <img className="logo" src={Logo} alt="larchureg" />
          <div className="version-text">Version 1.0 - 2020</div>
          <h2>
            Login to Register
            <span> Use CUNET Account</span>
          </h2>

          <div className="input-container">
            {errors.map((err) => (
              <h4>{`Incorrect ${err}`}</h4>
            ))}
            <Input
              error={errors.includes("Username")}
              id="id"
              style={{ height: "56px", width: "320px" }}
              type="text"
              placeholder="Student ID (Ex. 59XXXXXXXX)"
              value={credentials.id}
              onChange={handleChange("id")}
              onKeyDown={(e) => onEnter(e)}
            />

            <Input
              error={errors.includes("Password")}
              id="password"
              style={{ marginTop: "24px", height: "56px", width: "320px" }}
              type={showPassword ? "text" : "password"}
              placeholder="CUNET Password"
              value={credentials.password}
              onChange={handleChange("password")}
              onKeyDown={(e) => onEnter(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Button
              style={buttonStyle}
              variant="contained"
              color="primary"
              onClick={login}
              disableElevation
            >
              SIGN IN
            </Button>

            <div className="bottom-text">For System Security Demo Only</div>
          </div>
        </div>
      </>
    );
};

export default Login;
