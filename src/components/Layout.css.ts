import { style } from '@vanilla-extract/css';

// Note: We may need to reinstate the 100v(w|h) rule in standalone mode on the
// root element if layout issues arise.

const classes = {
  root: style({
    position: 'fixed',
    inset: 0,
    // Create a gradient overlay at the top of the screen that fills the unsafe
    // area.
    ':before': {
      display: 'block',
      content: ' ',
      top: 0,
      left: 0,
      right: 0,
      height: 'env(safe-area-inset-top, 0px)',
      position: 'absolute',
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))'
    }
  }),
  contentAndFooter: style({
    minWidth: '100%',
    width: 'fit-content'
  }),
  content: style({
    // This may result in zero padding, but Bootstrap's <Container> should
    // provide adequate padding for most cases.
    paddingTop: 'env(safe-area-inset-top, 0px)',
    paddingRight: 'env(safe-area-inset-right, 0px)',
    paddingLeft: 'env(safe-area-inset-left, 0px)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)'
  })
};


export default classes;
