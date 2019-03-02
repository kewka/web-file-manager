import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('~/pages/DrivesPage')
    })
  }
];
