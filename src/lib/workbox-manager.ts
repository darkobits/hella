/**
 * ----- Workbox Event Emitter -------------------------------------------------
 *
 * This module exports a factory that accepts a Workbox registration function
 * (as provided by vite-plugin-pwa) and returns a service worker API object
 * which also implements an event emitter. The factory also creates a poller
 * that regularly checks for updates and emits related events.
 *
 * TODO: Move to own package.
 *
 * Note: To support installing the new service worker and update assets when the
 * user performs a soft-reload of the page:
 *
 * ```
 * window.addEventListener('beforeunload', () => {
 *   console.debug('[ServiceWorker] Installing new service worker...');
 *   void updateSW();
 * });
 * ```
 *
 * This should be added here.
 */
import sleep from '@darkobits/sleep';
import { getPlatformDetails } from '@darkobits/tsx/lib/runtime';
import Emittery from 'emittery';
import pRetry, { FailedAttemptError } from 'p-retry';

import type { registerSW } from 'virtual:pwa-register';


type RegistrationFn = typeof registerSW;


/**
 * Map of event names this module emits to the argument type that will be passed
 * to handlers for that event.
 */
export interface WorkboxEvents {
  /**
   * Emitted when the service worker has completed downloading all assets that
   * should be pre-cached, indicating the application is ready to be used
   * offline.
   */
  'offline-ready': undefined;

  /**
   * Emitted upon successful registration of the service worker.
   */
  'registration:success': undefined;

  /**
   * Emitted upon unsuccessful registration of the service worker.
   */
  'registration:error': {
    err: Error | undefined;
  };

  /**
   * Emitted when the service worker has been unregistered.
   */
  'registration:unregistered': undefined;

  /**
   * Emitted after an update check has completed successfully.
   */
  'update:success': undefined;

  /**
   * Emitted if an update check resulted in new assets being downloaded that are
   * now ready to apply.
   */
  'update:ready': undefined;

  /**
   * Emitted if an update check failed.
   */
  'update:error': {
    /**
     * The error that caused the update check to fail.
     */
    err: FailedAttemptError | undefined;
  };

  /**
   * Emitted if the maximum failed update check attempts have been reached.
   */
  'update:max-failures-reached': {
    /**
     * The error that caused the final update check to fail.
     */
    err: FailedAttemptError | undefined;
  };
}


/**
 * Methods from the Emittery API that will be exposed to the user.
 */
const EMITTERY_METHODS = [
  'clearListeners',
  'listenerCount',
  'off',
  'offAny',
  'on',
  'onAny',
  'once'
] as const;


/**
 * Emittery instance with typed events and limited API surface.
 */
type WorkboxEmitteryApi = Pick<Emittery<WorkboxEvents>, typeof EMITTERY_METHODS[number]>;


/**
 * Event emitter and service worker API.
 */
export interface WorkboxManager extends WorkboxEmitteryApi {
  /**
   * Register the service worker. This should be called as part of your
   * application's initialization and _after_ you have registered any event
   * listeners (if you want to handle registration-related events).
   */
  register: () => void;

  /**
   * Unregisters the service worker.
   */
  unregister: () => Promise<void>;

  /**
   * Updates the service worker and reloads the page. This should be called
   * after receiving the "update:ready" event to apply changes.
   */
  reload: () => Promise<void>;
}


/**
 * Optional options object accepted by ServiceWorkerUtilsFactory.
 */
export interface WorkboxManagerOptions {
  /**
   * Options to configure how update checks are performed.
   */
  updateCheck?: {
    /**
     * Time to wait between update checks in milliseconds.
     *
     * @default 10_000
     */
    interval?: number;

    /**
     * Factor to use for exponential back-off. A factor of 1 will result in a
     * constant delay of `interval`. A factor of 1.5 will cause the interval to
     * increase by 50% with each attempt.
     *
     * @default 1
     */
    factor?: number;

    /**
     * Maximum number of times to retry (with exponential back-off) after a
     * failed update check.
     *
     * @default 5
     */
    maxRetries?: number;
  };

