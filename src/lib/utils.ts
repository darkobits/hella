import { BOOTSTRAP_BREAKPOINTS } from 'etc/constants';


/**
 * Bootstrap media query helper.
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
 * Provided a company's domain name, returns the URL to use in an image tag to
 * load that logo.
 */
export function getCompanyLogoUrl(symbol: string) {
  return `https://universal.hellopublic.com/companyLogos/${symbol}@2x.png`;
}
