<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div 
      v-show="show"
      class="loading" 
    >
      <mt-spinner 
        :type="0" 
        color="#388CFF"
      ></mt-spinner>     
    </div> 
    <div 
      v-if="zoomImgArr.length"
      class="wdda_swiper_container" 
    >
      <div 
        class="del" 
        @click="closeZoomClick"
      ></div>
      <swiper 
        ref="mySwiper"
        :options="swiperOption" 
      >
        <swiper-slide 
          v-for="(item,index) in zoomImgArr"
          :key="index"
        >
          <div class="swiper-zoom-container">
            <img :src="showImages(item)">
          </div>
        </swiper-slide>
      </swiper> 
    </div>  
  </div>
</template>
<script>
import {Spinner} from 'mint-ui'
import util from 'util'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'App',
  components: { 
      'mt-spinner': Spinner,
      swiper,
      swiperSlide  
  },  
  data(){ 
      return { 
        show:false,
        zoomImgArr:[],
        swiperOption: { 
          zoom:true,
          observer:true,
          observeParents:true,              
        }
      }
  },
  created() { 
    console.log(this.$router.history.current.path)
  },
  mounted() { 
    window.vueEvents.$on('open',()=>{ 
      this.show = true
    })
    window.vueEvents.$on('close',()=>{ 
      this.show = false
    })      
     window.vueEvents.$on('timeout',()=>{ 
      this.vmsg.alert('请求超时').then(()=>{
      })
    })
    window.vueEvents.$on('error',(msg)=>{ 
      this.vmsg.alert(msg).then(()=>{
          this.util.returnApp();
      })
    })
    this.$bus.$on('zoom',(obj)=>{ 
      this.zoomImgArr = (typeof obj.img == 'string')? obj.img.split(','):obj.img;
      setTimeout(()=>{ 
        this.$refs.mySwiper.swiper.update()
        this.$refs.mySwiper.swiper.slideTo(obj.index,0,false)
      },20)
      window.history.pushState(null, null, location.href)
      window.AndoridBack = ()=>{window.history.go(-1)};
      window.addEventListener(
        'popstate',
        () => {
            this.closeZoom();
            if(this.$router.history.current.path == '/') { 
              window.AndoridBack = util.returnApp
            }
        },
        {
            once: true
        }
      )         
    }) 
  },  
  methods: { 
    closeZoomClick() { 
      window.history.go(-1);
      this.closeZoom();
    },
    closeZoom() { 
      this.zoomImgArr = [];       
    },
  },

}
</script>

<style lang='less'>
    #app {
        width: 100%;
        height: 100%;
        .loading { 
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left:0;
            justify-content: center;
            align-items: center;
            display: flex;
            z-index: 99;
            background-color: rgba(225,225,225,0);
        }
        .wdda_swiper_container { 
            position: fixed;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #000;
            z-index: 99;
            left: 0;
            top: 0;
            .del { 
                width:60px;
                height:60px;
                background:url('~@/static/images/del.png') 0 0 no-repeat;
                background-size: cover;
                color:#fff;
                position: absolute;
                right: 30px;
                top: 30px;
                z-index: 2;
            }            
        }
        .swiper-container { 
            width: 100%;
            height: 100%;
        }
        .swiper-slide { 
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
