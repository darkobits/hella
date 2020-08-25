import { style } from '@vanilla-extract/css';

import { GRAY_SLIGHTLY_DARKER } from 'etc/colors';


const classes = {
  // symbolsTable: style({}),
  // tabularNumbers: style({
  //   fontVariantNumeric: 'tabular-nums',
  //   fontFeatureSettings: 'tnum'
  // }),
  // compact: style({
  //   whiteSpace: 'nowrap',
  //   width: '150px'
  // }),
  bgSlightlyDarker: style({
    backgroundColor: GRAY_SLIGHTLY_DARKER
  }),
  price: style({
    fontVariantNumeric: 'tabular-nums',
    fontFeatureSettings: 'tnum',
    fontSize: '14px'
  })
};

// globalStyle(`${classes.symbolsTable} thead th`, {
//   backgroundColor: GRAY_SLIGHTLY_DARKER
// });

// globalStyle(`${classes.symbolsTable} td`, {
//   verticalAlign: 'middle'
// });


export default classes;