  /**
   * If `true`, the event emitter will log debugging messages to the console.
   *
   * @default false
   */
  debug?: boolean;
}


/**
 * Provided a Workbox registration function, returns an Emittery event emitter
 * with
 */
export default function WorkboxManagerFactory(registrationFn: RegistrationFn, opts: WorkboxManagerOptions = {}) {
  // Read options and assign defaults.
  const updateCheckInterval = opts.updateCheck?.interval ?? 10_000;
  const updateCheckFactor = opts.updateCheck?.factor ?? 1;
  const updateCheckRetries = opts.updateCheck?.maxRetries ?? 5;
  const debug = opts.debug ?? false;


  /**
   * @private
   *
   * Event emitter.
   */
  const emitter = new Emittery<WorkboxEvents>();


  /**
   * @private
   *
   * Service worker update function.
   */
  let updateServiceWorker: ReturnType<typeof registerSW> | undefined;


  /**
  * @private
  *
  * Provided a ServiceWorkerRegistration, periodically updates the registration
  * and emits related events.
  */
  const createUpdateChecker = (registration: ServiceWorkerRegistration) => {
    const doUpdateCheck = async () => {
      if (navigator.onLine) {
        await registration.update();
        if (debug) console.debug('[workbox] Update check complete.');
      } else {
        if (debug) console.debug('[workbox] Update check was unable to proceed because there is no internet connection.');
      }

      // If the check was successful or skipped, schedule the next check in
      // `minTimeout` milliseconds.
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      void sleep(updateCheckInterval).then(createUpdateRetryPromise);
    };

    const createUpdateRetryPromise = async () => pRetry(doUpdateCheck, {
      minTimeout: updateCheckInterval,
      retries: updateCheckRetries,
      factor: updateCheckFactor,
      onFailedAttempt: async err => (err.retriesLeft === 0
        ? emitter.emit('update:max-failures-reached', { err })
        : emitter.emit('update:error', { err }))
    }).catch(async err => emitter.emit('update:error', { err }));

    void createUpdateRetryPromise();
  };


  /**
   * Removes all service workers for the application from the client's browser
   * and emits the "unregistered" event.
   */
  const unregister = async () => {
    if (!navigator.serviceWorker) return;

    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
      void registration.unregister();
    }

    void emitter.emit('registration:unregistered');
  };


  /**
   * Updates the service worker with a newer version and reloads the page.
   */
  const reload = async () => {
    if (!updateServiceWorker) return;

    try {
      if (debug) console.debug('[workbox] Reloading.');

      // TODO: The param this function takes is no longer supported. We will
      // need to reload the page manually after updating.
      await updateServiceWorker(true);
    } catch (err) {
      if (debug) console.debug('[workbox] Error reloading:', err);
    }
  };


  /**
   * Initializes the service worker and emits certain service worker-related
   * events.
   */
  const register = () => {
    if (!navigator.serviceWorker) return;

    try {
      updateServiceWorker = registrationFn({
        // Emitted when the service worker has downloaded new assets and a page
        // refresh is needed to apply them.
        onNeedRefresh: () => {
          void emitter.emit('update:ready');
        },
        // Emitted when all assets that should be pre-cached for offline mode
        // have been downloaded.
        onOfflineReady: () => {
          // In Safari, we will often get the offlineReady event in cases where
          // we should get the needRefresh event.
          if (/safari/gi.test(getPlatformDetails().browser.name ?? '')) {
            if (debug) console.warn('[workbox] Offline ready. Browser is Safari. Emitting update:ready event.');
            void emitter.emit('update:ready');
          }

          void emitter.emit('offline-ready');
        },
        onRegisterError: err => {
          void emitter.emit('registration:error', { err });
        },
        onRegistered: registration => {
          if (!registration) return;
          void emitter.emit('registration:success');
          void createUpdateChecker(registration);
        }
      });
    } catch (err: any) {
      void emitter.emit('registration:error', { err });
    }
  };


  const ctx = { register, unregister, reload };
  emitter.bindMethods(ctx, EMITTERY_METHODS);
  return ctx as WorkboxManager;
}
