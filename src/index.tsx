import 'bootstrap/dist/css/bootstrap.css';
import 'etc/global-styles.css';
import 'etc/workbox-event-handlers';

import {
  isMobile,
  isStandalone,
  render
} from '@darkobits/tsx/lib/runtime';

import { App } from 'components/App';


// Apply .mobile, .desktop, and .standalone to <html>.
const htmlEl = document.querySelector('html');
if (!htmlEl) throw new Error('[render] No <html> element could be found.');
htmlEl.classList.add(isMobile() ? 'mobile' : 'desktop');
if (isStandalone()) htmlEl.classList.add('standalone');


render('#root', <App />);
