import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index.vue';
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  }
]

const router = new Router({
  routes
})

export { router }
