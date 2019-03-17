import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

/* import 'element-ui/lib/theme-chalk/index.css' */
import './assets/css/element-variables.scss'

import App from './App'

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
