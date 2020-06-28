<template>
  <div class="pjrq">
    <div class="showTime">
      <span>当前时间:</span>
      <span 
        class="dateClass"
        v-text="showTime"
      ></span>
      <span v-text="day"></span>
    </div>
    
    <ul class="tab">
      <li 
        v-for="(item,index) in tablist"
        :key="index"
        :class="tabIndex == index?'active':''"
        @click="tab(index)"
        v-text="item"
      ></li>
    </ul>
    <div
      v-show="domlist.length" 
      class="selectBox"
    >
      <div 
        class="txt"
        @click="open"
        v-text="curss"
      ></div>
      <div class="icon"></div>
    </div>
    <div class="ulist">
      <scroll
        ref="scroll"
        :data="list"
        :not-data-txt="getNoDataFn"
      >
        <div slot="sroll">
          <cell
            v-for="(item,index) in list"
            :key="index"
            :pjtype="pjtype"
            :left-txt="item.ssh || item.text"
            :fz="item.fzStatus?item.fzTotal:-1"
            :fz-status="item.fzStatus"
            :fn="()=>{todetail(item)}" 
            class="uli"  
          ></cell>
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
        :value-key="'mc'"
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
      :ss-list="domlist"
      v-on="$listeners"
    ></Sslc>
  </div>
</template>

<script>
  const weekArr = ['周日','周一','周二','周三','周四','周五','周六'];
  import { Picker,Popup } from 'mint-ui';
  import Cell from '@/views/render/cell.js'
  import Scroll from '@/views/base/scroll'
  import {ssUpdate} from '@/update.config.js';
  import Sslc from '@/views/components/sslc.vue';
  const updateArea = ssUpdate.updateArea;
  export default {
    components: { 
      Scroll,
      Picker,
      Popup,
      Cell,
      Sslc
    },
    inject: ['pjtype'],
    props: { 
      allist:{ 
        type:Array,
        default() { 
          return []
        }
      },
      yplist:{ 
        type:Array,
        default() { 
          return []
        }
      },
      dplist:{ 
        type:Array,
        default() { 
          return []
        }
      },
      domlist: { 
        type:Array,
        default() { 
          return []
        }        
      }, 
      curss: { 
        type:String,
        default:'全部'        
      }, 
      pjTypeTxt: {
        type:String,
        default:'班级'
      }        
    },
    data(){
      return { 
        tablist:['待评','已评','全部'],
        tabIndex:0,
        popupVisible:false,
        list:[],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
          }
        ]
      }
    },
    computed: { 
      date() { 
        return new Date();
      },
      day() { 
        return weekArr[this.date.getDay()];
      },
      showTime() { 
        var year = this.date.getFullYear();
        var month = this.date.getMonth()+1;
        var date = this.date.getDate();
        return `${year}-${month}-${date}`
      },
      getNoDataFn() { 
        var _txt = this.tablist[this.tabIndex];
        _txt=_txt == "全部"?'':_txt
        return `暂无${_txt}${this.pjTypeTxt}`
      },
      isSsAndUpdate() { //宿舍and更新
        if(this.pjtype == 0) { //宿舍
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
    watch:{ 
      domlist() { 
        this.init();
      },
      dplist() { 
        this.tab(this.tabIndex);
      }
    },
    methods: { 
      resetScroll() { 
        this.$refs.scroll && this.$refs.scroll.scrollTo(0,0,-1)
      },
      open() { 
        if(this.isSsAndUpdate) { 
          this.$refs.sslc.open();
        } else { 
          this.popupVisible=true; 
        }
        
      },
      tab(index) { 
        this.tabIndex = index;
        switch(index){ 
          case 0:
            this.list = this.dplist;
            break;
          case 1:
            this.list = this.yplist;
            break;
          case 2:
            this.list = [...this.yplist,...this.dplist];
        }
        
      },
      init() { 
        var _arr = [...this.domlist];
        _arr.unshift({mc:'全部',ssid:''});
        console.log(_arr);
        this.$refs.picker.setSlotValues(0,_arr);
      },
      sure() { 
        var _obj = this.$refs.picker.getValues();
        this.$emit('changeId',_obj[0]);
        this.popupVisible = false;
      },
      todetail(obj){ 
        console.log(12121);
        obj.tabIndex = this.tabIndex;
        this.$emit('todetail',obj)
      }
    }
  }
</script>

<style lang='less'>
.pjrq { 
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  .showTime { 
    height: 60px;
    background-color: #EFEFEF;
    line-height: 60px;
    text-align: center;
  }
  .dateClass { 
    margin: 0 15px;
  }
  .tab { 
    height: 90px;
    display: flex;
    .bd(#EFEFEF,'bottom');
    li { 
      display: flex;
      flex:1;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      color:#999;
      &.active { 
        color:#35A3DD;
        position: relative;
        &:before { 
          content: '';
          width: 100%;
          height: 1Px;
          background-color: #35A3DD;
          bottom:0;
          left:0;
          position: absolute;
        }
      }
    }
  }
  .selectBox { 
    width:fit-content;
    height:60px;
    display: flex;
    border: 1Px solid #ddd;
    border-radius: 5px; 
    margin: 30px 0;
    margin-left: 30px;
    .txt { 
      min-width: 130px;
      line-height: 60px;
      border-right: 1Px solid #ddd;
      color:#666;
      text-align: center;
      padding: 0 20px;
      white-space: nowrap;
    }
    .icon { 
      width: 60px;
      background: url('~@/static/images/pullmore.png') center center no-repeat;
      background-size: 18px 10px;
    }
  }

}

.ulist { 
  display: flex;
  flex: 1;
  flex-shrink:0;
  flex-direction: column;
  overflow-y: auto;
}
</style>