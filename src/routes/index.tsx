import { lazy } from '@darkobits/react-lazy-named';
import { BsHouse, BsMusicPlayer, BsGear } from 'react-icons/bs';

import { RouteMap } from 'lib/route-map';

// N.B. Top-level routes are lazy-loaded.
const { Home } = lazy(async () => import('./home/Home'));
const { Page1 } = lazy(async () => import('./page-1/Page1'));
const { Stonks } = lazy(async () => import('./stonks/Stonks'));


export const routes = new RouteMap({
  name: 'home',
  label: 'Hella',
  path: '/',
  Component: Home,
  Icon: BsHouse
}, {
  name: 'page1',
  label: 'Mumblecore',
  path: '/mumblecore',
  Component: Page1,
  Icon: BsMusicPlayer
}, {
  name: 'stonks',
  label: 'Stonks',
  path: '/stonks',
  Component: Stonks,
  Icon: BsGear
});


export type { RouteProps } from 'lib/route-map';
