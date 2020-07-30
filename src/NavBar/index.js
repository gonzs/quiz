import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, SUB1, SUB2, SIGN_IN } from '../Router/routes';
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
          <Nav.Link as={Link} to={SUB1}>
            SUBJECT 1
          </Nav.Link>
          <Nav.Link as={Link} to={SUB2}>
            SUBJECT 2
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to={SIGN_IN}>
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
