import { style } from '@vanilla-extract/css';

// import { GRAY_SLIGHTLY_DARKER } from 'etc/colors';


const classes = {
  companyLogo: style({
    borderRadius: '50%'
  }),
  // bgSlightlyDarker: style({
  //   backgroundColor: GRAY_SLIGHTLY_DARKER
  // }),
  price: style({
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: 'tnum',
    fontSize: '14px',
    fontWeight: 500
  })
};


export default classes;
