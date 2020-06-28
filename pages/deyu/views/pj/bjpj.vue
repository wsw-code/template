<template>
  <div id="bjpj">
    <Pjrq
      :allist="allist"
      :dplist="dplist"
      :yplist="yplist"
      :pj-type-txt="'班级'"
      @todetail="todetail"
    ></Pjrq> 
  </div>
</template>

<script>
import Pjrq from '@/views/components/pjrq.vue';
import {queryPbList} from '@/request/deyu.js';
export default {
  name:'Bjpj',
  components: { 
    Pjrq
  },
  data(){
    return { 
      domlist:[],
      curdom:{},
      dplist:[],
      yplist:[],
      dxlx: 1
    }
  },
  provide: {
    pjtype: 2 
  },
  computed: { 
    allist() { 
      return [...this.dplist,...this.yplist];
    }
  },
  created() { 
    this.init();
  },
  mounted() {
    this.vueBus.$on('update',()=>{ 
      this.update();
    }); 
  },
  methods: { 
    init() { 
      this.getqueryPbList()
    },
    update() { 
      this.getqueryPbList()
    },
    getqueryPbList() { 
      return queryPbList({dxlx:this.dxlx}).then(data=>{ 
        this.dplist = data.dplist;
        this.yplist = data.yplist;
      })
    },
    todetail(obj) { 
      var query = {};
      query.dxid = obj.bjid;
      query.zblx = this.dxlx;
      query.fzStatus = obj.fzStatus;
      var _pageName = query.fzStatus?obj.text+'评价详情':obj.text
      this.settitle(_pageName);
      this.$router.push({path:'detail',query})
    }
  }
}
</script>

<style lang='less'>
  #bjpj { 
    height: 100%;
    width:100%;
  } 
</style>