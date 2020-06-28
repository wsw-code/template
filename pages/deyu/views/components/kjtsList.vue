<template>
  <div class="kjtsList">
    <scroll
      ref="scroll"
      :pull-down-refresh="personal?false:true"
      :data="stateList['ids']"
      @pullingUp="loadmore"
      @pullingDown="pullingDown"
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
  import {getKjtsList,updateDz} from '@/request/deyu'
  import Scroll from "@/views/base/scroll.vue" 
  import ListCell from '@/views/components/listCell.vue'
  export default {
    name:'Kjts',
    components: {
      ListCell,
      Scroll
    },
    props: { 
      xslist: { 
        type:Array,
        default() { 
          return []
        }
      },
      personal: { 
        type: Boolean,
        default: false
      },
      replace: { 
        type: Boolean,
        default: false
      }
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
      vuexState() { 
        return this.personal?'personalDeyu':'indexDeyu';
      },
      stateList() { //获取德育数据
        return this.$store.state[this.vuexState];
      }
    },
    watch:{ 
      xslist() { 
        this.deyuChange({list:this.xslist,type:this.vuexState,replace:this.replace})
        this.$refs.scroll.closePullUp();
      }
    },
    created() { 
      this.init();
    },
    activated() { 
      this.kstsIdChange(new Date().getTime());  //获取唯一id 做点赞判断
      this.curDzId = this.kstsId;
      if(this.isupdate) { 
        this.reInit();
      }
      if(this.scrollY) { 
        setTimeout(()=>{
          this.$refs.scroll.scrollTo(0,this.scrollY,-1);
        },20)
      }
    },
    mounted() { 
      if(this.curDzId != this.kstsId) return 
      this.vueBus.$on('toUpdateDz',(id)=>{ 
        var curData = this.stateList['list'][id];        
        updateDz(curData.id)
        .then(data=>{ 
          if(data.dz.status == '1') { 
            curData.dzs --;
            curData.sfdz = 0;
            curData.dzs = Math.max(0,curData.dzs)
          } else { 
            curData.sfdz = 1;
            curData.dzs ++;
          }
          this.plChange(curData);
        })
      })
    },
    methods: {
      ...mapMutations([ 
      'plChange',
      'deyuChange',
      'clearDeyu',
      'kstsIdChange'
      ]), 
      reInit() { 
        this.total = 0;
        this.page = 1;
        this.scrollY = 0;
        this.$refs.scroll.scrollTo(0,0,-1);
        this.$refs.scroll.resetFn();
        this.init(this.clearData).then(()=>{ 
          this.$store.commit('kjtsUpadte',false);
        })
      },
      init(fn) { 
        if(this.personal) { 
          return 
        } 
        return getKjtsList(this.page,this.rows).then(data=>{ 
          fn && fn();
          this.deyuChange({list:data.rows,type:this.vuexState})
          this.total = data.total*1;
          this.$refs.scroll.finishPullUp();
          if(this.stateList['ids'].length >= this.total) { 
            this.$refs.scroll.closePullUp();
          }
        })
      },
      pullingDown() { 
        this.total = 0;
        this.page = 1;
        this.$refs.scroll.resetFn();
        this.init(this.clearData).then(()=>{ 
          this.$refs.scroll.finishPullDown();
        })
      },
      clearData() { //清除对应列表数据
        this.clearDeyu(this.vuexState);
      },
      toPlxq(obj) { 
        this.plChange(obj);
        this.scrollY = this.$refs.scroll.scroll.startY;
        this.$router.push({name:'plxq',query:{curIndex:this.curIndex}});
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