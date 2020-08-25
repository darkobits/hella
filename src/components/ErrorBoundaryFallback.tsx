import React from 'react';

import classes from './ErrorBoundaryFallback.css';

import type { FallbackProps } from 'react-error-boundary';


export const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message = error?.message ? `Error: ${error.message}` : 'An unknown error occurred.';

  return (
    <div className={classes.errorBoundary}>
      <h1 className="text-danger mb-5">Barnacles!</h1>
      <div className="text-secondary text-center mb-4 col-sm-8 col-lg-4">
        {message}
        <div className="mt-5 text-center">
          <button
            className="btn btn-secondary"
            onClick={() => resetErrorBoundary()}
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
