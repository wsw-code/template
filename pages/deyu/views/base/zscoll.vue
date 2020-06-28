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
      <slot name="sroll"></slot>   
      <div 
        v-show="isNoData"
        class="scrollNodata"
      >
        <img src="@/static/images/nodata.jpg">
        <p v-text="notDataTxt"></p>
      </div>     
    </div>          
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
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
        type: Array || Object,
        default: null
      },
      pullUpLoadOn: { 
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
        timeToRefresh:false
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
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullUpLoad: this.pullUpLoadOn,
          pullDownRefresh: this.pullDownRefresh?{threshold:50,stop:40}:this.pullDownRefresh,
          scrollX: this.scrollX,
          tap:this.tap,
        })
        if(this.pullUpLoadOn) { 
          this.scroll.on('pullingUp', () => {
              this.pullOff && this.$emit('pullingUp');
          })
        }

        if(this.pullDownRefresh) { 
          this.scroll.on('pullingDown', () => {
              this.$emit('pullingDown');
          })
          let me = this
          this.scroll.on('scroll', (pos) => {
           this.pullShow = this.scroll.absStartY<0?false:true;
           this.timeToRefresh = pos.y < 50? false:true;
            if(pos.y>0) { 
                var $y = Math.min(0,pos.y);
            } else { 
              this.pullTop = -50;
            }
          })
        }
        
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        this.$emit('canScroll'); //
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
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      finishPullUp() { 
          this.scroll && this.scroll.finishPullUp();
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
              this.nodata = true;
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
          this.scrollHeight = this.$refs.wrapper.clientHeight; // 滚动区域高度
          this.scrollLength = this.$refs.scrollCon.clientHeight-this.loadingHeight-1;
          if(!this.pullOff && this.scrollLength > this.scrollHeight) { 
            this.tipShow = true;
            this.showLoadmore = false;
          }
          this.refresh();
          resolve();
          },20)
        })
      }
    },
  }
</script>

<style  lang="less" scoped >
#scrollComponents { 
    overflow: hidden;
    height: 100%;
    position: relative;
  #centerwz { 
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: 0;
      margin: auto;
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
  }

  .loadingWrapper { 
    display:flex;
    align-items: center;
    justify-content: center;
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