import React from 'react';


/**
 * Returns a boolean that will be `true` if the browser has an internet
 * connection and `false` if not.
 */
export function useNetworkState() {
  const [networkState, setNetworkState] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => {
      setNetworkState(true);
    };

    const handleOffline = () => {
      setNetworkState(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return networkState;
}
