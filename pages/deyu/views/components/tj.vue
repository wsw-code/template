<template>
  <div class="filterWrapper">
    <slot></slot>
    <div class="filter">
      <div 
        v-show="showSelect"
        class="selectBox" 
        @click="openAction"
      >
        <div 
          class="txt"
          v-text="curSelect"
        ></div>
        <div class="icon"></div>
      </div>
      <ul class="rzy">
        <li
          v-for="(item,index) in rzy"
          :key="index"
          class="rxyLi"
          :class="rxyIndex == index?'active':''"
          @click="selrxy(item,index)"
          v-text="getName(item)"
        ></li>
      </ul>
    </div>
    <div 
      v-if="mybjlistshow"
      class="mypm"
    >
      <table>
        <colgroup>
          <col class="col">
          <col class="col">
          <col class="col">
        </colgroup>
        <tr
          v-for="(item,index) in mybjlist"
          :key="index"
        >
          <td v-text="index+1"></td>
          <td v-text="gettdname(item)"></td>
          <td v-text="getVal(item)"></td>
        </tr>
      </table> 
    </div>

    <div class="head">
      <table>
        <colgroup>
          <col class="col">
          <col class="col">
          <col class="col">
        </colgroup>
        <tr>
          <th>排名</th>
          <th v-text="trname"></th>
          <th>分数</th>
        </tr>
      </table>
    </div>
    <div 
      class="scrollArea"
      :style="showbg?'height:calc(100% - 8.5rem)':''"
    >
      <scroll
        ref="scroll"
        :data="list"
        :pull-up-load-on="pull"
        @pullingUp="loadmore"
      >
        <div slot="sroll">
          <ul class="tableUl">
            <li
              v-for="(item,index) in list"
              :key="index"
              :class="index<=2?'activeTr':''"
              @click="todetail(item)"
            >
              <div class="tdcell"> 
                <div
                  v-if="index<=2" 
                  class="pm"
                  :class="`pm${index+1}`"
                ></div>
                <span
                  v-else
                  v-text="index+1"
                ></span>
              </div>
              <div
                class="tdcell"
                v-text="gettdname(item)"
              ></div>
              <div 
                class="tdcell"
                v-text="getVal(item)"
              ></div>
            </li>
          </ul>          
        </div>
      </scroll>
    </div>


    <popup 
      v-model="popupVisible" 
      position="bottom" 
      class="mint-popup"
    >
      <picker 
        ref="picker"
        :slots="slots"
        :show-toolbar="true"
        :value-key="valKey"
      >
        <div class="popTitle">
          <button 
            class="sure" 
            @click="sure"
          >
            确认
          </button>
        </div>
      </picker>
    </popup>

    <Sslc 
      v-if="isSsAndUpdate"
      ref="sslc"
      :ss-list="selist"
      v-on="$listeners"
      @changeId="changeId"
    ></Sslc>     
  </div>
</template>

