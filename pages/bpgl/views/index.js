


import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import '@/static/style/base.less'
import '@/static/style/common.less'
import '@/request/interceptors.js'
import '@/prototype/prototype.js'
import '@/directive/drag.js'
import util from 'util'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
FastClick.prototype.focus = function (targetElement) {
  targetElement.focus();
  var length;
  var navigator = window.navigator;
  var deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0;
  var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
  }
};
FastClick.attach(document.body)
Vue.use(VueLazyload)
import EXIF from 'exif-js';
window.EXIF = EXIF


window.AndoridBack = util.returnApp
router.beforeEach((to, from, next) => {
  if(to.meta.title) { 
    util.tosettitle(to.meta.title);
    document.title = to.meta.title;
  }
  if (to.name == 'index') {
    window.AndoridBack = util.returnApp
  } else {
    window.AndoridBack = function () {
      window.history.go(-1)
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


