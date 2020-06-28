<template>
  <div class="delist">
    <div class="tabInput">
      <img  
        class="searchImg" 
        src="@/static/images/search.png"
      >
      <input 
        v-model="getSearch"
        class="sinput"
        type="text" 
        :placeholder="searchTip"
      >
      <button 
        v-show="getSearch"
        class="cancel"
        @click="cancel"
      >
        取消
      </button>
    </div>
    <div class="scrollArea">
      <scroll
        ref="scroll"
        :data="delist"
        :click="isAndroid"
        :tap="true"
        v-on="$listeners"
      >
        <ul
          slot="sroll"
        >
          <slot></slot>  
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/views/base/zscoll.vue'
  export default {
    components: { 
      Scroll
    },
    props:{ 
      delist: { 
        type:Array,
        default() { 
          return []
        }        
      },
      sendArr: { 
        type:Array,
        default() { 
          return []
        }        
      },
      listType: { 
        type:Boolean,
        default: false            
      },
      searchTip: { 
        type:String,
        default: '搜索'         
      },
      maxLen:{ 
        type:Number,
        default:0
      }
    },
    data(){
      return { 
        checkArr:[],
        getSearch:''
      }
    },
    computed: { 
      isAndroid() { 
        var u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      }
    },
    watch: { 
      getSearch() { 
        this.sendChange();
      },
      delist() { 
        this.$refs.scroll.finishPullUp();
        if(this.delist.length == this.maxLen) { 
          this.$refs.scroll.closePullUp();
        }
      }
    },
    created() { 
      this.init();
    },
    methods: { 
      refresh() { 
        this.$refs.scroll.resetFn();
      },
      closePullUp() { 
        this.$refs.scroll.closePullUp();
      },
      scrollStart() { 
        this.$refs.scroll.scrollTo(0,0,-1);
      },
      init() { 
        this.checkArr = this.sendArr;
        window.history.pushState(null, null, location.href)
        window.addEventListener('popstate',() => {
          this.$emit('close')
          this.$emit('get',this.checkArr);
        },{once: true}) 
      },
      sendChange(time=400) { 
        if(this.timer) { 
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
          this.$emit('input',this.getSearch)
        },time)
      },
      cancel() { 
        this.getSearch = '';
      }
    }
  }
</script>

<style lang='less'>
.delist { 
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #fff;
  .tabInput { 
    height: 100px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    .bd(#ddd,'bottom');
  }
  .searchImg { 
    min-width: 36px;
    max-width: 36px;
    height: 36px;
  }
  .sinput { 
    font-size: 28px;
    color:#999;
    margin-left: 16px;
    width: 100%;
    opacity: 1;
  }
  .cancel { 
    padding: 10px 15px;
    color:#fff;
    background-color: #35A3DD;
    border-radius: 5px;
    display: flex;
    float: left;
    white-space: nowrap;
  }
  .scrollArea { 
    height: calc(100% - 100px);
  }
  .deLi { 
    height: 100px;
    .bd(#ddd,'bottom');
    display: flex;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    & >* { 
      pointer-events: none;
    }
  }
  .rightIcon { 
    width: 37px;
    height: 37px;
    position: relative;
    pointer-events: none;
    input { 
      width: 100%;
      height: 100%;
    }
    .pic { 
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
      z-index: 1;
      border: 1Px solid #ddd;
      pointer-events: none;
    }
    input:checked + .pic { 
      background: url('~@/static/images/checked.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      border: 0px;
    }
  }
}  
</style>