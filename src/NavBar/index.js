import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, ADMGER, IA } from '../constants/routes';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return (
    <Nav justify variant="tabs" defaultActiveKey={HOME}>
      <Nav.Item>
        <Nav.Link as={Link} to={HOME}>
          HOME
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to={ADMGER}>
          ADMINISTRACION GERENCIAL
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to={IA}>
          INTELIGENCIA ARTIFICIAL
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
