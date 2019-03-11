import Vue from 'vue'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'

/* import 'element-ui/lib/theme-chalk/index.css' */
import './assets/css/element-variables.scss'

import App from './App'

Vue.use(ElementUI, { lang })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
