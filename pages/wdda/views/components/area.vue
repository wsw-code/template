<template>
  <div class="area">
    <input
      v-model="val"
      class="commonInput"
      readonly="true"
      :class="ableBj?``:`unableText`"
      @click="openArea"
    >
    <Popup
      v-model="openPop"
      position="bottom"
    >
      <div class="areaWrapper">
        <div class="areaTitle">
          <ul class="showArea">
            <li
              v-for="(item,index) in areaList"
              :key="index"
              :class="curIndex == index?'active':''"
              @click="changeTab(index)"
            >
              <span v-text="item.mc"></span>
              <span v-show="item.mc && index!=areaList.length-1">></span>
            </li>      
          </ul>   
          <span>选择地区</span>
        </div>
        <div class="areaList">
          <div 
            class="scrollArea"
          >
            <scroll
              ref="scroll"
              :data="getList"
            >
              <ul slot="sroll">
                <li
                  v-for="(item,key) in getList"
                  :key="key"
                  class="areaLi"
                  :class="item.sxh == areaList[curIndex].sxh?'active':''"
                  @click="next(item.sxh,item.mc)"
                  v-text="item.mc"
                ></li>
              </ul>
            </scroll>
          </div>
        </div>  
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
import Scroll from '@/views/base/scroll'
import {getEaraList} from "@/request/wdda"
import Mixin from '@/static/js/mixins'
export default {
  name:'Area',
  components: { 
    Popup,
    Scroll
  },  
  mixins:[Mixin],
  data(){
    return  { 
      openPop:false,
      areaList:[
        {name:'provinceList',list:[],mc:'',sxh:'',scroll:''},//省
        {name:'cityList',list:[],mc:'',sxh:'',scroll:''},//市
        {name:'regionList',list:[],mc:'',sxh:'',scroll:''},//区
      ],
      curIndex:0
    }
  },
  computed:{
    getList() { 
      return this.areaList[this.curIndex].list
    },
    targetMc() { 
      var _mc = this.areaList.map(el=>{
        return el.mc
      }).join(' ');
      return _mc;
    }
  },
  watch:{
    targetMc() { 
      this.val = this.targetMc;
      this.$emit('input',this.val);
    }
  },
  created() { 
    getEaraList().then(data=>{ 
      this.areaList[this.curIndex].list = data.result.rows;
    })
  },
  methods: { 
    changeTab(index) { 
      var _index = index;
      if(_index == this.areaList.length-1){
        return
      }
      this.curIndex = _index;
      if(this.areaList[this.curIndex].scroll) { 
        this.$refs.scroll.scroll.scrollTo(0,this.areaList[this.curIndex].scroll,-1)
      }      
      while(_index != this.areaList.length-1) { 
        _index++;
        this.areaList[_index].mc = '';
        this.areaList[_index].list = '';
        this.areaList[_index].sxh = '';
        this.areaList[_index].scroll = '';
      }
    },
    openArea() { 
      this.openPop = true;
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 0);
    },
    next(sxh,mc) { 
      var _index = this.curIndex;
      this.areaList[_index].mc = mc;
      this.areaList[_index].sxh = sxh;
      this.areaList[_index].scroll = this.$refs.scroll.scroll.y;
      if(_index == this.areaList.length-1){
        this.openPop = false;
        return
      } 
      _index++;
      this.$emit('input',this.val);
      getEaraList(sxh).then(data=>{ 
        this.areaList[_index].list = data.result.rows;
        this.curIndex = _index;
        this.$refs.scroll.scroll.scrollTo(0,0,-1);
      })
    }
  }
}
</script>

<style lang='less'>
  @titleHeight: 80px;
  @wrapperHeight:600px;
  @scrollHeight:@wrapperHeight - @titleHeight;
  .area { 
    .areaWrapper { 
      width: 100%;
      height: @wrapperHeight;
      background-color: #fff;
    }
    .mint-popup-bottom { 
      width: 100%;
    }
    .areaTitle { 
      height: @titleHeight;
      line-height: 80px;
      text-align: center;
      color:#333;
      text-align: center;
      font-size: 32px;
      padding: 0 30px;
      display:flex;
      justify-content: space-between;
      .bd(#ddd,'bottom');
    }
    .showArea { 
      display:flex;
      li { 
        &.active { 
          color:#388CFF;
        }
      }
    }
    .scrollArea { 
      height:@scrollHeight;
    }
    .areaLi { 
      height: @titleHeight;
      line-height: @titleHeight;
      text-align: center;
      .bd(#ddd,'bottom');
      &.active { 
        color:#388CFF;
      }
    }
    .areaList { 
      display:flex;
      flex:1;
      .scrollArea { 
        width:100%;
      }
    }
    
  } 
</style>