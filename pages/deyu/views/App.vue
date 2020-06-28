<template>
  <div id="app">
    <keep-alive :include="keepPage">
      <router-view></router-view>
    </keep-alive> 
    <div 
      v-show="show"
      class="loading" 
    >
      <mt-spinner 
        v-show="loadingShow"
        :type="0" 
        color="#388CFF"
      ></mt-spinner>
    </div>
    <div 
      v-if="zoomImgArr.length"
      class="deyu_swiper_container" 
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
        loadingShow:false,
        zoomImgArr:[],
        swiperOption: { 
          zoom:true,
          observer:true,
          observeParents:true,              
        }
      }
  },
  computed:{ 
    role() { 
      return this.$store.state.GLOBAL_ROLE;
    },
    keepPage() { 
      return this.$store.state.keepPage;
    }
  },
  created() { 
    console.log(this.$store)
    this.init();
  },
  mounted() { 
    window.vueEvents.$on('open',()=>{ 
        
        this.openTimer && clearTimeout(this.openTimer)
        this.closeTimer && clearTimeout(this.closeTimer)
        this.show = true
        this.openTimer = setTimeout(()=>{
          this.loadingShow = true
        },200)
    })
    window.vueEvents.$on('close',()=>{ 
      
      clearTimeout(this.openTimer)
      this.closeTimer && clearTimeout(this.closeTimer)
      this.closeTimer = setTimeout(()=>{
        this.show = false
        this.loadingShow = false
      },200)
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
        console.log(this.$refs)
        this.$refs.mySwiper.swiper.update()
        this.$refs.mySwiper.swiper.slideTo(obj.index,0,false)
      },20)
      window.history.pushState(null, null, location.href)
      var _fn = window.AndoridBack;
      window.AndoridBack = ()=>{window.history.go(-1)};
      window.addEventListener(
        'popstate',
        () => {
            this.closeZoom();
            window.AndoridBack = _fn;
        },
        {
            once: true
        }
      )         
    }) 
  },  
  methods: { 
    init() { 
      console.log(this.role)

      if(!this.role || this.role == 'XS') { 
        this.$router.push({name:'role_four'});
        return 
      }
      if(this.role == 'SUPER_BZR') {  
        this.$router.push({name:'role_two'})  
      } else if(this.role == 'SUPER_RKJS') { 
        this.$router.push({name:'role_three'})
      }else  {  //GLY_ZWZR 和 GLY_JDZR都是 教导主任
        this.$router.push({name:'role_one'})
      }
    },
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
    overflow:hidden;
    display:flex;
    flex-direction: column;
    .loading { 
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left:0;
      justify-content: center;
      align-items: center;
      display: flex;
      z-index: 3000;
      background-color: rgba(225,225,225,0);
    }
    .deyu_swiper_container { 
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
        background:url('~@/static/images/delete.png') 0 0 no-repeat;
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
