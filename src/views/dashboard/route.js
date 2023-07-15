const Layout = () => import('@/layouts/index.vue')

export default {
  name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: '/workbench',
  children: [
    {
      name: 'Workbench',
      path: 'workbench',
      component: () => import('./index.vue'),
      meta: {
        title: 'Dashboard',
        icon: 'mdi-home',
        order: 0,
      },
    },
  ],
}
