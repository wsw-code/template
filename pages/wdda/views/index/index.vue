<template>
  <div class="indexWrapper">
    <div
      id="index"
    >
      <div
        v-if="bdmkTree.length>0" 
        class="xqWrapper"
      >
        <div 
          class="curXq"
          @click="selectXq"
        > 
          <span 
            class="xqtxt"
            v-text="curXq.text"
          >2019</span> 
          <img
            :class="selectControl?'':'down'"
            class="more"
            src="~@/static/images/more.png"
          >
        </div>
        <img 
          class="moreXq" 
          src="~@/static/images/menu.png"
          @click="selMoreXq"
        >
      </div>
      <ul 
        v-if="bdmkList"
      >
        <li
          v-for="(item,key) in bdmkList" 
          :key="key"
          class="liCell" 
        >
          <component 
            :is="getComponentsName(item)" 
            :uinfo="userInfo"
            :cdata="item"
            :show-all="false"
            :only-view="false"
            :isbj="item.jbxx.isbj=='0'"
            @add="add(key)"
            @viewMore="viewMore"
            @revise="(tdindex)=>{gotodetail({outKey:key,tdindex})}"
          ></component>
        </li>
      </ul>
    </div>
    <router-view 
      :cur-data="curData"
      :user-info="userInfo"
      :cur-index="toIndex"
      :bg-index="bgIndex"
      @getnewSjmap="getnewSjmap"
      @initbgIndex="initbgIndex"
    ></router-view>
    <div 
      v-drag
      class="viewAll" 
      @click="viewAll"
    >
      预览
    </div> 

    <popup 
      v-model="xqmodule"
      position="right"
      :z-index="90"
    >
      <div class="moduleWrapper">
        <ul>
          <li 
            v-for="(item,index) in allBdmkTree"
            :key="index"
          >
            <div 
              v-if="item.lx == '2'"
              class="moduleCell"
            >
              <img 
                class="comIcon" 
                :src="comIcon(item)"
              >
              <span v-text="item.text"></span>
            </div>
            <div 
            
              v-else
              :ref="`module_${index}`"
            >
              <div 
                class="moduleCell moduleCellHead"
                @click="controlModule(index)"
              >
                <span v-text="item.text"></span>
                <img 
                  :ref="`module_arr_${index}`"
                  class="more" 
                  src="~@/static/images/more.png"
                >
              </div>
              <div 
                v-for="(cell,cellindex) in item.children"
                :key="cellindex"
                class="moduleCell"
              >
                <img 
                  class="comIcon" 
                  :src="comIcon(cell)"
                >
                <span v-text="cell.text"></span>
              </div>
            </div>  
          </li>
        </ul>
      </div>
    </popup>
    <popup 
      v-model="selectControl"
      position="top"
      :z-index="12"
      class="xqSelectPop"
    >
      <ul class="xqList">
        <li 
          v-for="(item,index) in bdmkTree"
          :key="index"
          :class="curXq==item?'active':''"
          class="xqCell"
          @click.stop="selXq(item)"
          v-text="item.text"
        ></li>
      </ul>
    </popup>
  </div> 
