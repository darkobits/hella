import { style } from '@vanilla-extract/css';


export default {
  jumbotron: style({
    background: 'linear-gradient(142deg, rgba(29,31,36,1) 0%, rgba(37,40,46,1) 100%)'
  }),
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
  })
};
