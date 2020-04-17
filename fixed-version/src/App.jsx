import React from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Login from "./pages/Login/Login";
import UserDashBoard from "./pages/DashBoard/UserDashBoard";
import AdminDashBoard from "./pages/DashBoard/AdminDashBoard";
import ManageStudent from "./pages/DashBoard/ManageStudent";
import NavBar from "./components/NavBar/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#CF658D" },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/dashboard">
            <UserDashBoard />
          </Route>
          <Route path="/thispageisonlyforadmin/dashboardforadmin">
            <AdminDashBoard />
          </Route>
          <Route path="/admin/manage/:studentId">
            <ManageStudent />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
