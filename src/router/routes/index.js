const Layout = () => import('@/layouts/index.vue')

export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
      icon: 'mdi-alert-circle-outline',
      order: 3,
    },
    isHidden: false,
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: false,
    meta: {
      title: 'Login',
      icon: 'mdi-login',
      order: 2,
    },
  },

  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    isHidden: false,
    meta: {
      title: 'Register',
      icon: 'mdi-login',
      order: 2,
    },
  },

  {
    name: 'ExternalLink',
    path: '/external-link',
    component: Layout,
    meta: {
      title: '外部链接',
      icon: 'mdi:link-variant',
      order: 6,
    },
    children: [
      {
        name: 'QSLinkGithubSrc',
        path: 'https://github.com/zclzone/vue-naive-admin',
        meta: {
          title: 'vue-naive-admin',
          icon: 'mdi-github',
        },
      },
      {
        name: 'QSLinkDocs',
        path: 'https://zclzone.github.io/vue-naive-admin-docs',
        meta: {
          title: 'vue-naive-admin doc',
          icon: 'mdi-vuejs',
        },
      },
      {
        name: 'MaterioLinkGithubSrc',
        path: 'https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free',
        meta: {
          title: 'Materio',
          icon: 'mdi-github',
        },
      },
      {
        name: 'MaterioEasyLinkGithubSrc',
        path: 'https://github.com/yuWorm/MaterioEasy',
        meta: {
          title: 'MaterioEasy',
          icon: 'mdi-github',
        },
      },
    ],
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

export const EMPTY_ROUTE = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: null,
}

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const asyncRoutes = []
Object.keys(modules).forEach(key => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }
