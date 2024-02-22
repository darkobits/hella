'use client';

import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar } from 'react-bootstrap/Navbar';
import { isMobile } from 'react-device-detect';

import classes from './Navbar.css';

import ChartIcon from '~icons/bi/bar-chart.jsx';
import GearIcon from '~icons/bi/gear.jsx';
import HouseIcon from '~icons/bi/house.jsx';
import MusicPlayerIcon from '~icons/bi/music-player.jsx';


const routes = [{
  name: 'home',
  label: 'Hella',
  path: '/',
  Icon: HouseIcon
}, {
  name: 'page1',
  label: 'Mumblecore',
  path: '/mumblecore',
  Icon: MusicPlayerIcon
}, {
  name: 'stonks',
  label: 'Stonks',
  path: '/stonks',
  Icon: ChartIcon
}, {
  name: 'settings',
  label: 'Settings',
  path: '/settings',
  Icon: GearIcon
}];


export function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <BsNavbar
      className={classes.navbar}
      variant="dark"
    >
      <Container className="px-1">
        <Nav className="mr-auto" navbar as="ul">
          {routes.map(({ label, name, path }, index) => {
            return (
              <Nav.Item key={name} as="li">
                <Nav.Link
                  as={Link}
                  href={path}
                  // Assume the first route maps to `/` and should be used as
                  // our brand.
                  className={cx(
                    index === 0 && 'navbar-brand',
                    pathname === path ? 'active' : ''
                  )}
                >
                  {label}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <BsNavbar.Text className="text-secondary px-2 d-none d-sm-none d-md-inline">
          We can pickle that.
        </BsNavbar.Text>
      </Container>
    </BsNavbar>
  );
}


export function MobileNavbar() {
  return (
    <BsNavbar
      variant="dark"
      className={classes.mobileNavbar}
    >
      <Nav as="ul">
        {routes.map(routeConfig => {
          const { Icon, label, name, path } = routeConfig;

          return (
            <Nav.Item key={name} as="li">
              <Nav.Link
                as={Link}
                href={path}
              >
                <Icon />{label}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </BsNavbar>
  );
}


export function Navbar() {
  return (
    isMobile ? <MobileNavbar /> : <DesktopNavbar />
  );
}
