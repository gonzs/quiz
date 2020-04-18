import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, ADMGER, IA } from '../constants/routes';
import { Nav, Navbar } from 'react-bootstrap/';

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={HOME}>
            HOME
          </Nav.Link>
          <Nav.Link as={Link} to={ADMGER}>
            ADMINISTRACION GERENCIAL
          </Nav.Link>
          <Nav.Link as={Link} to={IA}>
            INTELIGENCIA ARTIFICIAL
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>More...</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
