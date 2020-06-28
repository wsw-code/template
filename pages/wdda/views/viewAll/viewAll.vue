<template>
  <div id="viewAll">
    <div 
      class="bannerImg"
    >
      <div class="personInfo">
        <img 
          :src="showTx()"
          class="bAvator"
        >
        <div 
          v-if="userInfo"
          class="infoDetail"
        >
          <p 
            class="name"
            v-text="userInfo.xm"
          ></p>
          <p 
            class="school"
            v-text="userInfo.xx"
          ></p>
        </div>
      </div>
    </div>
    <ul v-if="bdmkList">
      <li
        v-for="(item,key) in bdmkList" 
        :key="key"
        class="liCell" 
      >
        <component 
          :is="getComponentsName(item)" 
          :uinfo="userInfo"
          :cdata="item"
          :only-view="true"
          :has-add="false"
          :is-view-page="true"
          :isbj="item.jbxx.isbj=='0'"
        ></component>
      </li>
    </ul>
  </div>
</template>
<script>
import Bg from '@/views/components/bg.vue'
import Bd from '@/views/components/bd.vue'

export default {
  name: 'Index',
  components: { 
    Bg,
    Bd
  },  
  data(){ 
      return { 
        name:'',
        school:'',
        curMore:'', //单个模块详细信息
        curData:{},
        curIndex:0,
        toIndex:0,
        bgIndex:-1,
        xxh:''
      }
  },
  computed:{ 
    bdmkList() { 
      return this.$store.state.bdmkList
    },
    userInfo() { 
      return this.$store.state.userInfo
    },
  },
  created() { 
  },
  mounted() { 

  },  
  methods: {
    getComponentsName(item) { 
      return item.jbxx.lx == '0'?'Bd':'Bg'
    }
  },

}
</script>
<style lang='less'>
  #viewAll { 
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .indexHead { 
      height: 90px;
      .bd(#ddd,'bottom');
    }
  }
  .bannerImg {
    width: 100%; 
    height: 242px;
    background: url('~@/static/images/banner.png') center center no-repeat;
    background-size: cover;
    padding: 0 30px;
    position: relative;
    margin-bottom: 105px;
  }

    .personInfo { 
    width: calc(100% - 60px);
    height: 208px;
    border-radius:10px;
    background-color: #fff;
    position: absolute;
    top: 138px;
    border: 1Px solid #ddd;
    left: 50%;
    transform: translateX(-50%);
    
  }
  .name { 
    color:#333;
    font-size: 36px;
  }
  .school { 
    color:#999;
    margin-top: 20px;
    font-size: 28px;
  }

  .infoDetail { 
    margin-top: 80px;
    p { 
      text-align: center;
    }
  }
  .bAvator { 
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top:-50%;
  }
</style>
