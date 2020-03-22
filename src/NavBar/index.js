import React from 'react';
import { Link } from 'react-router-dom';
import { HomeRoute, AdmgerRoute, IntartRoute } from '../routes';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey={HomeRoute}>
      <Nav.Item>
        <Nav.Link as={Link} to={HomeRoute}>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to={AdmgerRoute}>
          Administración Gerencial
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to={IntartRoute}>
          Inteligencia Artificial
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
