
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminMenu',
        component: () => import('pages/admin/AdminMenuPage.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('pages/admin/UserAdminPage.vue')
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('pages/admin/TaskManager.vue')
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
