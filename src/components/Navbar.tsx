import { styled } from 'linaria/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar as BsNavbar, Nav } from 'react-bootstrap';

import { GRAY_LIGHTER, NAVBAR_BACKGROUND_COLOR } from 'etc/colors';
import { NAVBAR_HEIGHT } from 'etc/constants';
import { routes } from 'routes';


// ----- Styles ----------------------------------------------------------------

const Styled = {
  BsNavbar: styled(BsNavbar)`
    background-color: ${NAVBAR_BACKGROUND_COLOR};
    min-height: ${NAVBAR_HEIGHT}px;

    & .navbar-nav .nav-link,
    & .navbar-brand {
      color: ${GRAY_LIGHTER};

      &:hover {
        color: var(--gray);
      }

      &.active {
        color: var(--white);
      }
    }
  `
};


// ----- Navbar ----------------------------------------------------------------

export const Navbar = () => (
  <Styled.BsNavbar fixed="top">
    <Container className="px-3">
      <Nav className="mr-auto" navbar as="ul">
        {routes.map((routeConfig, index) => (
          <Nav.Item
            key={routeConfig.name}
            as="li"
          >
            <NavLink
              to={routeConfig.pathname}
              exact={routeConfig.exact}
              className={index === 0 ? 'navbar-brand' : 'nav-link'}
              activeClassName="active"
            >
              {routeConfig.label}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
      <BsNavbar.Text className="text-secondary">
        We can pickle that.
      </BsNavbar.Text>
    </Container>
  </Styled.BsNavbar>
);
