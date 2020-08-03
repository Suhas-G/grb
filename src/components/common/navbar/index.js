import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import sgNavbarStyles from "./style.module.scss";

import { useAuth0 } from "../../../auth/react-auth0-spa";
import { saveAuthData } from "../../../auth/auth_utils";

const SgNavbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  if (!isAuthenticated) {
    saveAuthData(false, null);
  }
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/" className={sgNavbarStyles.brand}>
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
          <div className = {sgNavbarStyles.loginBtn}>
            {!isAuthenticated && (
              <Button variant="outline-primary" onClick={() => loginWithRedirect({})}>Log in</Button>
            )}

            {isAuthenticated && (
              <Button variant="outline-danger"  onClick={() => logout()}>Log out</Button>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SgNavbar;
