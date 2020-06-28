<template>
  <div id="kjtschild">
    <indexDeyuList 
      ref="kjts"
    >
      <div class="roleTwoTop">
        <div class="pfIcon">
          <img :src="getImg">
          <div class="txt">
            今日评比
          </div>
        </div>
        <ul class="pmList">
          <li>
            <div 
              class="pm"
              v-text="df"
            ></div>
            <div 
              class="score"
            >
              今日分数
            </div>
          </li>
          <li>
            <div 
              class="pm"
              v-text="qx_pm_2"
            ></div>
            <div 
              class="score"
            >
              全校排名
            </div>
          </li>
          <li>
            <div 
              class="pm"
              v-text="nj_pm_2"
            ></div>
            <div 
              class="score"
            >
              全级排名
            </div>
          </li>
        </ul>
      </div>
    </indexDeyuList>
  </div>
</template>

<script>
  // import Kjts from '@/views/components/kjtsList.vue';
  import indexDeyuList from '@/views/components/indexDeyuList.vue'
  import {queryBjPm} from '@/request/deyu.js';
  import Aicon from '@/static/images/bj_zb_1.png';
  import Bicon from '@/static/images/bj_zb_2.png';
  import Cicon from '@/static/images/bj_zb_3.png';
  import Dicon from '@/static/images/bj_zb_4.png';
  const iconObj = {'A':Aicon,'B':Bicon,'C':Cicon,'D':Dicon};
  import Mixin from '@/static/js/mixins.js'
  export default {
    name:'RoleTwo', 
    components: {
      // Kjts
      indexDeyuList
    },
    mixins:[Mixin],
    data(){
      return {
        tabIndex:0,
        dj:'',
        nj_pm_2:'',
        qx_pm_2:'',
        df:'',
      }
    },
    computed: { 
      getImg() { 
        return this.dj?iconObj[this.dj]:Aicon
      }
    },
    created() { 
      this.getPm();
    },
    methods: { 
      tab(index) { 
        this.tabIndex = index;
      },
      getPm() {
        queryBjPm().then(data=>{ 
          this.dj = data.nj_pm[0].dj;
          this.df = data.nj_pm[0].df;
          this.nj_pm_2 = data.nj_pm[0].pm_2;
          this.qx_pm_2 = data.qx_pm[0].pm_2;
        })
      }
    }

  }
</script>

<style lang='less'>
  #kjtschild {
    height: 100%;
    .roleTwoTop {
      position: relative;
      overflow: hidden;
      height: 398px;
      background-color: #35A3DD;
    }
  }
</style>