import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { routes } from 'routes';

import classes from './MobileNavbar.css';


export const MobileNavbar = () => (

  <Navbar
    variant="dark"
    className={classes.navbar}
  >
    <Nav as="ul">
      {routes.map(routeConfig => {
        const { Icon, label, name, path } = routeConfig;

        return (
          <Nav.Item key={name} as="li">
            <Nav.Link
              as={NavLink}
              to={path}
            >
              <Icon />{label}
            </Nav.Link>
          </Nav.Item>
        );
      })}
    </Nav>
  </Navbar>
);
