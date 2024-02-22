import { globalStyle } from '@vanilla-extract/css';

import { GRAY_DARKER } from 'etc/colors';
import {
  FONT_FAMILY_MONOSPACE,
  FONT_FAMILY_SANS
} from 'etc/constants';


// ----- General Settings ------------------------------------------------------

// Global border box hack.
globalStyle('*, *:before, *:after', { boxSizing: 'border-box' });

// Optionally enable this rule to prevent overscroll entirely.
globalStyle('*', { overscrollBehavior: 'none' });


// ----- Text Settings ---------------------------------------------------------

globalStyle('body', {
  // Effectively .text-light.
  color: 'rgba(var(--bs-light-rgb), var(--bs-text-opacity))',
  fontFamily: FONT_FAMILY_SANS,
  fontWeight: 400
});

globalStyle('*', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textRendering: 'optimizeLegibility',
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased'
});


// ----- Layout Settings -------------------------------------------------------

globalStyle('html, body, #root', {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 0,
  padding: 0
});

globalStyle('#root', {
  display: 'flex',
  flexDirection: 'column'
});

// N.B. Required to get these elements to fill the entire screen on certain
// devices in PWA/standalone mode. However, if these are set when viewing in
// Mobile Safari, it will cause the mobile navbar to be rendered behind browser
// chrome.
globalStyle('html.standalone #root', {
  width: '100vw',
  height: '100vh'
});


// ----- Bootstrap Overrides ---------------------------------------------------

globalStyle('html[data-bs-theme="dark"] body', {
  backgroundColor: GRAY_DARKER
});

globalStyle(':root', {
  // vars: {
  //   // Debugging
  //   '--env-safe-area-inset-bottom': 'env(safe-area-inset-bottom, 0px)',

  //   '--bs-text-opacity': '1',

  //   // Standard Bootstrap colors.
  //   '--bs-blue': '#0d6efd',
  //   '--bs-indigo': '#6610f2',
  //   '--bs-purple': '#6f42c1',
  //   '--bs-pink': '#d63384',
  //   '--bs-red': '#dc3545',
  //   '--bs-orange': '#fd7e14',
  //   '--bs-yellow': '#ffc107',
  //   '--bs-green': '#198754',
  //   '--bs-teal': '#20c997',
  //   '--bs-cyan': '#0dcaf0',
  //   '--bs-white': '#fff',
  //   '--bs-gray': '#6c757d',
  //   '--bs-gray-dark': '#343a40',
  //   '--bs-primary': '#0d6efd',
  //   '--bs-secondary': '#6c757d',
  //   '--bs-success': '#198754',
  //   '--bs-info': '#0dcaf0',
  //   '--bs-warning': '#ffc107',
  //   '--bs-danger': '#dc3545',
  //   '--bs-light': '#f8f9fa',
  //   '--bs-dark': '#212529',
  //   '--bs-font-sans-serif': FONT_FAMILY_SANS,
  //   '--bs-font-monospace': FONT_FAMILY_MONOSPACE,
  //   '--bs-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))'
  // }
});


// TODO: This is the correct place to apply a min-width to prevent
// responsiveness below this width. However, we need to expose this to
// consumers to make this component more agnostic.
globalStyle('html.desktop .container', {
  '@media': {
    '(max-width: 992px)': {
      width: '960px !important',
      minWidth: '960px !important'
    }
  }
});


// Links.
globalStyle('a:not(.nav-link).active', {
  color: 'var(--bs-white)'
});

// Navbars.
globalStyle([
  '.navbar .nav-link.active',
  '.navbar .nav-link:active'
].join(', '), {
  color: 'var(--bs-pink) !important'
});

// Text.
globalStyle('p', {
  lineHeight: 1.8
});

globalStyle('.text-monospace', {
  fontFamily: FONT_FAMILY_MONOSPACE,
  fontSize: '0.9em'
});

globalStyle('.text-monospace::placeholder', {
  fontFamily: FONT_FAMILY_MONOSPACE
});


// ----- Miscellany ------------------------------------------------------------

/**
 * Styles the loading spinner that is displayed to the user before the
 * application is rendered.
 */
globalStyle('#root > .spinner-border', {
  width: '128px',
  height: '128px',
  color: 'var(--bs-gray)',
  margin: 'auto'
});

/**
 * Ensure the React Query Devtools button does not obscure the mobile navigation
 * menu.
 */
// globalStyle('.ReactQueryDevtools button', {
//   bottom: `${MOBILE_NAVBAR_HEIGHT}px !important`,
//   '@media': {
//     [bp('lg')]: {
//       bottom: '-4px !important'
//     }
//   }
// });
