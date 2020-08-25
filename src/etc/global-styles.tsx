/* eslint-disable @typescript-eslint/no-unused-expressions */
import { css } from 'linaria';
import { lighten, rgba } from 'polished';

import { GRAY_DARKER, GRAY_DARK } from 'etc/colors';
import {
  FONT_FAMILY_MONOSPACE,
  FONT_FAMILY_SANS,
  MOBILE_NAVBAR_HEIGHT,
  NAVBAR_HEIGHT
} from 'etc/constants';
import { isMobileDevice } from 'lib/utils';


// ----- Global Styles ---------------------------------------------------------

css`
  :global() {
    *, *:before, *:after {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-rendering: optimizeLegibility;
    }

    body {
      background-color: ${GRAY_DARKER};
      font-family: ${FONT_FAMILY_SANS};
      font-weight: 400;
    }

    #content {
      height: 100%;

      /**
       * This allows any child component to create a 100% height container using
       * flex-grow: 1 and not incur any odd scrolling / margin-collapsing
       * issues.
       */
      .container {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;


// ----- Mobile / Desktop Styling ----------------------------------------------

/**
 * Class name that should be applied to <html> when on mobile devices to ensure
 * proper layout / scroll behavior. These should not be edited without extensive
 * testing to ensure no regressions were made.
 */
const mobileStyles = css`
  height: 100vh;
  width: 100vw;

  & body {
    height: 100vh;
    position: fixed;
    width: 100vw;
  }

  & #root {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: env(safe-area-inset-top, 0px);
  }

  & #content {
    padding-bottom: ${MOBILE_NAVBAR_HEIGHT}px;
    overflow-y: scroll;
    height: 100%;
  }
`;


const desktopStyles = css`
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;

  & body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  & #root {
    height: 100vh;
    padding-top: ${NAVBAR_HEIGHT}px;
    width: 100vw;
  }

  /**
    * Container width at the md breakpoint. Limits responsiveness below this
    * width.
    */
  .container {
    min-width: 720px;
  }
`;

if (isMobileDevice()) {
  document.querySelector('html')?.classList.add(mobileStyles);
} else {
  document.querySelector('html')?.classList.add(desktopStyles);
}


// ----- Bootstrap Overrides ---------------------------------------------------

css`
  :global() {
    p {
      line-height: 1.8;
    }

    .form-control {
      background-color: ${lighten(0.03, GRAY_DARKER)};
      border-color: var(--secondary);
      color: var(--light);

      &:focus {
        background-color: ${lighten(0.05, GRAY_DARKER)};
        border-color: var(--secondary);
        box-shadow: 0px 0px 0px 0.2rem ${rgba(GRAY_DARK, 1)};
        color: var(--light);
      }
    }

    .text-monospace {
      font-family: ${FONT_FAMILY_MONOSPACE};
      font-size: 0.9em;

      /* If this class is applied to an input, make its placeholder text match. */
      &::placeholder {
        font-family: ${FONT_FAMILY_MONOSPACE};
      }
    }
  }
`;
