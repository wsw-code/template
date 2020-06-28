import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index.vue';
import BjDetail from '@/views/bjDetail/bjDetail.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { title: '学生归寝' },
  },
  {
    path: '/bjDetail',
    name: 'bjDetail',
    component: BjDetail,
    meta: { title: '学生归寝明细' },
  }
]

const router = new Router({
  routes
})

export { router }
