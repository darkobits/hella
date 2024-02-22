import { style } from '@vanilla-extract/css';


const classes = {
  contentAndFooter: style({
    minWidth: '100%'
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
