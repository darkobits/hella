/** eslint-disable file */

import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Components.
import { ErrorBoundaryFallback } from 'components/ErrorBoundaryFallback';
import { Footer } from 'components/Footer';
import { Layout } from 'components/Layout';
import { MobileNavbar } from 'components/MobileNavbar';
import { DesktopNavbar } from 'components/Navbar';
import { ReactQueryDevtools } from 'components/ReactQueryDevtools';
import { SuspenseFallback } from 'components/SuspenseFallback';
import { Toasts } from 'components/Toasts';
// Misc.
import queryClient from 'etc/query-client';
import { isMobileDevice } from 'lib/utils';
// Routes.
import { routes } from 'routes';
import { NotFound } from 'routes/not-found/NotFound';


export const App = () => {
  const errorBoundaryOnReset = React.useCallback(() => {
    // TODO: Reset query client error boundaries here.
  }, []);

  // Compute which navbar to use based on device type.
  const navbar = React.useMemo(() => (
    isMobileDevice() ? <MobileNavbar /> : <DesktopNavbar />
  ), []);

  const content = React.useMemo(() => (
    <Container className="d-flex flex-column flex-grow-1">
      <Routes>
        {/* Render a <Route /> for each top-level route. */}
        {routes.routes()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  ), []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallbackRender={ErrorBoundaryFallback}
          onReset={errorBoundaryOnReset}
        >
          <Router>
            <React.Suspense fallback={<SuspenseFallback />}>
              <Layout
                navbar={navbar}
                content={content}
                footer={<Footer />}
              />
            </React.Suspense>

            {/* Fixed-Position Components */}
            <Toasts />
            <ReactQueryDevtools />

          </Router>
        </ErrorBoundary>
      </QueryClientProvider>
    </React.StrictMode>
  );
};
