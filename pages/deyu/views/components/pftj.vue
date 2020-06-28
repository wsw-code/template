<template>
  <div class="pfmxWrapper">
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
    <div class="pfHead">
      <ul class="pfUlWrapper">
        <li class="pfCell">
          <div 
            v-for="(item,cellIndex) in tab"
            :key="cellIndex"
            class="cell headCell" 
            :style="tab[cellIndex].style"
            @click="sort(tab[cellIndex].key)"
          >
            <div v-text="item.mc"></div>
            <div 
              v-if="tab[cellIndex].key == 'fz'"
              class="pxarr"
            >
              <div 
                class="iconfont up-iconfont"
                :class="sortOrder=='1'?'pxActive':''"
              > 
                &#xe764;
              </div>
              <div 
                class="iconfont down-iconfont"
                :class="sortOrder=='0'?'pxActive':''"
              > 
                &#xe765;
              </div>
            </div>
          </div>  
        </li>  
      </ul> 
    </div>
    <div 
      class="scrollArea"
    >
      <scroll
        ref="scroll"
        :data="list"
        :pull-up-load-on="pull"
        @pullingUp="loadmore"
      >
        <div slot="sroll">
          <ul class="pfUlWrapper"> 
            <li
              v-for="(item,index) in list"
              :key="index"
              class="pfCell"    
            >
              <div 
                v-for="(cell,cellIndex) in tab"
                :key="cellIndex"
                class="cell" 
                :class="getClass(item,cell)"
                :style="tab[cellIndex].style"
                v-text="getVal(item,cell)"
              > 
              </div> 
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
  </div>
</template>

<script>
  import { Picker,Popup } from 'mint-ui';
  import {
    getDqxq, //获取学期
    getDyzb, //获取指标 1-班级 2-宿舍 3-个人
    queryDyPfMx,//指标明细list
    getXxNjList,
    queryDlList,
    getBjByXX,
  } from '@/request/deyu';
  import Scroll from '@/views/base/scroll.vue';
  export default {
    name:'Pftj',
    components:{ 
      Picker,
      Popup,
      Scroll
    },
    props:{
      tab:{ 
        type:Array,
        default() { 
          return []
        }
      },
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
        valKey:'zbmc',
        curZbIndex:0,
        list:[],
        zbList:[],
        sortOrder:'0',
        rxyIndex:0,
        rows:100,
        page:1,
        id:'',
        selist:[],
        popupVisible: false,
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
      selectType(){ 
        return this.rzy[this.rxyIndex];
      },
      zbid() { 
        return this.zbList.length>0?this.zbList[this.curZbIndex].zbid:''
      },
      curSelect() { 
        return this.zbList.length>0?this.zbList[this.curZbIndex].zbmc:''
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
      },
    },
    created() { 
      // this.initselectType(); //初始化 日周月
      // this.initSelect(); //初始化 左边选择列表
      getDqxq()
      this.getZbFunc()// 初始化指标
      .then(()=>{ 
        this.init(); //初始化 数据列表
      })
    },
    methods: { 
      sort(key) { 
        if(key != 'fz') return 
        this.sortOrder = this.sortOrder == '0'?'1':'0';
        this.reset();
        this.init(this.clearData);
      },
      init(fn) { 
        var params =  {
            selectType:this.selectType,//获取查询时间类型，1是当学期，2是当月，3是当周，4是当日
            dxlx:this.dxlx, // 1-班级评比 2-宿舍评比 3-学生
            zbid:this.zbid, //指标id
            sortName:"fz", //排序字段,默认传"fz"
            sortOrder:this.sortOrder, // -1：不排序 0：降序 1：升序 默认传-1，不排序
        }
        if(this.pull) { 
          params.rows = this.rows;
          params.page = this.page;
        }
        return queryDyPfMx(params).then(data=>{ 
          fn && fn();
          this.$refs.scroll.finishPullUp();
          if(data.rows.length == 0 && this.page>1 && this.pull) { 
            this.$refs.scroll.closePullUp();
          }
          this.list = [...this.list,...data.rows];
        })
      },
      getStyle(index) { 
        console.log(index)
        return `width:${this.tab[index].width}`
      },
      getVal(item,cell) { 
        // console.log(this.tab[index])
        if(cell['key'] == 'njbj') { 
          return `${item.njmc}${item.bjmc}`
        } else { 
          return item[cell['key']]
        }
      },
      getClass(item,cell) { 
        if(cell['key'] == 'fz') { 
          return parseInt(item.fz,10)>=0?'add':'reduce'
        }
      },
      getZbFunc() { 
        return getDyzb(this.dxlx).then(data=>{ 
          console.log(data)
          this.zbList = data.list;
          this.$refs.picker.setSlotValues(0,this.zbList);
        })
      },
      queryDyPfMxFunc() { 
        queryDyPfMx(this.queryParams).then(data=>{ 
          console.log(data)
        })
      },
      selrxy(item,index) { 
        if(this.rxyIndex == index) return 
        this.rxyIndex = index;
        this.reset();
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
        this.popupVisible = true;
      },
      sure() { 
        var _obj = this.$refs.picker.getValues()[0];
        var _index = this.zbList.indexOf(_obj);
        this.curZbIndex = _index;
        this.reset();
        this.init(this.clearData)
        this.popupVisible = false;
      },
      reset() { 
        this.page = 1;
        this.$refs.scroll.resetFn();
      },
      clearData() { 
        this.list = [];
        this.$refs.scroll.scrollTo(0,0);
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
          this.getdata(data.list);
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
    }

  }

</script>

<style lang='less'>
.pfUlWrapper { 
  li { 
    display: flex;
    align-items: center;
  }

}
.pxActive { 
  color:#35A3DD
}

.pfCell { 
  display: flex;
  align-items: center;
  min-height: 100px;
  padding: 20px 0;
  .bd(#EFEFEF,'bottom');
  .cell { 
    display: flex;
    text-align: center;
    justify-content: center;
    text-align: center;
  }
  .headCell { 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pxarr { 
    width: 20px;
    height: 36px;
    margin-left: 5px;
    text-align: center;
    font-size: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .add { 
    color:#35A3DD
  }
  .reduce{ 
    color:#EB7778;
  }
}
.cell.nowrapp { 
  white-space:normal;
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
.pfmxWrapper { 
  height: 100%;
  .head { 
    padding: 0 30px;
  }
  .pfHead { 
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
  .col { 
    width: 33.3%;
  }
  .scrollArea { 
    padding: 0 30px;
    height: calc(100% - 200px);
  }
}
</style>