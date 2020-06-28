<template>
  <div class="viewMore">
    <div 
      v-show="isbj"
      class="bjsjkf"
    >
      <div v-if="shzt == '0' || !shzt">
        <p 
          v-if="shzt == '0'"
          v-text="shztInfo[shzt].txt"
        ></p>
        <p 
          v-if="kfsj"
          v-text="'开放编辑时间:'+kfsj"
        ></p>    
      </div>
      <div v-else>
        <div>
          <p v-text="shzt?shztInfo[shzt].txt:''"></p>  
          <p 
            v-show="shzt == '3'" 
            v-text="`原因：${bhyy}`"
          >
          </p>
        </div> 
      </div>     
    </div>
    <List 
      :sj-map="sjMap"
      :list="zdList"
      :cdata="cdata"
      :only-view="true"
    ></List>
  </div>
</template>

<script>
  import List from '@/views/components/list.vue'
  import {shztInfo} from '@/static/js/constant.js';
  export default {
    components: { 
      List
    }, 
    data(){
      return { 
        shztInfo,
      }
    },
    computed: { 
      shzt() { //审核状态
        return this.sjMap?this.sjMap.zt:'';
      },
      sjMap() { 
        return this.$store.state.singleInfo.sjMap
      },
      isbj() { 
        return this.cdata.jbxx.isbj == '0'
      },
      bhyy() { 
        return this.sjMap.bhyy
      },
      zdList() { 
        return this.$store.state.singleInfo.zdList
      },
      cdata() { 
        return this.$store.state.singleInfo.cdata
      },
      kfsj() { 
      if(this.cdata.jbxx && this.cdata.jbxx.hasOwnProperty('kssj')) { 
  
        var {kssj = [],jssj = []} = this.cdata.jbxx;
        kssj = kssj.split(' ')[0];
        jssj = jssj.split(' ')[0];
        return `${kssj} 至 ${jssj}`
      } else { 
        return ''
      }
    },
    },
  }
</script>

<style lang='less'>
  .viewMore { 
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    top:0;
    left:0;
    z-index: 20;
    background-color: #fff;
  }
  .bjsjkf { 
    min-height: 83px;
    line-height: 83px;
    padding: 20px 30px;
    color:#F2266F;
    background-color: rgba(242,38,111,0.05);
    p { 
      line-height: 1.5em;
    }
  }
</style>