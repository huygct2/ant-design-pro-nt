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
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      {
        path: '/1',
        name: '1',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      {
        path: '/2',
        name: '2',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      {
        path: '/3',
        name: '3',
        icon: 'dashboard',
        component: './Dashboard/Analysis'
      },
      {
        path: '/4',
        name: '4',
        icon: 'dashboard',
        component: './Account/Account'
      },
      {
        component: '404',
      },
    ],
  },
];
