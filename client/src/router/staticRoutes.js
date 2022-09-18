
const routes = [
  {
    path: '/',
    // component: () => import('layouts/StaticLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/RegisterPage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
