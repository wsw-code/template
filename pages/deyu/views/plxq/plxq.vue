<template>
  <div class="Plxq">
    <div class="scrollArea">
      <scroll
        ref="plscroll"
        :data="list"
        :not-data-txt="'暂无评论'"
        @pullingUp="loadmore"
      >  
        <div slot="sroll">
          <list-cell
            :data="curData"
            :ispl="false"
            :cur-index="curIndex"
            class="bdb"
          ></list-cell>
          <div class="plTitle">
            最新评论
          </div>
          <ul>
            <li
              v-for="(item,index) in list"
              :key="index"
              class="plLi"
            >
              <div class="leftPart">
                <img 
                  src="@/static/images/head.png"
                  class="avator"
                >
              </div>
              <div class="prightPart">
                <div class="topR">
                  <span 
                    class="name"
                    v-text="item.name"
                  >
                  </span>
                  <span 
                    class="time"
                    v-text="item.time"
                  >
                  </span>
                </div>
                <div 
                  class="nr"
                  v-text="item.content"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="plInput">
      <input
        v-model="txt" 
        type="text"
        placeholder="友善发言的人运气都不会太差,字数限定200" 
      >
      <button @click="submit">
        发送
      </button>
    </div>
  </div>
</template>

<script>
import ListCell from '@/views/components/listCell.vue'
import Scroll from '@/views/base/scroll.vue'
import {mapMutations} from 'vuex'
import {savePl,getPllist} from '@/request/deyu'
export default {
  name:'Plxq',
  components: {
    ListCell,
    Scroll
  },
  data(){
    return {
      txt:'',
      page:1,
      rows:10,
      list:[],
      total:0,
    }
  },
  computed: { 
    curData() { 
      return this.$store.state.plObj;
    },
    curIndex() { 
      return this.$route.query.curIndex;
    }
  },
  watch: { 
    txt() { 
      if(this.txt.length>=200) { 
        this.txt = this.txt.slice(0,200);
      }
    }
  },
  created() { 
    this.init();
  },
  methods: { 
    ...mapMutations([ 
    'plsChange'
    ]),  
    submit() { 
      if(!this.txt) { 
        this.vmsg('','请输入评论');
        return 
      }
      savePl(this.curData.id,this.txt).then(data=>{
        this.$msg(data.msg);
        this.resetCurData();
        return this.reInit();
      }).then(()=>{ 
        this.$refs.plscroll.scrollTo(0,0);
      })
    },
    resetCurData() { 
      this.txt = '';
      this.curData.pls++;
      var _curData = Object.assign({},this.curData);
      _curData.pls++;
      this.plsChange({curData:this.curData,id:_curData.id})
    },
    reInit() { 
      this.page = 1;
      this.total = 0;
      this.$refs.plscroll.resetFn();
      return this.init(this.clearData);
    },
    clearData() { 
      this.list = [];
    },
    init(fn) { 
      return getPllist(this.curData.id,this.page,this.rows)
      .then(data=>{ 
        fn && fn();
        this.list = [...this.list,...data.rows];
        this.total = data.total*1;
        this.$refs.plscroll.finishPullUp();
        if(this.list.length >= this.total) { 
          this.$refs.plscroll.closePullUp();
        }
      })
    },
    loadmore() { 
      this.page++;
      this.init();
    }
  }
}
</script>

<style lang='less'>
  .Plxq { 
    height: 100%;
    .nr { 
      margin-top: 30px;
      line-height: 36px;
      font-size: 28px;
      padding-right: 30px;
      word-break: break-all;
    }
    .name { 
      font-size: 32px;
      color:#333;
    }
    .time { 
      color:#999999;
      font-size: 24px;
    }
    .leftPart { 
      padding-left: 30px;
      padding-top: 25px;
      display: inline-block;
    }
    .prightPart { 
      width: 100%;
      padding: 26px 0;
      .bd(#EFEFEF,'bottom');
    }
    .scrollArea { 
      height: calc(100% - 120px);
    }
    .plLi { 
      display: flex;
    }
    .topR { 
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
    }
    .bdb { 
      border-bottom: 30px solid #EFEFEF;
    }
    .plTitle { 
      height: 90px;
      color:#666;
      line-height: 90px;
      padding: 0 30px;
      font-size: 30px;
      font-weight: 400;
      .bd(#EFEFEF,'bottom');
    }
    .plInput { 
      height: 120px;
      .bd(#EFEFEF,'top');
      display: flex;
      align-items: center;
      padding: 0 30px;
      input { 
        width: 100%;
        border-bottom: 1Px solid #35A3DD;
        height: 60px;
        line-height: 60px;
      }
      button { 
        min-width:130px;
        height:56px;
        background:rgba(53,163,221,1);
        border-radius:28px; 
        color:#fff;   
        margin-left: 20px;    
      }
    }
  }
</style>