/**
 * Common properties for route definitions. Feel free to add / remove fields as
 * you see fit.
 */
export interface RouteConfig {
  name: string;
  label: string;
  pathname: string;
  exact?: boolean;
  component: JSX.Element | React.LazyExoticComponent<() => JSX.Element>;
  icon: JSX.Element;
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
}
