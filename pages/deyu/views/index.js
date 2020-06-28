


import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import util from 'util'
import '@/static/style/base.less'
import '@/static/style/common.less'
import '@/request/interceptors.js'
import FastClick from 'fastclick'
import vuex from 'vuex'
// import proxyFn from "@/request/getUserInfo.js"
import '@/directive/drag.js'
import '@/prototype/prototype.js'
import {vuexObj} from '@/views/vuex/vuex.js';

import EXIF from 'exif-js';
window.EXIF = EXIF

Vue.use(vuex);
var store = new vuex.Store(vuexObj)
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
window.AndoridBack = util.returnApp
router.beforeEach((to, from, next) => {
  if(to.meta.title) { 
    util.tosettitle(to.meta.title);
    document.title = to.meta.title;
  }
  window.AndoridBack = function () {
    window.history.go(-1)
  }
  next()
})


Object.defineProperties(window,{ //定义不能被改变的全局变量
  "NODE_USERID":{  
    writable: false,
    value: NODE_BASEINFO.ksh
  },
  "NODE_BASEURL":{  
    writable: false,
    value: NODE_BASEINFO.apiUrl
  },   
  "GLOBAL_ROLE":{  
    writable: false,
    value: util.GetQueryString('role') || "XS"
  }   
})

store.commit('userIdChange',NODE_USERID); 
store.commit('roleChange',GLOBAL_ROLE);   

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


