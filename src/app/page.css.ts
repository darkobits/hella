import { style } from '@vanilla-extract/css';


export default {
  homeImg: style({
    opacity: 0.24
  }),
  heading: style({
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
    paddingLeft: '50px',
    paddingRight: '50px'
  }),
  invert: style({
    filter: 'invert(1)'
  })
};
