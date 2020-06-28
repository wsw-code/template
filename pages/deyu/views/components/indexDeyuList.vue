<template>
  <div class="kjtsList">
    <scroll
      ref="scroll"
      v-model="scrollY"
      :pull-down-refresh="true"
      :data="stateList['ids']"
      @pullingUp="loadmore"
    >
      <div 
        slot="sroll"
        class="scrollArea"
      >
        <slot></slot>
        <list-cell
          v-for="(id,index) in stateList['ids']"
          :key="index" 
          :data="stateList['list'][id]"
          @toPlxq="toPlxq(stateList['list'][id])"
        ></list-cell>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {getKjtsList} from '@/request/deyu'
  import Scroll from "@/views/base/yscroll.vue" 
  import ListCell from '@/views/components/listCell.vue'
  export default {
    name:'IndexDeyuList',
    components: {
      ListCell,
      Scroll
    },
    data(){
      return { 
        page:1,
        rows:20,
        list:[],
        total:0,
        scrollY:0,
        curIndex:0,
        changePls:false,
        changeData:{},
        componentId:'',
        curDzId:''
      }
    },
    computed:{ 
      isupdate() { 
        return this.$store.state.kjtsUpadte
      },
      kstsId() { 
        return this.$store.state.kstsId;
      },
      stateList() { //获取德育数据
        return this.$store.state.indexModule.deyuObj;
      }
    },
    created() { 
      this.init();
    },
    activated() { 
      if(this.isupdate) { 
        this.reInit();
      }
      setTimeout(()=>{
        this.$refs.scroll.scrollTo(0,this.scrollY,-1);
        this.scrollY = 0;
      },0)
    },
    deactivated() { 
    },
    methods: {
      ...mapMutations({
        'deyuChange':'indexModule/deyuChange',
        'clearDeyu':'indexModule/clearDeyu',
        'plChange':'plChange'
      }), 
      reInit() { 
        this.total = 0;
        this.page = 1;
        this.scrollY = 0;
        this.$refs.scroll.scrollTo(0,0,-1);
        this.init(this.clear,true).then(()=>{ 
          this.$store.commit('kjtsUpadte',false);
        })
      },
      init(fn,loading=false) { //初始化数据
        return getKjtsList(this.page,this.rows,loading).then(data=>{ 
          fn && fn();
          this.deyuChange(data.rows);
          this.total = data.total*1;
          this.$refs.scroll.finishPullUp();
          console.log(this.stateList['ids'].length , this.total)
          if(this.stateList['ids'].length >= this.total) { 
            this.$refs.scroll.closePullUp();
          }
        })
      },
      pullingDown() { 
        this.total = 0;
        this.page = 1;
        this.$refs.scroll.resetFn();
        this.init().then(()=>{ 
          // console.log(121212)
          this.$refs.scroll.finishPullDown();
        })
      },
      clear() {
        this.clearDeyu(); 
      },
      loadmore() { 
        this.page++;
        this.init();
      },
      resfreshScroll(){ 
        this.$refs.scroll && this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style lang='less'>
  .kjtsList { 
    width: 100%;
    height: 100%;
    .scrollArea { 
      min-height: 100%;
    }
  }
</style>