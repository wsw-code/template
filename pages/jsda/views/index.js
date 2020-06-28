


import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import '@/static/style/base.less'
import '@/static/style/common.less'
import '@/request/interceptors.js'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


