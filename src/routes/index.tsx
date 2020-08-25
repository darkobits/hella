import React from 'react';
import { BsHouse, BsMusicPlayer, BsGear } from 'react-icons/bs';

import { RouteMap } from 'lib/route-map';

// Top-level routes are lazy-loaded.
const Home = React.lazy(async () => import('routes/home/Home'));
const Page1 = React.lazy(async () => import('routes/page-1/Page1'));
const Stonks = React.lazy(async () => import('routes/stonks/Stonks'));

export const routes = new RouteMap({
  name: 'home',
  label: String(process.env.NAME),
  pathname: '/',
  exact: true,
  component: <Home />,
  icon: <BsHouse />
}, {
  name: 'page1',
  label: 'Mumblecore',
  pathname: '/mumblecore',
  component: <Page1 />,
  icon: <BsMusicPlayer />
}, {
  name: 'stonks',
  label: 'Stonks',
  pathname: '/stonks',
  component: <Stonks />,
  icon: <BsGear />
});
