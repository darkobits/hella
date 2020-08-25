import 'bootstrap/dist/css/bootstrap.css';

import 'etc/global-styles.css';
import 'etc/workbox-event-handlers';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'components/App';
import { assertIsBrowser, isMobileDevice } from 'lib/utils';


function render(selector: string, element: JSX.Element) {
  assertIsBrowser('render');

  const container = document.querySelector(selector);
  if (!container) throw new Error(`Element matching selector "${selector}" could not be found.`);

  const htmlEl = document.querySelector('html');

  if (htmlEl) {
    htmlEl.classList.add(isMobileDevice() ? 'mobile' : 'desktop');
    if (Reflect.get(navigator, 'standalone')) htmlEl.classList.add('standalone');
  }

  const root = createRoot(container);
  root.render(element);
}


render('#root', <App />);
