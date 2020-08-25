// ----- Breakpoints -----------------------------------------------------------

/**
 * Mapping of Bootstrap 4 breakpoint names to their minWidths.
 */
export const BOOTSTRAP_BREAKPOINTS = {
  xs: [0, 575],
  sm: [576, 765],
  md: [768, 991],
  lg: [992, 1199],
  xl: [1200]
};


// ----- Dimensions ------------------------------------------------------------

/**
 * Height of the desktop nav bar.
 */
export const NAVBAR_HEIGHT = 56;


/**
 * Height of the mobile nav bar.
 */
export const MOBILE_NAVBAR_HEIGHT = 84;


// ----- Typography ------------------------------------------------------------

/**
 * Character that can be used in elements where a space is needed, as JSX does
 * not handle whitespace or HTML entities well.
 */
export const NON_BREAKING_SPACE = '\u00A0';


/**
 * Default font settings.
 */
export const FONT_FAMILY_SANS = 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';


/**
 * Monospace font settings.
 */
export const FONT_FAMILY_MONOSPACE = '"Operator Mono SSm", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important';
