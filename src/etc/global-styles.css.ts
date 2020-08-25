/* eslint-disable @typescript-eslint/no-unused-expressions */

import { globalStyle } from '@vanilla-extract/css';
import { lighten, rgba } from 'polished';

import {
  GRAY_DARKER,
  GRAY_DARK,
  GRAY_LIGHTER,
  NAVBAR_BACKGROUND_COLOR
} from 'etc/colors';
import {

  FONT_FAMILY_MONOSPACE,
  FONT_FAMILY_SANS,
  MOBILE_NAVBAR_HEIGHT,
  NAVBAR_HEIGHT
} from 'etc/constants';
import { bp } from 'lib/utils';


// ----- General Settings ------------------------------------------------------

// Global border box hack.
globalStyle('*, *:before, *:after', { boxSizing: 'border-box' });


// ----- PWA Settings ----------------------------------------------------------

globalStyle('html', {
  background: 'rgba(18, 20, 22)'
});

// These settings control how the application will appear when rendered as a PWA
// on various devices.
globalStyle('body', {
  background: 'linear-gradient(142deg, rgba(18, 20, 22, 1) 0%, rgba(25, 28, 31, 1) 100%)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover'
});

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

globalStyle(':root', {
  vars: {
    // Debugging
    '--env-safe-area-inset-bottom': 'env(safe-area-inset-bottom, 0px)',

    '--bs-text-opacity': '1',

    // Standard Bootstrap colors.
    '--bs-blue': '#0d6efd',
    '--bs-indigo': '#6610f2',
    '--bs-purple': '#6f42c1',
    '--bs-pink': '#d63384',
    '--bs-red': '#dc3545',
    '--bs-orange': '#fd7e14',
    '--bs-yellow': '#ffc107',
    '--bs-green': '#198754',
    '--bs-teal': '#20c997',
    '--bs-cyan': '#0dcaf0',
    '--bs-white': '#fff',
    '--bs-gray': '#6c757d',
    '--bs-gray-dark': '#343a40',
    '--bs-primary': '#0d6efd',
    '--bs-secondary': '#6c757d',
    '--bs-success': '#198754',
    '--bs-info': '#0dcaf0',
    '--bs-warning': '#ffc107',
    '--bs-danger': '#dc3545',
    '--bs-light': '#f8f9fa',
    '--bs-dark': '#212529',
    '--bs-font-sans-serif': FONT_FAMILY_SANS,
    '--bs-font-monospace': FONT_FAMILY_MONOSPACE,
    '--bs-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))'
  }
});

// globalStyle('body', {
//   // Effectively .text-light.
//   color: 'rgba(var(--bs-light-rgb), var(--bs-text-opacity))',
//   fontFamily: FONT_FAMILY_SANS,
//   fontWeight: 400
// });


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

globalStyle('.navbar', {
  backgroundColor: NAVBAR_BACKGROUND_COLOR,
  borderBottom: '1px solid rgba(42, 42, 42, 0.2)'
});

globalStyle('.navbar .nav-link', {
  color: `${GRAY_LIGHTER} !important`
});

globalStyle('.navbar.desktop .nav-link', {
  height: `${NAVBAR_HEIGHT}px`
});

// globalStyle('.navbar.mobile .nav-link', {
//   height: `${MOBILE_NAVBAR_HEIGHT}px`
// });

globalStyle('.navbar .nav-link:hover', {
  color: 'var(--bs-light) !important'
});

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

// Forms.

globalStyle('.form-control', {
  backgroundColor: lighten(0.05, GRAY_DARKER),
  borderColor: 'var(--bs-secondary)',
  color: 'var(--bs-light)'
});

globalStyle('.form-control:focus', {
  backgroundColor: lighten(0.05, GRAY_DARKER),
  borderColor: 'var(--bs-secondary)',
  boxShadow: `0px 0px 0px 0.2rem ${rgba(GRAY_DARK, 1)}`,
  color: 'var(--bs-light)'
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
globalStyle('.ReactQueryDevtools button', {
  bottom: `${MOBILE_NAVBAR_HEIGHT}px !important`,
  '@media': {
    [bp('lg')]: {
      bottom: '-4px !important'
    }
  }
});

// Hide overlay.
globalStyle('vite-plugin-checker-error-overlay', {
  display: 'none'
});
