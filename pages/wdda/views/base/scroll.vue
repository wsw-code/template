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
        v-show="tipShow"
        class="finishLoaded"  
      >
        <div 
          ref="finishloaded"
          v-text="nodataTxt" 
        ></div>
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
      }                     
    },    
    data() { 
        return { 
            pullOff:true,
            tipShow: false,
            nodata:false,
            reset: true,
            txt:'加载完成'
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
          scrollX: this.scrollX
        })

        this.scroll.on('pullingUp', () => {

             this.pullOff && this.$emit('pullingUp');
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
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
      computeWidth(val){ 
        this.$refs.scrollCon.style.width = val + "px";
      },
      closePullUp() { 
        this.pullOff = false;
        setTimeout(()=>{ 
          if(this.data.length == 0) { 
              this.nodata = true;
          }
        },20)
      },
      recountHeight() {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{ 
          this.scrollHeight = this.$refs.wrapper.clientHeight; // 滚动区域高度
          this.scrollLength = this.$refs.scrollCon.clientHeight;
          if(!this.pullOff && this.scrollLength > this.scrollHeight) { 
            this.tipShow = true;
          }  
        },20)
      
      },
      resetFn() { 
        this.reset = true;
        this.tipShow = false;
        this.nodata = false;
        this.pullOff = true;
      },
      getTypeClass() { 
        if(this.nodataType == 1) { 
          return 'centerwz'
        }
      },
      watchFn(len=this.data.length) { 
        return new Promise((resolve, reject) => {
          if(len == 0 && !this.reset) { 
            this.nodata = true;
            this.reset = false;
          }
          this.stimer && clearTimeout(this.stimer);
          this.stimer = setTimeout(()=>{ 
            this.refresh();
            this.scrollHeight = this.$refs.wrapper.clientHeight; // 滚动区域高度
            this.scrollLength = this.$refs.scrollCon.clientHeight;
            if(!this.pullOff && this.scrollLength > this.scrollHeight) { 
              this.tipShow = true;
            }
            resolve();
          },20)
        })
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
    }
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
    // min-height: 100%;
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
}


</style>