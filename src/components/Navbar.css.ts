import { style, globalStyle } from '@vanilla-extract/css';

import { GRAY_LIGHTER, NAVBAR_BACKGROUND_COLOR } from 'etc/colors';
import { MOBILE_NAVBAR_HEIGHT } from 'etc/constants';


const classes = {
  navbar: style({
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
    filter: 'drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.2))',
    zIndex: 1
  }),
  mobileNavbar: style({
    position: 'unset',
    padding: 0,
    filter: 'drop-shadow(0px -6px 10px rgba(0, 0, 0, 0.5))',
    maxHeight: `${MOBILE_NAVBAR_HEIGHT}px`,
    zIndex: 1
  })
};

// Move to global styles if common with desktop navbar?
globalStyle(`${classes.mobileNavbar} ul.navbar-nav`, {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'stretch'
});

// Move to global styles if common with desktop navbar?
globalStyle(`${classes.mobileNavbar} .nav-link`, {
  alignItems: 'center',
  color: GRAY_LIGHTER,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  fontWeight: 500,
  justifyContent: 'space-between',
  padding: 0,
  userSelect: 'none',
  // N.B. We apply padding here rather than to parent containers to allow link
  // elements to fill the entire height of the nav bar, thus increasing their
  // hit box significantly.
  paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
  paddingTop: '16px'
});

globalStyle(`${classes.mobileNavbar} svg`, {
  height: '20px',
  marginBottom: '6px',
  width: '20px'
});


export default classes;
