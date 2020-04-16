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

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#CF658D" },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          {/* <Route path="/todo">
        <Todo />
        </Route>*/}
          <Redirect to="/" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
