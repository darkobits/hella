/**
 * Registers the Workbox service worker, which caches assets for offline use.
 */
export const registerServiceWorker = () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator){
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('service-worker.js');
    });
  }
};
