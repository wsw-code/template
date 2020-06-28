<template>
  <div class="deyuChild">
    <div class="myScroll">
      <scroll
        :data="stateList['ids']"
        :pull-up-load="false"
      > 
        <div 
          slot="sroll"
          class="scrollArea"
        >
          <div class="topBg">
            <div 
              v-if="showBtn()" 
              style="color:#fff;text-align:right" 
              @click="routoBjPm"
            >
              班级排名
            </div>
            <ul class="rzyUl">
              <li 
                v-for="(item,index) in rzyList"
                :key="index"
                :class="item.fw == fw?'active':''"
                @click="getFw(item.fw)"
                v-text="item.txt"
              >
              </li>
            </ul>
            <ul class="pmList tjPmlist">
              <li>
                <div 
                  class="pm"
                  v-text="ysf"
                ></div>
                <div 
                  class="score"
                >
                  原始分
                </div>
              </li>
              <li>
                <div 
                  class="pm"
                  v-text="jlf"
                ></div>
                <div 
                  class="score"
                >
                  奖励分
                </div>
              </li>
              <li>
                <div 
                  class="pm"
                  v-text="xzf"
                ></div>
                <div 
                  class="score"
                >
                  修正分
                </div>
              </li>
              <li>
                <div 
                  class="pm"
                  v-text="fzTotal"
                ></div>
                <div 
                  class="score"
                >
                  最后分
                </div>
              </li>  
              <li>
                <div 
                  class="pm"
                  v-text="pm"
                ></div>
                <div 
                  class="score"
                >
                  排名
                </div>
              </li>       
            </ul>
            <div class="info">
              课堂评价记录
            </div>
          </div>
          <list-cell
            v-for="(id,index) in stateList['ids']"
            :key="index" 
            :data="stateList['list'][id]"
          ></list-cell>
        </div>
      </scroll>  
    </div>
  </div>
</template>

<script>
  import {queryDxDy} from '@/request/deyu'
  import Mixin from '@/static/js/mixins.js'
  import Scroll from "@/views/base/yscroll.vue" 
  import ListCell from '@/views/components/listCell.vue'
  import {mapMutations} from 'vuex'  
  export default {
    components: { 
      ListCell,
      Scroll
    },
    mixins:[Mixin],
    data(){
      return { 
        dyItem:[],
        xslist:[],
        jkzf:'',
        jbf:0,
        ysf:'',
        jlf:'',
        xzf:'',
        isNoData: false,
        fzTotal:'',
        dxlx:3,
        fw:'1',
        pm:'',
        rzyList:[{txt:'日',fw:'1'},{txt:'周',fw:'2'},{txt:'月',fw:'3'}],
      }
    },
    computed: { 
      userId() { 
        return this.$store.state.userId;
      },
      stateList() { 
        return this.$store.state.myModule.deyuObj;
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{ 
        vm.setHeadButton('班级排名',vm.routoBjPm);
      });
    },
    created() { 
      this.init();
    },
    methods: {
      ...mapMutations({
        'deyuSet':'myModule/deyuSet',
        'clearDeyu':'myModule/clearDeyu',
      }),  
      pullingDown() { 
        this.init()
        .then(()=>{ 
          this.$refs.scroll.finishPullDown();
        })
      },    
      init() { 
        console.log(this.$route.query)
        return queryDxDy({dxlx:this.dxlx,dxid:this.userId,fw:this.fw,pm:'1'}).then(data=>{ 
          this.dyItem = data.dyItem;
          if(!this.dyItem.length) { 
            this.isNoData = false
          } else { 
            this.isNoData = true
          }
          this.jkzf = data.jkzf;
          this.jbf = data.jbf;
          this.fzTotal = data.fzTotal;
          if(this.dxlx == 3) { 
            this.ysf = data.jbf;
            this.jlf = data.jlf;
            this.xzf = data.xzf;
            this.fzTotal = data.fzTotal;
            this.xslist = data.tss || [];
            this.deyuSet(this.xslist);
            if(data.pmjl) { 
              this.pm = data.pmjl.pm_1;
              this.bjname = data.pmjl.njmc + data.pmjl.mc;
              this.bjid = data.pmjl.bjid;
            }
          }
        })
      },
      getFw(fw) { 
        this.fw = fw;
        this.init();
      },
      routoBjPm() { 
        this.$router.push({name:'bjpm',query:{bjname:this.bjname,bjid:this.bjid}});
      }
    }
  }
</script>

<style lang='less'>
  .deyuChild { 
    position: absolute;
    top:0;
    left:0;
    bottom:100px;
    width:100%;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
    .myScroll { 
      height: 100%;
    }
    .topBg { 
      background-color: #35A3DD;
      overflow: hidden;
    }
    .rzyUl { 
      display: flex;
      align-items: center;
      justify-content: center;
      color:#fff;
      border: 1Px solid #fff; 
      width: 265px;
      margin: 30px auto;
      li { 
        font-size: 28px;
        display: flex;
        justify-content: center;
        flex:1;
        line-height: 60px;
        & + li { 
          border-left: 1Px solid #fff;
        }
        &.active { 
          background: #fff;
          color:#35A3DD;
        }
      }
    }
    .tjPmlist { 
      position: static;
      height: 140px;
      padding-bottom: 0;
      align-items: center;
    }
    .info { 
      height: 60px;
      line-height: 60px;
      background-color: #EFEFEF;
      color:#666;
      padding: 0 30px;
    }
  }
</style>