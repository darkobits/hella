/* eslint-disable import/no-unresolved */
/**
 * ----- Workbox Event Handlers ------------------------------------------------
 *
 * This module is responsible for defining how the application should respond to
 * various service worker-related lifecycle events.
 */
import Button from 'react-bootstrap/Button';
import { registerSW } from 'virtual:pwa-register';

import { createToast } from 'lib/toasts';
import WorkboxManager from 'lib/workbox-manager';


/**
 * @private
 *
 * Whether to enable more verbose logging in both the service worker event
 * emitter and event handlers.
 */
const debug = true;


/**
 * @private
 *
 * Service worker event emitter instance.
 */
const workbox = WorkboxManager(registerSW, { debug });


// ----- Event Handlers --------------------------------------------------------

/**
 * When an update is available, show the user a toast with the option to apply
 * the update and reload the application.
 */
workbox.on('update:ready', () => {
  if (debug) console.debug('[workbox] Received "update-ready" event.');

  createToast(ctx => ({
    title: 'Update Available',
    // Only show 1 of this type of toast at a time.
    dedupeKey: 'update:ready',
    message: (
      <div className="d-flex align-items-center justify-content-between">
        <span>An update is available.</span>
        <Button
          variant="secondary"
          className="btn-sm"
          onClick={() => {
            ctx.dismiss();
            void workbox.reload();
          }}
        >Reload</Button>
      </div>
    )
  }));
});


/**
 * When update checks have failed too many times, show the user a toast to let
 * them know.
 */
workbox.on('update:max-failures-reached', ({ err }) => {
  if (debug && err) console.error('[workbox] Update error:', err);
  if (debug) console.error('[workbox] Maximum failed update attempts reached. Polling stopped.');

  createToast(ctx => ({
    title: 'Update Error',
    // Only show 1 of this type of toast at a time.
    dedupeKey: 'update:max-failures-reached',
    variant: 'danger',
    message: (
      <div className="d-flex align-items-center justify-content-between">
        <span>An error occurred while checking for updates.</span>
        <Button
          variant="danger"
          className="btn-sm"
          onClick={ctx.dismiss}
        >OK</Button>
      </div>
    )
  }));
});


workbox.on('update:error', ({ err }) => {
  if (debug && err) console.error('[workbox] Error checking for updates:', err);
  if (debug && err?.retriesLeft) console.error(`[workbox] ${err?.retriesLeft} remaining attempts.`);
});


workbox.on('registration:error', ({ err }) => {
  if (debug) console.error('[workbox] Error registering:', err);
});


workbox.on('registration:success', () => {
  if (debug) console.debug('[workbox] Registered.');
});


workbox.on('registration:unregistered', () => {
  if (debug) console.debug('[workbox] Unregistered.');
});


workbox.on('offline-ready', () => {
  if (debug) console.debug('[workbox] Received "offline-ready" event.');
});


// ----- Initialization --------------------------------------------------------

if (import.meta.env.NODE_ENV === 'production') {
  void workbox.register();
}
