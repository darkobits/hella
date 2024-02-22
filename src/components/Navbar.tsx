import cx from 'classnames';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { routes } from 'routes';

import classes from './Navbar.css';


export const DesktopNavbar = () => (
  <Navbar
    className={classes.navbar}
    variant="dark"
  >
    <Container className="px-1">
      <Nav className="mr-auto" navbar as="ul">
        {routes.map(({ label, name, path }, index) => {
          return (
            <Nav.Item key={name} as="li">
              <Nav.Link
                as={NavLink}
                to={path}
                // Assume the first route maps to `/` and should be used as
                // our brand.
                className={cx(index === 0 && 'navbar-brand')}
              >
                {label}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Navbar.Text className="text-secondary px-2">
        We can pickle that.
      </Navbar.Text>
    </Container>
  </Navbar>
);
