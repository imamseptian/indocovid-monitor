import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { theme } from "../theme";
import { Home, Hospital } from "../views";

const index = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/hospital">
          <Hospital />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default index;
