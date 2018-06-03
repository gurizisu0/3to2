import Vue from 'vue'
import App from './App'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import {MediaQueries} from 'vue-media-queries';
const mediaQueries = new MediaQueries();

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Vue.config.productionTip = false
Vue.use(Element)
Vue.component('icon', Icon)
Vue.use(mediaQueries);
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://2obs9mq1rj.execute-api.ap-northeast-1.amazonaws.com/test', // Your API domain
  providers: {
    github: {
      url: 'oauth/github',
      clientId: '03156aed73fe844436f1',
      redirectUri: window.location.origin + '/login'
    },
    google: {
      url: 'oauth/google',
      clientId: '335717386026-a9sagk2dhkdhlvhk29mb97sa3ttnepog.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/login'
    },
    facebook: {
      url: 'oauth/facebook',
      clientId: '764333283768792',
      redirectUri: window.location.origin + '/login'
    },
    twitter: {
      url: 'oauth/twitter',
      clientId: 'EvK2fg40n2Qxs9vAyfmRqzAOd',
      redirectUri: window.location.origin + '/login'
    }
  },
  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      // this.setToken(response)
      console.log(response.data.access_token)
      if (response.data.access_token) {
        // this.setToken(response)
        console.log("レスポンス"+JSON.stringify(response.data))
        var token = response.data.access_token

        console.log(token)
        localStorage.setItem('access_token', token)
      }
      console.log(response)
      // this.dispatch(response)
      return response
    })
  }
})

const routerChange = (url) => {
  const lang = url.split('/')[3]
  if (!lang) {
    return require('./router').default
  } else {
    if (lang.length == 2) {
      //manifest.json -> metaタグの設定
      var metas = document.head.children;
      for(var i = 0; i<metas.length; i++) {
      	if(metas[i].getAttribute('rel') === 'manifest') {
          metas[i].setAttribute('href', metas[i].getAttribute('href').replace(/\.json/, '-' + lang + '.json'));
      	}
      }
      return require('./router/index-' + lang + '.js').default
    } else {
      return require('./router').default
    }
  }
}

new Vue({
  el: '#app',
  router: routerChange(window.location.href),
  template: '<App/>',
  components: {App},
  mediaQueries: mediaQueries
})