<script>
  import { Picker,Popup } from 'mint-ui';
  import {getDqxq,getXxNjList,queryDlList,getBjByXX,queryDytj} from '@/request/deyu';
  import Scroll from '@/views/base/scroll.vue';
  import {ssUpdate} from '@/update.config.js';
  import Sslc from '@/views/components/sslc.vue';
  const updateArea = ssUpdate.updateArea;
  export default {
    components:{ 
      Picker,
      Popup,
      Sslc,
      Scroll
    },
    props:{
      mybjlistshow: { 
        type:Boolean,
        default: true        
      },
      bbxs: {  //等于1的时候获取本班德育在全校情况
        type:Number,
        default: 0
      },
      showSelect: { 
        type:Boolean,
        default: true
      }, 
      showbg: { 
        type:Boolean,
        default: false
      },
      pull: { 
        type:Boolean,
        default:false
      },
      refresh: { 
        type:Boolean,
        default:false
      },
      rzy:{ 
        type:Array,
        default() { 
          return []
        }
      },
      dxlx: { 
        type:Number,
        default:1        
      },
      valKey: { 
        type:String,
        default:'mc'            
      },
      idkey: { 
        type: String,
        default:''               
      },
      trname: { 
        type:String,
        default:''
      },
      getid: { 
        type:String,
        default:''
      }
    },
    data(){
      return { 
        list:[],
        rxyIndex:0,
        rows:100,
        page:1,
        id:'',
        selist:[],
        popupVisible: false,
        curSelect:'全部',
        selectType:'',
        mybjlist:[],
        fwObj:{'4':1,'3':2,'2':3},
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    computed: { 
      getSelectFn() { 
        return { 
          '1':this.bjdy,
          '2':this.ssdy,
          '3':this.xsdy
        }
      },
      isSsAndUpdate() { //宿舍and更新
        if(this.dxlx == 2) { //宿舍
          if(updateArea.indexOf(NODE_BASEINFO.area)>=0 || updateArea.indexOf(this.GetQueryString('area'))>=0) { 
            return true
          } else {
            return false
          }
        } else { 
          return false
        }
      }
    },
    watch: { 
      selist() { 
        this.$refs.picker.setSlotValues(0,this.selist);
      },
      refresh() { 
        if(this.refresh) { 
          this.$refs.scroll.refresh();
        }
      }
    },
    created() { 
      this.initselectType(); //初始化 日周月
      this.initSelect(); //初始化 左边选择列表
      this.init(); //初始化 数据列表
    },
    activated() { 
      console.log('shuaxin')
      this.$refs.scroll && this.$refs.scroll.refresh()
    },
    methods: { 
      init(fn) { 
        var params = {};
        if(this.getid) { 
          this.id = this.getid;
        }
        params.dxlx = this.dxlx;
        params.selectType = this.selectType;
        params[this.idkey] = this.id || '';
        if(this.pull) { 
          params.page = this.page;
          params.rows = this.rows;
        }
        if(this.bbxs) { 
          params.bbxs = this.bbxs;
        }
        return queryDytj(params).then(data=>{ 
          fn && fn();
          this.$refs.scroll.finishPullUp();
          if(data.rows.length == 0 && this.page>1 && this.pull) { 
            this.$refs.scroll.closePullUp();
          }
          if(data.mybjlist) { 
            this.mybjlist = data.mybjlist;
          }
          this.list = [...this.list,...data.rows];
        })
      },
      getVal(item) { 
        switch(this.dxlx) { 
          case 1:
          return item.zf || item.avg;
          case 2:
          return item.fs;
          default:
          return item.df
        }
      },
      selrxy(item,index) { 
        if(this.rxyIndex == index) return 
        this.rxyIndex = index;
        this.selectType = item;
        this.init(this.clearData);
      },
      bzr_update() { 
        this.init(this.clearData);
      },
      loadmore() { 
        this.page++;
        this.init().then(()=>{
          this.$refs.scroll.finishPullUp();
        })
      },
      gettdname(item) { 
        switch(this.dxlx) { 
          case 1:
          return item.njjc + item.bjjc
          case 2:
          return item.ssh;
          default:
          return item.xm
        }
      },
      initselectType() { 
        this.selectType = this.rzy[0];
      },
      getName(index) { 
        switch (index) { 
          case 2:
            return '月'
          case 3:
            return '周'
          default:
            return '日'
        }
      },
      openAction() { 
        if(this.isSsAndUpdate) { 
          this.$refs.sslc.open();
        } else { 
          this.popupVisible = true;
        }
        
      },
      changeId(obj) { 
        console.log(obj)
        this.id = obj.lcid?obj.lcid:obj.id;
        this.page = 1;
        this.$refs.scroll.scrollTo(0,0);
        this.$refs.scroll.resetFn();
        this.init(this.clearData).then(()=>{ 
          this.curSelect = obj.mc;
        })        
      },
      sure() { 
        var _obj = this.$refs.picker.getValues()[0];
        console.log(_obj)
        this.id = _obj.id || '';
        this.page = 1;
        this.$refs.scroll.scrollTo(0,0);
        this.$refs.scroll.resetFn();
        this.init(this.clearData).then(()=>{ 
          this.curSelect = _obj.mc;
        })
        this.popupVisible = false;
      },
      clearData() { 
        this.list = [];
      },
      initSelect() { 
        this.getSelectFn[this.dxlx]();
      },
      bjdy() { 
        getDqxq().then(data=>{ 
          return getXxNjList(data.dqxq.xdh)
        })
        .then(data=>{ 
          this.getdata(data.list);
        })
      },
      ssdy() { 
        queryDlList().then(data=>{ 
          if(this.isSsAndUpdate) { 
            this.selist = data.list;
          } else { 
            this.getdata(data.list);
          }
        })
      },
      getdata(arr) { 
        arr.unshift({mc:'全部'});
        this.selist = arr
      },
      xsdy() { 
        getBjByXX().then(data=>{ 
          var _arr = data.rows;
          _arr = data.rows.map(el=>{ 
              el.mc = `${el.njmc}${el.bjmc}`;
              el.id = el.bjid;
              return el
          })
          this.getdata(_arr);
        })
      },
      todetail(item) { 
        // if(this.selectType != 4) return  //
        // console.log(item)
        this.$router.push({name:'tjdetail',query:{dxlx:this.dxlx,dxid:item.id || item.xsid,fw:this.fwObj[this.selectType]}})
      }
    },


  }

</script>

<style lang='less'>
.popTitle { 
  overflow: hidden;
}
.tableUl { 
  width: 100%;
  li { 
    min-height: 90px;
    display: flex;
    flex:1;
    align-items: center;
    justify-content: center;
    .bd(#ddd,'bottom');
    
  }
  .tdcell { 
    display: flex;
    justify-content: center;
    flex:1;
  }
  .pm { 
    width: 30px;
    height: 40px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .pm1 { 
    background-image: url('~@/static/images/ico_pm_1.png');
  }
  .pm2 { 
    background-image: url('~@/static/images/ico_pm_2.png');
  }
  .pm3 { 
    background-image: url('~@/static/images/ico_pm_3.png');
  }
}
.filter { 
  overflow: hidden;
  height: 100px;
  padding: 0 30px;
  padding-top: 30px;
  .rzy { 
    display: flex;
    overflow: hidden;
    border: 1Px solid #35A3DD;
    border-radius: 5px;
    float: right;
    .rxyLi { 
      height: 60px;
      width: 88px;
      text-align: center;
      line-height: 60px;
      &.active { 
        background-color:#35A3DD;
        color:#fff;
      }
      & + .rxyLi { 
        border-left: 1Px solid #35A3DD;
      }
    }
  }
  .select { 
    display: flex;

  }
  .selectBox { 
    height:60px;
    display: flex;
    border: 1Px solid #ddd;
    border-radius: 5px; 
    margin-left: 30px;
    float: left;
    .txt { 
      min-width: 130px;
      line-height: 60px;
      border-right: 1Px solid #ddd;
      color:#666;
      text-align: center;
      white-space: nowrap;
      padding: 0 20px;
    }
    .icon { 
      width: 60px;
      background: url('~@/static/images/pullmore.png') center center no-repeat;
      background-size: 18px 10px;
    }
  }
}
.mypm { 
  padding: 0 30px;
  border-bottom: 30px solid #EFEFEF;
}
.filterWrapper { 
  height: 100%;
  .scrollArea { 
    padding: 0 30px;
  } 
  .head { 
    padding: 0 30px;
  }
  table { 
    width: 100%;
    .activeTr { 
      color:#35A3DD;
    }
    td { 
      text-align: center;
      height: 100px;
      font-size: 28px;
    }
    tr { 
      height: 100px;
      border-bottom: 1Px solid #EFEFEF;
    }

  }
  .col { 
    width: 33.3%;
  }
  .scrollArea { 
    height: calc(100% - 200px);
  }
}
</style>