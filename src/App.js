import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { getRoutes } from "./routes";

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        {getRoutes()}
      </BrowserRouter>
    );
  }
}

export default App;
