export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: '404',
      },
      {
        path: '/customer-service',
        name: 'customer-service',
        icon: 'customer-service',
        component: '404',
      },
      {
        path: '/user',
        name: 'user',
        icon: 'user',
        component: '404',
      },
      {
        path: '/calendar',
        name: 'calendar',
        icon: 'calendar',
        component: '404',
      },
      {
        path: '/book',
        name: 'book',
        icon: 'book',
        component: '404',
      },
      {
        path: '/video-camera',
        name: 'video',
        icon: 'video-camera',
        component: '404',
      },
      {
        path: '/tool',
        name: 'tool',
        icon: 'tool',
        component: '404',
      },
      {
        path: '/safety',
        name: 'safety',
        icon: 'safety',
        component: '404',
      },
      {
        path: '/bar-chart',
        name: 'statistic',
        icon: 'bar-chart',
        component: '404',
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'setting',
        component: './Account/Account',
      },
      {
        component: '404',
      },
    ],
  },
];
