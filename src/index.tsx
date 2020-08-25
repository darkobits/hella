import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'components/App';
import 'etc/global-styles';
import { registerServiceWorker } from 'etc/register-service-worker';

registerServiceWorker();
ReactDOM.render(<App />, document.querySelector('#root'));
