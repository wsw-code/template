import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index.vue'
import Detail from '@/views/index/children/detail.vue'
import More from '@/views/more/more.vue'
import ViewAll from '@/views/viewAll/viewAll.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    meta: { title: '我的档案' },
    component: Index,
    children: [
      {
        path: '/detail',
        name: 'detail',
        meta: { title: '' },
        component: Detail, 
      },
    ]
  },
  {
    path: '/more',
    name: 'more',
    meta: { title: '' },
    component: More, 
  },
  {
    path: '/viewAll',
    name: 'viewAll',
    meta: { title: '' },
    component: ViewAll, 
  }
]

const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export { router }
