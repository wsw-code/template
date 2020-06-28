import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index.vue';
import Xc from '@/views/xc/xc.vue';
import Gg from '@/views/gg/gg.vue';
import Fc from '@/views/fc/fc.vue';
import Fcxq from '@/views/fcxq/fcxq.vue';
import Publish from '@/views/gg/children/publish.vue';
import Fcpublish from '@/views/fc/children/fcpublish.vue';
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { title: '班牌管理' },
  },
  {
    path: '/xc',
    name: 'xc',
    component: Xc,
    meta: { title: '班级相册' },
  },
  {
    path: '/fcxq',
    name: 'fcxq',
    component: Fcxq,
    meta: { title: '班级风采详情' },
  },
  {
    path: '/fc',
    name: 'fc',
    component: Fc,
    meta: { title: '班级风采' },  
    children:[
      {
        path: '/fcpublish',
        name: 'fcpublish',
        component: Fcpublish,  
        meta: { title: '发布' },      
      }
    ]
  },
  {
    path: '/gg',
    name: 'gg',
    meta: { title: '班级公告' },
    component: Gg,
    children:[
      {
        path: '/publish',
        name: 'publish',
        component: Publish, 
        meta: { title: '发布' },       
      }
    ]
  }   
]

const router = new Router({
  routes
})

export { router }
