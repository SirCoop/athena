import React from 'react';
import Loadable from 'react-loadable';

const Home = Loadable({
 loader: () => import('./Home'),
 loading: () => <div>Loading...</div>,
});

export default {
  path: '/home',
  Component: Home,
};