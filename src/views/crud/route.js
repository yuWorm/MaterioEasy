const Layout = () => import('@/layouts/index.vue')

export default {
  name: 'Crud',
  path: '/curd',
  component: Layout,
  redirect: '/curd/show',
  meta: {
    title: '示例页面',
    customIcon: 'logo',
    role: ['admin'],
    requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'CrudShow',
      path: 'show',
      component: () => import('./index.vue'),
      meta: {
        title: 'CRUD表格',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
