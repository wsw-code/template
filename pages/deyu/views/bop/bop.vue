<template>
  <div id="bop">
    <ul 
      v-if="showTab"
      class="tab"
    >
      <li 
        
        v-for="(item,index) in targetlist"
        :key="index"
        class="tabLi"
        :class="tabIndex == index?'active':''"
        @click="tab(index)"
        v-text="item.tabtxt"
      ></li>
    </ul>
    <keep-alive>
      <component
        :is="curdata.name" 
      ></component>
    </keep-alive>
  </div>
</template>

<script>
  import bz from './components/bz.vue'
  import pj from './components/pj.vue'
  export default {
    name:'Bop',
    components: { 
      bz,
      pj
    },
    data(){
      return { 
        tablist:[{ 
          tabtxt:'表彰',
          name:'bz'
        },{ 
          tabtxt:'评价',
          name:'pj'
        }],
        tabIndex: 0,
      }
    },
    computed: { 
      curdata() { 
        return this.targetlist[this.tabIndex];
      },
      type() { 
        return this.$route.query.type
      },
      showTab() {
        return this.type == 'pj'?false:true;
      },
      targetlist() { 
        if(this.type == 'pj') { 
          return [{tabtxt:'评价',name:'pj'}]
        } else { 
          return this.tablist
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.setHeadButton(false);
      next()
    },
    created() { 
      this.init();
    },
    methods: { 
      tab(index) { 
        this.tabIndex = index;
      },
      init() { 
        
      }
    }
  }
</script>

<style lang='less'>
  #bop { 
    width: 100%;
    min-height: 100%;
    flex:1;
    background-color: #EFEFEF;
    .tab { 
      width: 100%;
      height: 90px;
      display: flex;
      background-color: #fff;
    }
    .tabLi { 
      text-align: center;
      line-height: 90px;
      font-size: 32px;
      color:#999;
      width: 100%;
      position: relative;
      &:before { 
        content: '';
        position: absolute;
        bottom:0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #DDDDDD;
      }
      &.active { 
        color: #35A3DD;
        &:before { 
          content: '';
          position: absolute;
          bottom:0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #35A3DD;
        }
      }
    }
    .picArrWrapper { 
      background-color: #fff;
      padding: 0 30px;
      padding-top: 30px;
      margin-bottom: 30px;
    }
    .imagesUl { 
      margin-top: 0;
    }
    .uploadTxt { 
      margin-bottom: 30px;
    }
  }
</style>