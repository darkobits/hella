import { styled } from 'linaria/react';
import React from 'react';

const Styled = {
  ErrorBoundary: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  `
};

interface ErrorBoundaryFallbackProps {
  error: Error | undefined;
  resetErrorBoundary: () => void;
}

export const ErrorBoundaryFallback: React.FunctionComponent<ErrorBoundaryFallbackProps> = props => {
  const { error, resetErrorBoundary } = props;
  const message = error?.message ? `Error: ${error.message}` : 'An unknown error occurred.';

  return (
    <Styled.ErrorBoundary>
      <h1 className="text-danger mb-5">Barnacles!</h1>
      <div className="text-secondary mb-4 col-8">
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
    </Styled.ErrorBoundary>
  );
};
