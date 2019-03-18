import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Config from './components/Config.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        public: true,
        title: 'Home'
      },
      name: 'Home',
      component: Home
    },
    {
      path: '/config',
      meta: {
        public: true,
        title: 'Config'
      },
      name: 'Configuration',
      component: Config
    }
  ]
})
