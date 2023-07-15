const Layout = () => import('@/layouts/index.vue')

export default {
  name: 'UserInterface',
  path: '/user_interface',
  component: Layout,
  meta: {
    order: 4,
    label: 'User Interface',
  },
  children: [
    {
      name: 'Typography',
      path: 'typography',
      component: () => import('./typography/index.vue'),
      meta: {
        title: 'Typography',
        icon: 'mdi-alpha-t-box-outline',
      },
    },
    {
      name: 'Icons',
      path: 'icons',
      component: () => import('./icons/index.vue'),
      meta: {
        title: 'Icons',
        icon: 'mdi-eye-outline',
      },
    },
    {
      name: 'Cards',
      path: 'cards',
      component: () => import('./cards/index.vue'),
      meta: {
        title: 'Cards',
        icon: 'mdi-credit-card-outline',
      },
    },
    {
      name: 'Tables',
      path: 'tables',
      component: () => import('./tables/index.vue'),
      meta: {
        title: 'Tables',
        icon: 'mdi-table',
      },
    },
    {
      name: 'FormLayouts',
      path: 'form_layouts',
      component: () => import('./form_layouts/index.vue'),
      meta: {
        title: 'Form Layouts',
        icon: 'mdi-form-select',
      },
    },
  ],
}
