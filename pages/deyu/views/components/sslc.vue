<template>
  <div class="sslcWrapper">
    <popup 
      v-model="popupVisible" 
      position="bottom" 
      class="mint-popup"
    >
      <div class="ssWrapperSelect">
        <ul class="head">
          <li 
            class="cancel"
            @click="popupVisible=false"
          >
            取消
          </li>
          <li class="title">
            选择宿舍
          </li>
          <li 
            class="confirm"
            @click="confirm"
          >
            确认
          </li>
        </ul>
        <div class="selWrapper">
          <ul class="selUl">
            <li 
              v-for="(item,index) in list"
              :key="index"
              class="selCell" 
              @click="selSs(item,index)"
            >
              <span v-text="item.mc"></span>
              <img 
                v-show="curIndex == index"
                class="rightIcon" 
                src="~@/static/images/right.png"
              >
            </li>
          </ul>
          <ul class="selUl">
            <li 
              v-for="(item,index) in lc"
              :key="index"
              class="selCell"
              @click="selLc(item,index)"
            >
              <span v-text="item.mc"></span>
              <img 
                v-show="lcIndex == index"
                class="rightIcon" 
                src="~@/static/images/right.png"
              >            
            </li>
          </ul>
        </div>
      </div>
    </popup>    
  </div>
</template>

<script>
  import { Popup } from 'mint-ui';
  export default {
    components: { 
      Popup,
    },
    props:{ 
      ssList:{ 
        type:Array,
        default(){ 
          return []
        }
      }
    },
    data(){
      return { 
        popupVisible:false,
        curIndex:0,
        lcIndex:0,
        list:[]
      }
    },
    computed:{ 
      lc() { 
        if(this.list.length) { 
          return this.list[this.curIndex].lc;
        } else { 
          return []
        }
      }
    },
    watch:{ 
      ssList() { 
        console.log(this.ssList)
        this.init();
      }
    },
    created() { 
      // this.init();
    },
    methods:{ 
      init() { 
        console.log(this.ssList)
        this.list = [...this.ssList];
        this.list.unshift({id:'',mc:'全部',lc:[]});
        // debugger
        console.log(this.list)
        // debugger
        this.list.forEach(el=>{ 
          console.log('===')
          console.log(el)
          el.lc.unshift({lcid:'',mc:'全部'})
        })
      },
      open() { 
        this.popupVisible = true;
      },
      selSs(item,index) { 
        if(this.curIndex == index) return 
        this.curIndex = index;
        this.lcIndex = 0;
      },
      selLc(item,index) { 
        if(this.lcIndex == index) return 
        this.lcIndex = index;
      },
      confirm() { 
        var id = this.list[this.curIndex].id;
        var lcid = this.lc[this.lcIndex].id || '';
        var ssmc = this.list[this.curIndex].mc
        var lcmc =  this.lc[this.lcIndex].mc
        var mc = ssmc + (lcmc=='全部'?'':lcmc)
        var obj = {id,lcid,mc};
        console.log(obj)
        this.$emit('changeId',obj);
        this.popupVisible = false;
      }
    }
  }
</script>

<style lang='less'>
  .sslcWrapper { 
    .head { 
      height: 90px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      font-size: 28px;
      .bd(#ddd,'bottom');
    }
    .cancel { 
      color:#999;
    }
    .title { 
      color:#333;
    }
    .confirm { 
      color:#388CFF
    }
    .selWrapper { 
      display: flex;
    }
    .selCell { 
      min-height: 90px;
      padding: 0 30px;
      font-size: 28px;
      color:#333;
      display: flex;
      justify-content: space-between;
      .bd(#ddd,'bottom');
      .abd(#ddd,'right');
      
      align-items: center;
    }
    .selUl { 
      width: 50%;
      height: 360px;
      overflow-y: auto;
      -webkit-overflow-scrolling:touch;
    }
    .rightIcon { 
      max-width:28px;
      max-height: 18px;
    }
  }
</style>