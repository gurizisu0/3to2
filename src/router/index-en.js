import Vue from 'vue'
import Router from 'vue-router'
import StyleManage from '@/manage/StyleManage'
import RouterManage from '@/manage/RouterManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/en/style-manage',
      name: 'StyleManage',
      component: StyleManage
    },
    {
      path: '/en/router-manage',
      name: 'RouterManage',
      component: RouterManage
    },
    {
      path: '/en/',
      name: 'Home',
      component: require('@/pages/Home').default,
      props: {tx: require('@/router/pages/home.json').en}
    },
    {
      path: '/en/contents',
      name: 'Contents',
      component: require('@/pages/Contents').default,
      props: {tx: require('@/router/pages/contents.json').en}
    },
    {
      path: '/en/login',
      name: 'Login',
      component: require('@/pages/Login').default,
      props: {tx: require('@/router/pages/login.json').en}
    },
    {
      path: '/en/terms',
      name: 'Terms',
      component: require('@/pages/Terms').default,
      props: {tx: require('@/router/pages/terms.json').en}
    },
    {
      path: '/en/privacy',
      name: 'Privacy',
      component: require('@/pages/Privacy').default,
      props: {tx: require('@/router/pages/privacy.json').en}
    },
    {
      path: '/en/contents/:id',
      name: 'Content',
      component: require('@/pages/Content').default,
      props: {tx: require('@/router/pages/content.json').en}
    }
  ]
})
