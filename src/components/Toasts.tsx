import cx from 'classnames';
import Toast from 'react-bootstrap/Toast';
import toast, { useToaster } from 'react-hot-toast/headless';

import { LiveTimestamp } from 'components/LiveTimestamp';
import { type ToastData } from 'lib/toasts';

import classes from './Toasts.css';


/**
 * Custom toast renderer that uses `react-hot-toast` to create and manage toasts
 * and render them with Bootstrap toast components.
 */
export const Toasts = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <aside
      aria-label="toasts"
      className={classes.toaster}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      <ol className={classes.toastList}>
        {toasts.map(t => {
          const {
            id,
            createdAt,
            ariaProps,
            message,
            duration,
            visible
          } = t;

          const data = (typeof message === 'function'
            ? message(t)
            : message) as unknown as ToastData;

          const variant = data.variant ?? 'dark';

          return (
            <Toast
              key={id}
              bg={variant}
              onClose={() => toast.remove(id)}
              delay={duration ?? Number.POSITIVE_INFINITY}
              show={visible}
              className={cx('d-inline-block', variant)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...ariaProps}
            >
              <Toast.Header closeVariant="white">
                <strong className={cx('me-auto', 'text-white')}>
                  {data.title}
                </strong>
                <small
                  className={cx(['danger'].includes(variant) && 'text-light')}
                ><LiveTimestamp timestamp={createdAt} /></small>
              </Toast.Header>
              <Toast.Body className="text-light">
                {data.message}
              </Toast.Body>
            </Toast>
          );
        })}
      </ol>
    </aside>
  );
};
