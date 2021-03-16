import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Router/routes';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap/';
import hooks from '../../Hooks';

/**
 * Navigation bar
 */

export const NavBar = () => {
  hooks.useUserPers();
  const { isLogged, displayName, tokenId, role } = hooks.useUserData();

  hooks.useSubjects(tokenId);
  const { subjects } = hooks.useQuizData();

  const subjectsList = subjects.map((subj, key) => (
    <NavDropdown.Item as={Link} to={`/subj/${subj.id}`} key={key}>
      {subj.id}
    </NavDropdown.Item>
  ));

  const adminRoutes =
    role === 'admin' ? (
      <Nav.Link as={Link} to={routes.NEW_QUIZ}>
        New Quiz
      </Nav.Link>
    ) : null;

  if (!isLogged)
    return (
      <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={routes.HOME}>
              HOME
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to={routes.SIGN_IN}>
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to={routes.SIGN_UP}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  else
    return (
      <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={routes.HOME}>
              HOME
            </Nav.Link>
            {adminRoutes}
            <NavDropdown title="Subjects" id="collasible-nav-dropdown">
              {subjectsList}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>{displayName}</Nav.Link>
            <Nav.Link as={Link} to={routes.SIGN_OUT}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};
