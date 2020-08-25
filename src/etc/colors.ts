import { darken, lighten } from 'polished';


/**
 * Bootstrap's --gray-dark color.
 */
export const GRAY_DARK = '#343A40';
export const GRAY_SLIGHTLY_DARKER = darken(0.05, GRAY_DARK);
export const GRAY_DARKER = darken(0.1, GRAY_DARK);
export const GRAY_LIGHTER = lighten(0.14, GRAY_DARK);


export const NAVBAR_BACKGROUND_COLOR = darken(0.16, GRAY_DARK);
