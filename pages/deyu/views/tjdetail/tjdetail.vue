<template>
  <div id="tjdetail">
    <div 
      v-show="dxlx==3"
      class="xsdyWrapper"
    >
      <div>
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
        </ul>
        <div class="info">
          课堂评价记录
        </div>
      </div>
      <div class="tjScroll">
        <scroll
          ref="scroll"
          v-model="scrollY"
          :data="stateList['ids']"
          :pull-up-load="false"
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
            ></list-cell>
          </div>
        </scroll>        
      </div>
      <div>
      </div>
    </div>
    <div v-show="dxlx!=3">
      <div 
        v-show="!isNoData"
        class="scrollNodata"
      >
        <img src="@/static/images/nodata.jpg">
        <p>暂无数据</p>
      </div>
      <div
        v-show="isNoData"
      >
        <div class="cellLi">
          <div class="fsCell">
            <span>班级原始分</span>
            <span v-text="jbf+'分'"></span>
          </div>
        </div>
        <div class="cellLi">
          <div class="fsCell">
            <span>奖/扣总分</span>
            <span v-text="jkzf+'分'"></span>
          </div>
        </div>
      </div>

      <ul class="cellUl">
        <li
          v-for="(item,index) in dyItem"
          :key="index"
          class="cellLi dfCell" 
        >
          <div class="fsCell">
            <div class="leftPart">
              <span class="dot"></span>
              <span v-text="item.zbmc"></span>
            </div>
            <span 
              class="df"
              v-text="getdf(item.zbdf)"
            ></span> 
          </div>
          <ul 
            v-if="item.picList"
            class="picList"
          >
            <li
              v-for="(imgItem,imgIndex) in item.picList"
              :key="imgIndex"
              class="picLi"
              :style="`backgroundImage:url(${showImages(imgItem.path)})`"
              @click="viewImg(item.picList,imgIndex)"
            ></li>    
          </ul> 
        </li>
      </ul>
      <div 
        v-show="isNoData"
        class="cellLi" 
      >
        <div class="fsCell">
          <span>最后得分</span>
          <span v-text="jbf"></span>   
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryDxDy} from '@/request/deyu'
  import {mapMutations} from 'vuex'
  import Scroll from "@/views/base/yscroll.vue" 
  import ListCell from '@/views/components/listCell.vue'
  export default {
    name:'Tjdetail',
    components: { 
      Scroll,
      ListCell
    },
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
        scrollY:0
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.name != 'plxq') { 
        var _index = this.findIndex();
        var _arr  = [...this.keepPage];
        if(_index && _index>=0) { 
          _arr.splice(_index,1);
        }
        this.keepPageChange(_arr); 
        this.clearDeyu('personalDeyu');
      }
      next()
    },
    computed: { 
      dxlx() { 
        return this.$route.query.dxlx;
      },
      keepPage() { 
        return this.$store.state.keepPage;
      },
      stateList() { 
        return this.$store.state.personModule.deyuObj;
      }
    },
    activated() { 
      if(this.scrollY) { 
        setTimeout(()=>{
          this.$refs.scroll.scrollTo(0,this.scrollY,-1);
        },20)
      }
    },
    created() { 
      this.keepFn();
      this.init();
    },
    methods: {
      ...mapMutations({
        'keepPageChange':'keepPageChange',
        'deyuSet':'personModule/deyuSet',
        'clearDeyu':'personModule/clearDeyu',
      }), 
      pullingDown() { 
        this.init()
        .then(()=>{ 
          this.$refs.scroll.finishPullDown();
        })
      },
      init() { 
        return queryDxDy(this.$route.query).then(data=>{ 
          this.dyItem = data.dyItem;
          if(!this.dyItem.length) { 
            this.isNoData = false
          } else { 
            this.isNoData = true
          }
          this.jkzf = data.jkzf;
          this.jbf = data.fzTotal;
          this.fzTotal = data.fzTotal;
          
          if(this.dxlx == 3) { 
            this.ysf = data.jbf;
            this.jlf = data.jlf;
            this.xzf = data.xzf;
            this.fzTotal = data.fzTotal;
            this.xslist = data.tss || [];
            if(this.xslist.length>0) { 

              this.deyuSet(this.xslist);
            } else { 
              this.$refs.scroll.notDataFn();
            }
          }
        })
      },
      getdf(val) { 
        if(val== 0) { 
          return '正常'
        } else { 
          return val*1>0?`+${val}分`:`${val}分`
        }
      },
      keepFn() { 
        var _index = this.findIndex();
        var _arr  = [...this.keepPage];
        if(!_index) { 
          _arr.push('Tjdetail');
          this.keepPageChange(_arr);
        }
      },
      findIndex() { 
        var _index
        this.keepPage.some((el,index)=>{ 
          if(el =='Tjdetail') { 
            _index = index
            return true
          } 
        })
        return _index
      },
      viewImg(srcArr,index) { 
        var _srcArr = srcArr.map(el=>{ 
          return el.path
        })
        this.$bus.$emit('zoom',{img:_srcArr,index})
      },
    }
  }
</script>

<style lang='less'>
  #tjdetail { 
    width: 100%;
    height: 100%;
    .leftPart { 
      display: flex;
      align-items: center;
    }
    .dot { 
      width: 6px;
      height: 6px;
      background-color: #35A3DD;
      border-radius: 50%;
      display:block;
      margin-right: 10px;
    }
    .tjScroll {
      height: calc(100% - 200px);
    }
    .xsdyWrapper { 
      height: 100%;
    }
    .tjPmlist { 
      position: static;
      background-color: #35A3DD;
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
    .cellLi { 
      min-height: 100px;
      padding: 0 30px;
      .bd(#EFEFEF,'bottom');
      font-size: 28px;
      color:#666;
    }
    .fsCell { 
      display: flex;
      height: 100px;
      align-items: center;
      justify-content: space-between;
    }
    .dfCell { 
      background-color: #FAFAFA;
    }
    .cellUl { 
      padding-left: 30px;
      background-color: #FAFAFA;
    }
    .df { 
      color: #999;
    }
    .scrollNodata { 
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;
      img { 
        width: 40%;
      }
    }
    .picList { 
      display: flex;
      flex-wrap: wrap;
      .picLi { 
        width: 216px;
        height: 112px;
        background-size:cover;
        background-position: center center;
        margin-bottom: 30px;
        margin-right: 30px;
        &:nth-child(3n) { 
          margin-right: 0;
        }
      }
    }
  }
</style>