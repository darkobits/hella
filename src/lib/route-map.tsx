import React from 'react';
import { Route } from 'react-router-dom';


/**
 * Common properties for route definitions. Feel free to add / remove fields as
 * you see fit.
 */
export interface RouteConfig {
  /**
   * Name for the route.
   */
  name: string;

  /**
   * Display label for the route.
   */
  label: string;

  /**
   * Path for the route.
   */
  path: string;

  /**
   * Function that renders the component to use for the route.
   */
  Component: ((...props: Array<any>) => JSX.Element) | (React.LazyExoticComponent<(...props: Array<any>) => JSX.Element>);

  /**
   * Function that renders the icon to use for the route.
   */
  Icon: (...props: Array<any>) => JSX.Element;
}


/**
 * Props passed to any component used as a top-level route.
 */
export interface RouteProps {
  useRouteConfig: (name?: string) => RouteConfig;
}


/**
 * ES Map that:
 *
 * 1. Has a #get method that throws rather than returning undefined if a key is
 *    not present.
 * 2. Has an intuitive, in-order #map.
 * 2. Accepts an arbitrary list of route definitions upon construction. These
 *    may also be set using #set.
 */
export class RouteMap extends Map<string, RouteConfig> {
  constructor(...routeConfigs: Array<RouteConfig>) {
    super();

    if (Array.isArray(routeConfigs)) {
      routeConfigs.forEach(routeConfig => {
        this.set(routeConfig.name, routeConfig);
      });
    }
  }

  get = (name: string) => {
    const value = super.get(name);

    if (!value) {
      throw new Error(`Route "${name}" does not exist.`);
    }

    return value;
  };

  map = <T = any>(mapFn: (value: RouteConfig, index?: number) => T) => {
    return [...this.values()].map((routeConfig, index) => mapFn(routeConfig, index));
  };

  routes() {
    return this.map(routeConfig => {
      const { Component, name, path } = routeConfig;

      const useRouteConfig = React.useCallback((name?: string) => {
        if (!name) return routeConfig;
        const config = this.get(name);
        if (config) return config;
        throw new Error(`[useRouteConfig] Invalid route: "${name}".`);
      }, []);

      return (
        <Route
          key={name}
          path={path}
          element={<Component useRouteConfig={useRouteConfig} />}
        />
      );
    });
  }
}
