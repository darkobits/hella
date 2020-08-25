import cx from 'classnames';
import React from 'react';
import Stack from 'react-bootstrap/Stack';


import { isMobileDevice } from 'lib/utils';

import classes from './Layout.css';


interface LayoutProps {
  /**
   * Component or JSX fragment to use as the navbar for the application. On
   * desktop devices, it will be placed before `content` at the top of the page.
   * On mobile devices, it will be placed after `content` at the bottom of the
   * page.
   */
  navbar: React.ReactNode;

  /**
   * Component or JSX fragment where UI content will be rendered.
   */
  content: React.ReactNode;

  /**
   * Optional footer to render after content.
   *
   * The footer is "sticky" and will always appear at the bottom of the content
   * pane, regardless of the amount of content.
   */
  footer?: React.ReactNode;
}


/**
 * Provides the root application skeleton using Bootstrap's Stack component,
 * which is a full-height flex column.
 *
 * - Ensures the provided navbar prop is rendered at the top of the viewport on
 *   desktop devices, and at the bottom on mobile devices.
 * - Ensures the navbar is fixed.
 * - Ensures the footer is always visible regardless of content length
 *   (ie: "sticky").
 * - Ensures proper overflow behavior for content.
 */
export const Layout = ({ navbar, content, footer }: LayoutProps) => {
  const flexDirectionClass = React.useMemo(() => (
    isMobileDevice() ? 'flex-column-reverse' : 'flex-column'
  ), []);

  const navbarMemo = React.useMemo(() => navbar, [navbar]);
  const contentMemo = React.useMemo(() => content, [content]);
  const footerMemo = React.useMemo(() => footer, [footer]);

  return (
    <Stack className={cx(classes.root, flexDirectionClass)}>
      {navbarMemo}
      <Stack className="overflow-auto">
        <Stack className={classes.contentAndFooter}>
          <Stack className={classes.content}>
            {contentMemo}
          </Stack>
          {footerMemo}
        </Stack>
      </Stack>
    </Stack>
  );
};
