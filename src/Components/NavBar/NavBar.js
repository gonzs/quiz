import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../Router/routes';
import { Nav, Navbar } from 'react-bootstrap/';
import { useUserData } from '../../Hooks';

export const NavBar = () => {
  const { isLogged, displayName } = useUserData();

  return (
    <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={routes.HOME}>
            HOME
          </Nav.Link>
          <Nav.Link as={Link} to={routes.SUB1}>
            SUBJECT 1
          </Nav.Link>
          <Nav.Link as={Link} to={routes.SUB2}>
            SUBJECT 2
          </Nav.Link>
        </Nav>
        {!isLogged && (
          <Nav>
            <Nav.Link as={Link} to={routes.SIGN_IN}>
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to={routes.SIGN_UP}>
              Register
            </Nav.Link>
          </Nav>
        )}

        {isLogged && (
          <Nav>
            <Nav.Link>{displayName}</Nav.Link>
            <Nav.Link as={Link} to={routes.SIGN_OUT}>
              Sign Out
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
