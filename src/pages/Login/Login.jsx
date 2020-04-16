import React, { useState } from "react";
import "./Login.scss";
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

const Login = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
    console.log(credentials);
  };

  return (
    <>
      <div className="background"></div>
      <div className="nav"></div>
      <div className="login-container">
        <img className="logo" src={Logo} alt="larchureg" />
        <div className="version-text">Version 1.0 - 2020</div>
        <h2>
          Login to Register
          <span> Use CUNET Account</span>
        </h2>
        <div className="input-container">
          <Input
            id="id"
            style={{ height: "56px", width: "320px" }}
            type="text"
            placeholder="Student ID (Ex. 59XXXXXXXX)"
            value={credentials.id}
            onChange={handleChange("id")}
          />

          <Input
            id="password"
            style={{ marginTop: "24px", height: "56px", width: "320px" }}
            type={showPassword ? "text" : "password"}
            placeholder="CUNET Password"
            value={credentials.password}
            onChange={handleChange("password")}
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
