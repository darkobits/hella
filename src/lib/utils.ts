import { UAParser } from 'ua-parser-js';

import { BOOTSTRAP_BREAKPOINTS } from 'etc/constants';


/**
 * Throws an error if called outside of a browser.
 */
export function assertIsBrowser(label?: string) {
  if (
    typeof window !== 'undefined' &&
    typeof globalThis !== 'undefined' &&
    globalThis === window
  ) {
    return;
  }

  if (label) {
    throw new Error(`[${label}] Not in a browser environment.`);
  }

  throw new Error('Not in a browser environment.');
}


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
 * @private
 *
 * Internal state for isMobileDevice.
 */
let isMobileDeviceValue: boolean;


/**
 * Returns true if the current device is a mobile device.
 */
export function isMobileDevice() {
  if (!isMobileDeviceValue) {
    assertIsBrowser('isMobileDevice');
    const results = new UAParser();
    const type =  results.getDevice().type;
    if (!type) return;
    isMobileDeviceValue = ['mobile', 'tablet', 'wearable', 'embedded'].includes(type);
  }

  return isMobileDeviceValue;
}


/**
 * Returns `true` if we are operating in "standalone" mode as a PWA.
 */
export function isStandalone() {
  assertIsBrowser('isStandalone');
  return Boolean(Reflect.get(navigator, 'standalone'));
}
