import { styled } from 'linaria/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { GRAY_LIGHTER, NAVBAR_BACKGROUND_COLOR } from 'etc/colors';
import { MOBILE_NAVBAR_HEIGHT } from 'etc/constants';
import { routes } from 'routes';


// ----- Styles ----------------------------------------------------------------

const Styled = {
  Navbar: styled(Navbar)`
    background-color: ${NAVBAR_BACKGROUND_COLOR};
    height: ${MOBILE_NAVBAR_HEIGHT}px;
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) - 12px);
    padding-top: 0;

    .navbar-nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }

    & .nav-link {
      align-items: center;
      color: ${GRAY_LIGHTER};
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-weight: 500;
      justify-content: space-between;
      padding: 0;
      user-select: none;

      &:hover {
        color: var(--gray);
      }

      &.active {
        color: var(--white);
      }
    }

    & svg {
      height: 20px;
      margin-bottom: 6px;
      width: 20px;
    }
  `
};


// ----- Mobile Navbar ---------------------------------------------------------

export const MobileNavbar = () => (
  <Styled.Navbar
    fixed="bottom"
    variant="dark"
  >
    <Nav as="ul">
      {routes.map(routeConfig => (
        <Nav.Item
          key={routeConfig.name}
          as="li"
        >
          <NavLink
            to={routeConfig.pathname}
            exact={routeConfig.exact}
            className="nav-link"
            activeClassName="active"
          >
            {routeConfig.icon}{routeConfig.label}
          </NavLink>
        </Nav.Item>
      ))}
    </Nav>
  </Styled.Navbar>
);
