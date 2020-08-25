import { globalStyle, style } from '@vanilla-extract/css';

import { BS_VARIANTS } from 'etc/constants';


const classes = {
  toaster: style({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // Allow pointer events to pass-through this element.
    pointerEvents: 'none',
    // Ensures a minimum padding of 10px, or enough to avoid unsafe areas,
    // whichever is greater.
    paddingTop: 'max(env(safe-area-inset-top, 0px), 10px)',
    paddingLeft: 'max(env(safe-area-inset-left, 0px), 10px)',
    paddingRight: 'max(env(safe-area-inset-right, 0px), 10px)',
    paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)',
    zIndex: 1
  }),
  toastList: style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 0,
    // Allow the user to interact with this element.
    pointerEvents: 'all',
    // Push toasts to the right side of the screen.
    alignItems: 'flex-end'
  })
};

globalStyle(`${classes.toaster} .toast-header`, {
  position: 'relative',
  background: 'none'
});

globalStyle(`${classes.toaster} .toast-header *`, {
  zIndex: 1
});

// We shouldn't have to do this, but toast headers / buttons are not getting the
// right colors applied.
for (const variant of BS_VARIANTS) {
  globalStyle(`.toast.${variant} .toast-header`, {
    backdropFilter: 'brightness(0.5)',
    borderColor: `var(--bs-${variant})`,
    // @ts-expect-error
    '-webkit-backdrop-filter': 'brightness(0.5)'
  });

  globalStyle(`.toast.${variant} .toast-body button`, {
    background: 'none',
    backdropFilter: 'brightness(0.5)',
    borderColor: `rgba(var(--bs-${variant}-rgb), 0.3)`,
    // @ts-expect-error
    '-webkit-backdrop-filter': 'brightness(0.5)'
  });
}


export default classes;
