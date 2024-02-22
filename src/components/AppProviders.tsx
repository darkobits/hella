import 'bootstrap/dist/css/bootstrap.css';
import 'etc/global-styles.css';

import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorBoundaryFallback } from 'components/ErrorBoundaryFallback';
import { ReactQueryDevtools } from 'components/ReactQueryDevtools';
import { SuspenseFallback } from 'components/SuspenseFallback';
import { Toasts } from 'components/Toasts';
import queryClient from 'etc/query-client';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={ErrorBoundaryFallback}
          onReset={reset}
        >
          <QueryClientProvider client={queryClient}>
            <React.Suspense fallback={<SuspenseFallback />}>
              {children}
              <Toasts />
              <ReactQueryDevtools />
            </React.Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
