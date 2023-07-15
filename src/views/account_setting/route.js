const Layout = () => import('@/layouts/index.vue')

export default {
  name: 'User',
  path: '/user',
  component: Layout,
  redirect: '/user/setting',
  meta: {
    order: 1,
  },
  children: [
    {
      name: 'UserSetting',
      path: 'setting',
      component: () => import('./index.vue'),
      meta: {
        title: 'AccountSetting',
        icon: 'mdi-account-cog-outline',
        order: 2,
      },
    },
  ],
}
