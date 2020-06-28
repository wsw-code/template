
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength,padString) {
      targetLength = targetLength>>0; //floor if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ''));
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return padString.slice(0,targetLength) + String(this);
      }
  };
}

import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import '@/static/style/base.less'
import '@/static/style/common.less'
import '@/request/interceptors.js'
import '@/prototype/prototype.js'
import util from 'util'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


