import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import sgNavbarStyles from "./style.module.scss";

class sgNavbar extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" >
        <Navbar.Brand href="/" className = {sgNavbarStyles.brand}>
          <span className={sgNavbarStyles.title}>GRB</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className={sgNavbarStyles.navigationLinks}>
          <Nav>
            <NavLink
              activeClassName={sgNavbarStyles.active}
              exact
              to="/"
              className="nav-link"
            >
              Home
            </NavLink>
            <NavLink
              activeClassName={sgNavbarStyles.active}
              to="/poems"
              className="nav-link"
            >
              Poems
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default sgNavbar;
