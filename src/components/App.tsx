import React from 'react';
import { Container } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryConfigProvider, queryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundaryFallback } from 'components/ErrorBoundaryFallback';
import { MobileNavbar } from 'components/MobileNavbar';
import { Navbar } from 'components/Navbar';
import { SuspenseFallback } from 'components/SuspenseFallback';
import { isMobileDevice } from 'lib/utils';
import { routes } from 'routes';
import { NotFound } from 'routes/not-found/NotFound';

// ----- App Layout ------------------------------------------------------------

export const App = hot(() => {
  return (
    <React.StrictMode>
      <ReactQueryConfigProvider config={{ shared: { suspense: true }}}>
        {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
        <ErrorBoundary
          onReset={() => queryCache.resetErrorBoundaries()}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorBoundaryFallback error={error} resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Router>
            {!isMobileDevice() && <Navbar />}
            <div id="content">
              <React.Suspense fallback={<SuspenseFallback />}>
                <Container className="text-light">
                  <Switch>
                    {routes.map(routeConfig => (
                      <Route
                        key={routeConfig.name}
                        path={routeConfig.pathname}
                        exact={routeConfig.exact}
                      >
                        {routeConfig.component}
                      </Route>
                    ))}
                    <Route>
                      <NotFound />
                    </Route>
                  </Switch>
                </Container>
              </React.Suspense>
            </div>
            {isMobileDevice() && <MobileNavbar />}
          </Router>
        </ErrorBoundary>
      </ReactQueryConfigProvider>
    </React.StrictMode>
  );
});
