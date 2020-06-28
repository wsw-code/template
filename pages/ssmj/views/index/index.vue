<template>
  <div id="index">
    <top-detail 
      :total-ygq="totalYgq" 
      :total-wgq="totalWgq"
      :cur-time="getPreDate"
      @getTime="getTime"
    ></top-detail>
    <div class="headTitle">
      <div class="title">
        <span class="sprite"></span>  
        <span class="titleName">班级归寝情况</span>
      </div>
      <div 
        class="moreWrapper"
        @click="openSel"
      >
        <span 
          class="curTime nj_color"
          v-text="curNj.njmc"
        ></span>
        <img 
          v-show="openSelect"
          src="~@/static/images/more.png"
          class="more"
        >
      </div>
    </div>
    <div class="infoList">
      <div 
        v-show="showData"
        class="nodataWrapper"
      >
        <img 
          class="nodataImg" 
          src="~@/static/images/w_no.png"
        >
        <p>暂无数据</p>
      </div>
      <cell 
        v-for="(item,key) in gqList"
        :key="key"
        :cur-time="getPreDate"
        :data-obj="item"
      ></cell>  
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
    >
      <mt-picker
        ref="picker"
        :slots="slots"
        :show-toolbar="true"
        value-key="njmc"
      >
        <div class="topBar">
          <button 
            class="sure"
            @click="sure"
          >
            确 定
          </button>
        </div>
      </mt-picker>
    </mt-popup> 
  </div>
</template>
<script>
  import TopDetail from '@/views/components/topDetail.vue'
  import Cell from './components/cell.vue'
  import {Popup,Picker} from "mint-ui";
  import util from 'util'
  import {getNjbjBylsid,getXxgqtj,getNjgqtj} from '@/request/ssmj.js';
  import roleData from "@/static/js/roleConfig.js";
  const ROLE = roleData.GLY_GQGLY;
  export default {
    components:{ 
      Cell,
      "mt-popup":Popup,
      "mt-picker":Picker,
      TopDetail
    },
    data(){
      return {
        curTime:"",
        popupVisible:false,
        actions:[1,2,3,4],
        acIndex:0,
        selList:[],
        getPreDate:"",
        gqList:[],
        curNjObj:'',
        pickerVal:'',
        curIndex:0,
        njList:[],
        openSelect:false,
        curNj:'',
        showData:false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        totalYgq:0,
        totalWgq:0,
        jude:true
      }
    },
    computed:{ 
      isGly() { //是否是管理员
        return this.GetQueryString("role") === ROLE;
      }
    },
    created() { 
      this.initTime();
      window.AndoridBack = util.returnApp;
      getNjbjBylsid(NODE_BASEINFO.ksh)
      .then(data=>{ 
        console.log(data)
        var _njList = data.njList;
        this.openSelect = true;
        if(this.isGly) { 
          _njList.unshift({njmc:"全校",njid:''})
        }
        if(_njList.length == 1) { 
          this.openSelect = false;
        }
        this.njList = _njList
        this.curNj = data.njList[0];
        setTimeout(()=>{ 
          this.$refs.picker.setSlotValues(0,this.njList); 
        },20)
      })
      .then(()=>{ 
        if(this.isGly) { 
          this.getXxgqtjFn()
        } else { 
          this.getNjgqtjFn();
        }
      })
      
    },
    methods:{ 
      changeData() { 
        if(this.curNj.njid) { 
          this.getNjgqtjFn();
        } else { 
          this.getXxgqtjFn();
        }
      },
      getTime(value) { 
        this.getPreDate = value;
        this.changeData();
      },
      sure() { 
        this.popupVisible = false;
        var [data] = this.$refs.picker.getValues();
        this.curNj = data;
        this.changeData();  
      },
      getNjgqtjFn() { 
        getNjgqtj(this.curNj.njid,this.getPreDate)
        .then(data=>{ 
          this.dealGqList(data.list)
        })
      },
      getXxgqtjFn() { 
        var id = ''
        if(!this.curNj.njid) { 
          id = NODE_BASEINFO.ksh;
        } else { 
          id = this.curNj.njid
        }
        
        getXxgqtj(id,this.getPreDate)
        .then(data=>{ 
          this.dealGqList(data.list)
        })

      },
      initTime() { 
        var tsData = this.tsDate();
        if(tsData) { 
          this.getPreDate = tsData;
          return 
        }
        var dateObj = new Date();
        var _year =  dateObj.getFullYear();
        var _month = dateObj.getMonth()+1;
        _month = `${_month}`.padStart(2,'0');
        var _date = `${dateObj.getDate()}`.padStart(2,'0');
        this.getPreDate = `${_year}-${_month}-${_date}`
      },
      deal(data){ 
        // this.selList.push({mc:"全校",id:''})
        for(var i in data.role) { 
          var _cur = data.role[i]
          this.selList.push({mc:_cur.njmc,id:i})
        }
        this.$refs.picker.setSlotValues(0,this.selList);
      },
      dealGqList(list){ 
        console.log(list)
        if(list.length == 0) { 
          this.showData = true
        } else { 
          this.showData = false
        }
        this.gqList = list;
        var _totalYgq = 0;
        var _totalWgq = 0;
        list.forEach(el=>{ 
          _totalYgq+= parseInt(el.ygqrs);
          _totalWgq+=parseInt(el.wgqrs);
        })
        this.totalYgq = _totalYgq;
        this.totalWgq = _totalWgq;
      },
      openSel() { 
        if(!this.openSelect) return 
        this.popupVisible = true
      }
    }
  }
</script>

<style lang='less'>
 #index { 
  background-color: #f2f2f2;
  height: 100%;
  padding: 30px; 
  .wgq_color { 
    color:#FDA844;
  }
  .nj_color { 
    color:#666;
    font-size: 28px;
  }
  .infoList { 
    height: calc(100% - 330px);
    overflow-y: auto; 
  }
  .mint-popup-bottom { 
    width: 100%;
  }
  .selectWrapper { 
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    background-color: #fff;
    &::-webkit-scrollbar {
      width: 4Px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #388CFF;
    }
    &::-webkit-scrollbar-track { 
      background-color: #dedede;
    }
  }
  .topBar { 
    height: 80px;
    padding: 0 30px;
    .bd(#ddd,'bottom');
    .sure { 
      background-color: #388CFF;
      color:#fff;
      border: 0px;
      padding: 10px 20px;
      float: right;
      border-radius: 5px;
      margin-top: 10px;
    }
  }
 }
</style>