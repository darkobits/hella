'use client';

import cx from 'classnames';
import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import { AppProviders } from 'components/AppProviders';
import { Footer } from 'components/Footer';
import { DesktopNavbar, MobileNavbar } from 'components/Navbar';

import classes from './layout.css';


export default function App({ children }: React.PropsWithChildren) {
  return (
    <React.StrictMode>
      <AppProviders>
        <Stack className="h-100">
          {/* Desktop Navbar */}
          {!isMobile && <DesktopNavbar />}

          {/* Content */}
          <Stack className={cx(classes.contentAndFooter, 'overflow-auto')}>
            <Stack className={classes.content}>
              <Container className="d-flex flex-column flex-grow-1">
                {children}
              </Container>
            </Stack>

            {/* Footer */}
            <Footer />
          </Stack>

          {/* Mobile Navbar */}
          {isMobile && <MobileNavbar />}
        </Stack>
      </AppProviders>
    </React.StrictMode>
  );
}
