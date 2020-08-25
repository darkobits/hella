import { lazy } from '@darkobits/react-lazy-named';

import { RouteMap } from 'lib/route-map';

import ChartIcon from '~icons/bi/bar-chart';
import GearIcon from '~icons/bi/gear';
import HouseIcon from '~icons/bi/house';
import MusicPlayerIcon from '~icons/bi/music-player';


// N.B. Top-level routes are lazy-loaded.
const { Home } = lazy(async () => import('./home/Home'));
const { Page1 } = lazy(async () => import('./page-1/Page1'));
const { Stonks } = lazy(async () => import('./stonks/Stonks'));
const { Settings } = lazy(async () => import('./settings/Settings'));


export const routes = new RouteMap({
  name: 'home',
  label: 'Hella',
  path: '/',
  Component: Home,
  Icon: HouseIcon
}, {
  name: 'page1',
  label: 'Mumblecore',
  path: '/mumblecore',
  Component: Page1,
  Icon: MusicPlayerIcon
}, {
  name: 'stonks',
  label: 'Stonks',
  path: '/stonks',
  Component: Stonks,
  Icon: ChartIcon
}, {
  name: 'settings',
  label: 'Settings',
  path: '/settings',
  Component: Settings,
  Icon: GearIcon
});


export type { RouteProps } from 'lib/route-map';