</template>
<script>
import {getPersonalInfo} from "@/request/wdda"
import util from 'util';
import Bg from '@/views/components/bg.vue'
import Bd from '@/views/components/bd.vue'
import {mapMutations} from 'vuex'
import {Popup} from 'mint-ui'
console.log(Popup)
export default {
  name: 'Index',
  components: { 
    Bg,
    Bd,
    Popup
  },  
  data(){ 
      return { 
        name:'',
        school:'',
        bdmkList:'',
        curMore:'', //单个模块详细信息
        curData:{},
        userInfo:{},
        curIndex:0,
        toIndex:0,
        bgIndex:-1,
        xxh:'',
        allBdmkTree:[],
        bdmkTree:[],// 学期
        curXq:'', // 当前学期
        selectControl:false,
        xqmodule:false
      }
  },
  beforeRouteEnter (to, from, next) {
    window.AndoridBack = util.returnApp
    next();
  },
  beforeRouteLeave (to, from, next) {
    next();
  },
  created() { 
    this.init();
  },
  mounted() { 

  },
  activated() { 
    if(this.scrollLen) { 
      setTimeout(()=>{ 
        this.$refs.scroll.scrollTop = this.scrollLen;
        this.$refs.scroll.scrollTo(0,this.scrollLen);
      },0)
    }
  },  
  methods: {
    ...mapMutations([ 
    'getSingleInfo',
    'getBdmkList',
    'getUserInfo'
    ]),  
    controlModule(index) { 
      // console.log(this.$refs[`module_${index}`])
      this.$refs[`module_${index}`][0].classList.toggle('hide');
      this.$refs[`module_arr_${index}`][0].classList.toggle('down');
      
    },
    comIcon(item) { 
      return `${NODE_BASEURL}/pages/wdda/images/${item.icon}-.png`
    },
    viewAll() { 
      this.$router.push({name:'viewAll'})
    },
    add(key) { 
      this.getCurData(key,true);
    },
    viewMore(obj) { 
      var {cdata,zdList,sjMap} = obj;
      this.getSingleInfo({sjMap,zdList,cdata});
      this.$router.push({name:'more'})
    },
    revise(obj) { 
      console.log(obj)
    },
    initbgIndex() { 
      this.bgIndex = -1;
    },
    getComponentsName(item) { 
      return item.jbxx.lx == '0'?'Bd':'Bg'
    },
    getStatusName(item) { 
      if(item.jbxx.lx == '1') { 
        return '新增'
      } else { 
        if(item['sjMap']) { 
          return '查看'
        } else { 
          return '未填写'
        }
      }
    },
    selMoreXq() { 
      this.xqmodule = !this.xqmodule;
    },
    gotodetail(obj) { //从table跳去详情页
      var {outKey,tdindex} = obj; //outKey=>bdmkList数组索引，tdindex=>表格数据索引
      this.bgIndex = tdindex;
      this.getCurData(outKey);  
    },
    gettabledata(data) { 
      return data.sjMap?data.sjMap:[]
    },
    getCurData(index,query=false) { 
      // index=>索引
      this.curData = this.bdmkList[index];
      this.toIndex = index;
      sessionStorage.setItem('index',index);
      var type = query?'add':'resive' // 新增或修改
      this.$router.push({path:'/detail',query: {type}})
    },
    init() { 
      return getPersonalInfo().then(data => {
        // var data = mock; 
        if(data.result.code == '0') { 
          this.allBdmkTree = data.result.bdmkTree || []
          this.bdmkTree = this.getbdmkTree(this.allBdmkTree)
          this.curXq = this.bdmkTree.length>0?this.bdmkTree[0]:''
          this.allBdmkList = data.result.bdmkList;
          this.bdmkList = this.getbdmkList(this.allBdmkList);
          this.userInfo = data.result.userInfo;
          this.getBdmkList(this.bdmkList);
          this.getUserInfo(this.userInfo)
          sessionStorage.setItem('xxh',this.userInfo.xxh);
          if(sessionStorage.getItem('index')) { 
            this.curData = this.bdmkList[sessionStorage.getItem('index')];
          } 
        } else { 
          this.vmsg('',data.result.msg)
        }         
      })
    },
    getbdmkList(bdmkList) { 
      if(this.curXq) { 
        return bdmkList.filter(el=>el.xqh == this.curXq.xqh)
      } else { 
        return bdmkList
      }
    },
    getbdmkTree(bdmkTree) { //筛选lx为1的
      var _arr = bdmkTree.filter(el=>{ 
        return el.lx == 1
      })
      return _arr
    },
    selectXq() { //选择学期 
      this.selectControl = !this.selectControl;
    },
    selXq(item) { 
      this.curXq = item;
      this.bdmkList = this.getbdmkList(this.allBdmkList);
      this.selectControl = false;
    },
    getnewSjmap(data) { 
      var {newMap,curIndex,bgIndex} = data;
      if(bgIndex>=0) { //表单
        var curSjmap = this.bdmkList[curIndex].sjMap?this.bdmkList[curIndex].sjMap[bgIndex]:{};
        newMap = Object.assign(curSjmap,newMap);
        this.bdmkList[curIndex].sjMap[bgIndex] = newMap;
      } else { //表格
        var curSjmap = this.bdmkList[curIndex].sjMap?this.bdmkList[curIndex].sjMap:{}
        newMap = Object.assign(curSjmap,newMap);
        this.$set(this.bdmkList[curIndex],'sjMap',newMap);
      }
    }
  },

}
</script>
<style lang='less'>
  #index { 
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .indexHead { 
      height: 90px;
      .bd(#ddd,'bottom');
    }

  }

  .mint-popup-right { 
    height:100%;
    width:80%;
  }
  .indexWrapper { 
    .hide { 
      height: 80px;
      overflow: hidden;
    }
    .comIcon { 
      width:42px;
      margin-right: 15px;
    }
    .moduleWrapper { 
      height: 100%;
      overflow-y: auto;
    }
    .moduleCell { 
      height: 100px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      .bd(#ddd,'bottom');
      &.moduleCellHead { 
        height: 80px;
        display: flex;
        justify-content: space-between;
        background-color: #F4F4F4;
      }
    }
    .xqWrapper { 
      height: 80px;
      background-color: #f4f4f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      position: relative;
      z-index: 15;
    }
    .xqSelectPop { 
      width: 100%;
      top:80px;
    }
    .xqCell { 
      height: 100px;
      font-size: 28px;
      color:#666;
      text-align: center;
      line-height: 100px;
      .bd(#ddd,'bottom');
      &.active { 
        color:#388CFF;
      }
    }
    .more { 
      width:22px;
      margin-left: 10px;
      &.down { 
        transform: rotate(180deg)
      }
    }
    .moreXq { 
      width: 33px;
      height: 27px;
    }
    .curXq { 
      display: flex;
      align-items: center;
    }
    height: 100%;
    .viewAll { 
      height: 100px;
      width: 100px;
      position: fixed;
      bottom:10px;
      right:10px;
      text-align: center;
      line-height: 100px;
      background-color: #388CFF;
      color:#fff;
      border: 0px;
      border-radius: 50%;
      z-index: 10;
    }
    }
</style>
