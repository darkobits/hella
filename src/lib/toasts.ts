/**
 * ----- Toast Manager ---------------------------------------------------------
 *
 * This file provides functionality for managing toasts in the application. It
 * uses `react-hot-toast` to do most of the heavy lifting.
 *
 * See Toaster.tsx for the UI implementation.
 */
import toast from 'react-hot-toast/headless';

import { BS_VARIANTS } from 'etc/constants';


/**
 * @private
 *
 * Map of user-provided dedupe keys to toast IDs. Used to ensure toasts with the
 * same dedupe key are only displayed one at a time.
 */
const dedupeMap = new Map<string, string>();


interface MessageFnContext {
  /**
   * ID of the toast.
   */
  id: string;

  /**
   * Calls `toast.dismiss` with this toast's ID.
   */
  dismiss: () => void;

  /**
   * Calls `toast.remove` with this toast's ID.
   */
  remove: () => void;

  /**
   * Reference to the `react-hot-toast` API for advanced usage.
   */
  toast: typeof toast;
}


/**
 * Expected payload for a toast.
 */
export interface ToastData {
  /**
   * Title of the toast.
   */
  title: string;

  /**
   * Message/body of the toast.
   *
   * Note: React.ReactNode includes all primitive types. So you can, for
   * example, return a string as the message. If a function is provided, it will
   * be passed a MessageFnContext object and should return a ReactNode.
   */
  message: React.ReactNode;

  /**
   * Optional Bootstrap variant to use.
   */
  variant?: typeof BS_VARIANTS[number];

  /**
   * If only a single toast of this type should be visible at a time, provide a
   * dedupe key and any existing toasts with the same key will be removed.
   */
  dedupeKey?: string;
}


/**
 * Object passed to `createToast` or returned by the function passed to
 * `createToast`.
 */
interface CreateToastOptions extends ToastData {
  additionalToastOptions?: Parameters<typeof toast>[1];
}


/**
 * Argument accepted by `createToast`.
 */
type CreateToastArgument = CreateToastOptions | ((ctx: MessageFnContext) => CreateToastOptions);


/**
 * Wrapper around the default toast function that lets us handle our custom
 * payload format and dedupe-ing.
 */
export function createToast(arg: CreateToastArgument) {
  const ctx: MessageFnContext = {
    id: '',
    dismiss: () => {
      toast.dismiss(ctx.id);
    },
    remove: () => {
      toast.remove(ctx.id);
    },
    toast
  };

  const { additionalToastOptions, ...data } = typeof arg === 'function' ? arg(ctx) : arg;

  // If the new toast provided a dedupe key, remove any previous toast with the
  // same key.
  if (data.dedupeKey) {
    const staleToastId = dedupeMap.get(data.dedupeKey);
    if (staleToastId) {
      toast.remove(staleToastId);
    }
  }

  // Create the new toast.
  ctx.id = toast(data as unknown as string, {
    // Toasts do not auto-dismiss unless a specific duration was provided.
    duration: Number.POSITIVE_INFINITY,
    ...additionalToastOptions
  });

  // If the new toast provided a dedupe key, save its ID back into the dedupe
  // map.
  if (data.dedupeKey) {
    dedupeMap.set(data.dedupeKey, ctx.id);
  }
}
