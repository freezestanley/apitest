// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import apiComponent from './api/api-component.conf.js'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// 自动注册全局组件
for (let key in apiComponent) {
  let val = apiComponent[key]
  Vue.component(key, require('./api' + val).default)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
