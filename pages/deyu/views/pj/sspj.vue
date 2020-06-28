<template>
  <div id="sspj">
    <Pjrq
      ref="pjrq"
      :allist="allist"
      :dplist="dplist"
      :yplist="yplist"
      :domlist="domlist"
      :curss="curss"
      :pj-type-txt="'宿舍'"
      @changeId="changeId"
      @todetail="todetail"
    ></Pjrq>
  </div>
</template>

<script>
import Pjrq from '@/views/components/pjrq.vue';
import {queryDlList,queryPbList} from '@/request/deyu.js';
export default {
  name:'Sspj',
  components: { 
    Pjrq
  },
  data(){
    return { 
      domlist:[],
      curdom:{ssid:'',mc:'全部'},
      dplist:[],
      yplist:[],
      dxlx: 2,
      curss:'全部'
    }
  },
  computed: { 
    allist() { 
      return [...this.dplist,...this.yplist];
    }
  },
  provide: {
    pjtype: 0 
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
      queryDlList().then((data)=>{  
        this.domlist = data.list;
      })
      this.getqueryPbList()
    },
    update() { 
      this.getqueryPbList();
    },
    getqueryPbList(obj = this.curdom) { 
      var param = {};
      var {id,mc,lcid=""} = obj;
      param.dxid = id;
      param.dxlx = this.dxlx; //宿舍2  班级1
      if(lcid) { 
        param.lcid = lcid;
      } 
      console.log(param)
      return queryPbList(param).then(data=>{ 
        this.dplist = data.dplist;
        this.yplist = data.yplist;
      })
    },
    changeId(obj) { 
      this.curdom = obj;
      this.getqueryPbList().then(()=>{ 
        this.curss = obj.mc;
        this.$refs.pjrq.resetScroll();
      })
    },
    todetail(obj) { 
      var query = {};
      console.log(obj);
      query.dxid = obj.ssid;
      query.zblx = this.dxlx;
      query.fzStatus = obj.fzStatus;
      var _pageName = query.fzStatus?obj.text+'评价详情':obj.text
      this.settitle(_pageName);
      this.$router.push({name:'detail',query})
    }
  }
}
</script>

<style lang='less'>
  #sspj { 
    height: 100%;
    width:100%;
  } 
</style>