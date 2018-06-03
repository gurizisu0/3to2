import Vue from 'vue'
import Router from 'vue-router'
import StyleManage from '@/manage/StyleManage'
import RouterManage from '@/manage/RouterManage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/style-manage',
      name: 'StyleManage',
      component: StyleManage
    },
    {
      path: '/router-manage',
      name: 'RouterManage',
      component: RouterManage
    },
    {
      path: '/',
      name: 'Home',
      component: require('@/pages/Home').default,
      props: {tx: require('@/router/pages/home.json').ja}
    },
    {
      path: '/contents',
      name: 'Contents',
      component: require('@/pages/Contents').default,
      props: {tx: require('@/router/pages/contents.json').ja}
    },
    {
      path: '/login',
      name: 'Login',
      component: require('@/pages/Login').default,
      props: {tx: require('@/router/pages/login.json').ja}
    },
    {
      path: '/terms',
      name: 'Terms',
      component: require('@/pages/Terms').default,
      props: {tx: require('@/router/pages/terms.json').ja}
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: require('@/pages/Privacy').default,
      props: {tx: require('@/router/pages/privacy.json').ja}
    },
    {
      path: '/contents/:id',
      name: 'Content',
      component: require('@/pages/Content').default,
      props: {tx: require('@/router/pages/content.json').ja}
    }
  ]
})
