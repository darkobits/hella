import Emittery from 'emittery';
import React from 'react';


/**
 * Events registered with the useEvent event emitter.
 */
export interface UseEventEvents {
  'event-name': {
    data: any;
  };
}


/**
 * Defines the signature of event listeners.
 */
export type Listener<E extends keyof UseEventEvents> = (eventData: UseEventEvents[E]) => void | Promise<void>;


/**
 * @private
 *
 * Event emitter that consumers can use to broadcast and listen to events.
 */
const emitter = new Emittery<UseEventEvents>();


/**
 * React hook that lets components dispatch and respond to events.
 *
 * @example
 *
 * // Create a dispatcher.
 * const dispatchMyEvent = useEvent('my-event');
 *
 * // Register a handler.
 * const onMyEvent = React.useCallback(() => {
 *   console.log('my-event');
 * }, []);
 *
 * useEvent('my-event', onMyEvent);
 */
export function useEvent<E extends keyof UseEventEvents>(eventName: E, handler?: Listener<E>) {
  // Register a handler if one was provided.
  React.useEffect(() => {
    if (!handler) return;

    const unsubscribe = emitter.on(eventName, handler);

    return () => {
      unsubscribe();
    };
  }, [handler, eventName]);

  // Create and return a dispatcher.
  return React.useMemo(() => {
    return (eventData: UseEventEvents[E]) => {
      void emitter.emit(eventName, eventData);
    };
  }, [eventName]);
}
