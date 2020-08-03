import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Router, Switch } from "react-router-dom";
import "./App.scss";
import { getRoutes } from "./routes";
import history from "./utils/history"
class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
        {getRoutes()}
        </Switch>
      </Router>
    );
  }
}

export default App;
