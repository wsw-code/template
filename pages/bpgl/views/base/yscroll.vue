<template>
  <div 
    id="scrollComponents" 
    ref="wrapper"
    class="wrapper" 
  >
    <div 
      ref="scrollCon"
      class="scrollContainer" 
    >
      <div 
        v-show="pullShow"
        class="pullRefreshWrapper loadingWrapper" 
        :style="{top:pullTop+'px'}" 
      >
        <spinner 
          :size="20" 
          type="fading-circle"
        ></spinner>
        <span 
          class="loandingTxt" 
          v-text="timeToRefresh?'松开刷新':'下拉刷新'"
        ></span>
      </div>
      <slot name="sroll"></slot>
      <div 
        v-show="pullUpLoad && showLoadmore && !tipShow && !isNoData"
        class="loadingWrapper" 
        :style="`height:${loadingHeight}px`"
      >
        <spinner 
          :size="20" 
          type="fading-circle"
        ></spinner>
        <span class="loandingTxt">加载中</span>  
      </div> 
      <div 
        v-show="tipShow"
        class="finishLoaded"  
      >
        <div 
          ref="finishloaded"
          v-text="nodataTxt" 
        ></div>
      </div> 
      <div 
        v-show="isNoData"
        class="scrollNodata"
      >
        <img src="@/static/images/nodata.png">
        <p v-text="notDataTxt"></p>
      </div>         
    </div>         
  </div>
</template>

<script type="text/ecmascript-6">
  import {Spinner} from 'mint-ui';
  export default {
    components:{
       Spinner  
    },
    props: {
      nodataTxt: { 
          type:String,
          default:"加载完成"
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      tap: { 
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: [Array,Object,String],
        default: null
      },
      pullUpLoad: { 
          type: Boolean,
          default: true
      },
      pullDownRefresh: { 
          type: Boolean,
          default: false
      },
      pageDel: { 
          type: Object,
          default(){ 
            return {page:1,pageSize:4}
          }
      },
      ableShowMore: { 
          type: Boolean,
          default: false
      },
      loading: { 
          type: Boolean,
          default: false
      },
      cWidth: { 
        type:String,
        default: "100%"
      },
      scrollX: { 
        type:Boolean,
        default: true
      },
      nodataType: { 
        type:Number,
        default: 0
      },
      notDataTxt:{
        type:String,
        default: '暂无数据'
      }                     
    },  
      
    data() { 
      return { 
        pullOff:true,
        tipShow: false,
        nodata:false,
        txt:'加载完成',
        isNoData: false,
        scrollHeight:0,
        scrollLength:0,
        showLoadmore: true,
        loadingHeight:50,
        pullTop:-50,
        pullShow:false,
        timeToRefresh:false,
        visibleHeight:0,
        curHeight:0,
        canScroll:true
      }
    },
    computed:{ 
      vheight() { 
        return this.$refs.wrapper?this.$refs.wrapper.clientHeight:0
      }
    },
    watch: {
      data() {
        this.watchFn();
      },
      tipShow() { 
        setTimeout(()=>{ 
          this.refresh();
        },20)
      }
    },
    created() { 
    },
    mounted() {      
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    activated() { 
      this._initScroll();
    },
    deactivated() { 
      this.$refs.wrapper.onscroll = null
    },
    beforeDestroy() { 
      this.$refs.wrapper && (this.$refs.wrapper.onscroll = null)
    },
    methods: {
      _initScroll() {
        this.visibleHeight = this.getVisibleHeight();
        this.$refs.wrapper.onscroll = ()=>{ 
          this.scollTimer && clearTimeout(this.scollTimer)
          this.scollTimer = setTimeout(()=>{
            this.loadmore()
          },0)
        }


      },
      loadmore() {
        var _curHeight = this.getCurHeight();
        var _scrollTop = this.getScrollTop();
        this.$emit('input',_scrollTop)
        // console.log(_curHeight , this.vheight,_scrollTop)
        if(_curHeight - (this.vheight + _scrollTop)<this.loadingHeight) { 
          if(this.pullOff && this.canScroll && this.pullUpLoad) { 
            this.$emit("pullingUp");
            this.canScroll = false;
          }
        }
      },
      getCurHeight() { 
        return this.$refs.scrollCon.clientHeight;
      },
      getScrollTop(element = this.$refs.wrapper) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        }
        return element.scrollTop;
      },
      getVisibleHeight(element = this.$refs.wrapper) {
        if (element === window) {
          return document.documentElement.clientHeight;
        }
        return element.clientHeight;
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo(x,y,time) {
        this.$refs.wrapper.scrollTo(x,y,time);
        this.$refs.wrapper.scroll(x, y)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      finishPullUp() { 
        setTimeout(()=>{ 
          this.canScroll = true;
        },0)
      },
      finishPullDown() { 
          this.scroll && this.scroll.finishPullDown();
      },
      notDataFn() { 
        this.isNoData = true;
      },
      computeWidth(val){ 
        this.$refs.scrollCon.style.width = val + "px";
      },
      closePullUp() { 
        this.pullOff = false;
        this.showLoadmore = false;       
        setTimeout(()=>{ 
          if(this.data.length == 0) { 
            this.isNoData = true;
          } else {
            this.curHeight = this.getCurHeight();
            
            if(this.curHeight - this.vheight >= 50) {this.tipShow = true} else { 
                this.tipShow = false
            }
          }
        },20)
      },
      resetFn() { 
        this.tipShow = false;
        this.nodata = false;
        this.pullOff = true;
        this.showLoadmore = true;
        this.isNoData = false;
      },
      getTypeClass() { 
        if(this.nodataType == 1) { 
          return 'centerwz'
        }
      },
      watchFn(len=this.data.length) { 
        
        len?this.isNoData = false:this.isNoData = true;
        return new Promise((resolve, reject) => {
          this.stimer && clearTimeout(this.stimer);
          this.stimer = setTimeout(()=>{ 
            
          this.curHeight = this.getCurHeight();
          console.log('===='+this.curHeight)
          resolve();
          },20)
        })
      }
    },
  }
</script>

<style  lang="less" scoped >
#scrollComponents { 
    height: 101%;
    position: relative;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
  #centerwz { 
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 0;
      margin: auto;
  }
  .pos { 
    position: fixed;
    background-color: #fff;
    width: 100px;
    height: 40px;
    top:0;
    right: 0;
  }

  .scrollContainer { 
    width: 100%;
    position: relative;
    min-height: calc(100% + 1px); //无数据的时候可以下拉刷新
    .scrollNodata { 
      position: absolute;
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
  }

  .noData { 
    text-align: center;
    line-height: 1.5rem;
  }
  .nodata { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    img { 
      width: 290px;
      height: auto;
    }
    p { 
      font-size: 32px;
      color:#666;
      margin-top: 50px;
    }
  }

  .finishLoaded { 
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      border-top: 1Px solid #efefef;
      background-color: #fff;
  }

  .loadingWrapper { 
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    // background-color: #efefef;
    // border-top: 1Px solid #efefef;
    .loandingTxt { 
      margin-left: 10Px;
    }
  }
}

.pullRefreshWrapper { 
  height: 50Px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: -50Px;
}

</style>