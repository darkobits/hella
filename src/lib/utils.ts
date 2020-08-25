import { UAParser } from 'ua-parser-js';
import { BOOTSTRAP_BREAKPOINTS } from 'etc/constants';


/**
 * Bootstrap media query helper for CSS-in-JS.
 *
 * @example
 *
 * @media ${bp('sm')} {
 *   // ...
 * }
 */
export function bp(bpName: keyof typeof BOOTSTRAP_BREAKPOINTS, minMax: 'min' | 'max' = 'min') {
  const bpValue = BOOTSTRAP_BREAKPOINTS[bpName];

  if (bpValue === undefined) {
    throw new Error(`Invalid breakpoint: ${bpName}`);
  }

  const value = minMax === 'min' ? bpValue[0] : bpValue[1];

  return `(${minMax}-width: ${value}px)`;
}


/**
 * Returns true if the current device is a mobile device.
 */
export function isMobileDevice() {
  const results = new UAParser();
  const type =  results.getDevice().type;
  return type && ['mobile', 'tablet', 'wearable', 'embedded'].includes(type);
}
