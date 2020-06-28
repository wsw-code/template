import Vue from 'vue'
import Router from 'vue-router'
import Role_one from '@/views/role_one/role.vue';
import Role_two from '@/views/role_two/role_two.vue';
import Role_three from '@/views/role_three/role_three.vue';
import Role_four from '@/views/role_four/role_four.vue'
import Plxq from '@/views/plxq/plxq.vue';
import Sspj from '@/views/pj/sspj.vue';
import Bjpj from '@/views/pj/bjpj.vue';
import Detail from '@/views/detail/detail.vue';
import Bop from '@/views/bop/bop.vue';
import Dytj from '@/views/dytj/dytj.vue';
import Kjtschild from '@/views/role_two/children/kjtschild.vue'
import Tjchild from '@/views/role_two/children/tjchild.vue'
import Xschild from '@/views/role_two/children/xschild.vue'
import Tjdetail from '@/views/tjdetail/tjdetail.vue'
import Kjchild from '@/views/role_four/children/kjchild.vue'
import Deyuchild from '@/views/role_four/children/deyuchild.vue'
import Bjpm from '@/views/role_four/children/bjpm.vue'
import Df from '@/views/df/df.vue'
import Pfmx from '@/views/pfmx/pfmx.vue'
Vue.use(Router)
const routes = [
  {
    path: '/role_one',
    name: 'role_one',
    component: Role_one,
  },
  {
    path: '/pfmx',
    name: 'pfmx',
    component: Pfmx,    
  },
  {
    path: '/role_three',
    name: 'role_three',
    component: Role_three,
  },  
  {
    path: '/role_four',
    name: 'role_four',
    component: Role_four,
    redirect: { name: 'kjchild' },
    children:[
      {
        path: 'kjchild',
        name: 'kjchild',
        component: Kjchild,
      },
      {
        path: 'deyuchild',
        name: 'deyuchild',
        component: Deyuchild,
      }
    ]
  },
  {
    path: '/role_two',
    name: 'role_two',
    component: Role_two,
    redirect: { name: 'kjtschild' },
    children:[
      {
        path: 'kjtschild',
        name: 'kjtschild',
        component: Kjtschild,
      },
      { 
        path:'tjchild',
        name:'tjchild',
        component: Tjchild,        
      },
      { 
        path:'xschild',
        name:'xschild',
        component: Xschild,        
      }
    ]
  },   
  {
    path: '/plxq',
    name: 'plxq',
    meta: { title: '评论' },
    component: Plxq,
    
  }, 
  {
    path: '/sspj',
    name: 'sspj',
    meta: { title: '宿舍评比' },
    component: Sspj,
    children:[

    ]
  },
  {
    path: '/detail',
    name:'detail',
    meta: { title: '' },
    component: Detail,
  },
  {
    path: '/bjpj',
    name: 'bjpj',
    meta: { title: '班级评比' },
    component: Bjpj,
  },
  {
    path: '/bop',
    name: 'bop',
    meta: { title: '表彰/评价' },
    component: Bop,
  },
  {
    path: '/dytj',
    name: 'dytj',
    meta: { title: '德育统计' },
    component: Dytj,
  },
  { 
    path:'/tjdetail',
    name: 'tjdetail',
    meta: { title: '' },
    component: Tjdetail,    
  },
  { 
    path: '/bjpm',
    name: 'bjpm',
    component: Bjpm,
  },
  { 
    path: '/df',
    name: 'df',
    component: Df,
  }  
]

const router = new Router({
  routes
})

export { router }
