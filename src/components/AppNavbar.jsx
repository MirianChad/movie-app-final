import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSun, FaMoon } from "react-icons/fa";
import "./AppNavbar.css";

function AppNavbar({ toggleTheme, isDarkMode }) {
  return (
    <Navbar
      expand="lg"
      variant={isDarkMode ? "dark" : "light"}
      className="fixed-top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          MovieApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
          </Nav>
          <Button onClick={toggleTheme} variant={isDarkMode ? "outline-light" : "outline-dark"}>
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? " Light Mode" : " Dark Mode"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
