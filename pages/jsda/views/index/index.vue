<template>
  <div id="index">
    <div class="bannerImg">
      <div class="personInfo">
        <img 
          :src="comAvator"
          class="bAvator"
        >
        <div 
          v-if="userInfo"
          class="infoDetail"
        >
          <p 
            class="name"
            v-text="userInfo.xm"
          ></p>
          <p 
            class="school"
            v-text="userInfo.xx"
          ></p>
        </div>
      </div>
    </div>
    <div 
      v-for="(item,key) in bdmkList"
      :key="key"
      class="personCell"
    >
      <Bd 
        v-if="item.jbxx.lx == '0'"
        :item-data="item"
        :user-info="userInfo"
        :host="host"
        :userid="userid"
      ></Bd>
      <Bg 
        v-if="item.jbxx.lx == '1'"
        :item-data="item"
        :user-info="userInfo"
        :host="host"
        :xxh="xxh"
        :userid="userid"
      ></Bg>
    </div>
    <div
      v-if="zoomImgArr.length>0"
      class="jsda_swiper_container" 
    >
      <div 
        class="del" 
        @click="closeZoomClick"
      >
        X
      </div>
      <swiper 
        ref="mySwiper"
        :options="swiperOption" 
      >
        <swiper-slide 
          v-for="(item,key) in zoomImgArr"
          :key="key"
        >
          <div class="swiper-zoom-container">
            <img :src="showImg(item)">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {getInfo} from '@/request/jsda.js'
  import Bd from './components/bd.vue'
  import Bg from './components/bg.vue'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components:{ 
      Bd,
      Bg,
      swiper,
      swiperSlide
    },
    data(){
      return {
        zoomImgArr:[],
        bdmkList:[],
        host:'',
        userid:'',
        userInfo:'',
        xxh:'',
        swiperOption:{ 
          zoom:true,
          observer:true,
          observeParents:true       
        }
      }
    },
    computed:{ 
      comAvator() { 
        return `${this.host}/showImg.do?type=tx&userid=${this.userid}&timestamp=${new Date().getTime()}`
      },
    },
    created() { 
      this.init();
    },
    mounted() {  
      window.vueEvents.$on('zoom',(obj)=>{ 
        console.log(obj.img)
        this.zoomImgArr = obj.img.split(',');
        setTimeout(()=>{ 
          console.log(obj.index)
           this.$refs.mySwiper.swiper.update()
           this.$refs.mySwiper.swiper.slideTo(obj.index,0,false)
        },20)
        history.pushState(null, null, location.href)
        window.addEventListener(
          'popstate',
          () => {
            this.closeZoom();
          },
          {
            once: true
          }
        )         
      })
    },
    methods:{ 
      closeZoom() { 
        this.zoomImgArr = [];       
      },
      closeZoomClick() { 
          window.history.go(-1);
            this.closeZoom();
      },
      showImg(imgId) { 
        return `${this.host}/showImg.do?type=img&imgid=${imgId}&xxh=${this.xxh}&userid=${this.userid}&timestamp=`
      },
      GetQueryString(name){
          var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          var r = window.location.search.substr(1).match(reg);
          if(r!=null)return  unescape(r[2]); return null;
      },
      init() { 
        this.host = this.GetQueryString('host') || '';
        this.userid = this.GetQueryString('userid') || '';
        getInfo(this.host,this.userid)
        .then(data=>{ 
          this.bdmkList = data.bdmkList;
          this.userInfo = data.userInfo;
          this.xxh = this.userInfo.xxh
        })
      }
    }
  }
</script>

<style lang='less'>
  .personInfo { 
    width: calc(100% - 60px);
    height: 208px;
    border-radius:10px;
    background-color: #fff;
    position: absolute;
    top: 138px;
    border: 1Px solid #ddd;
    left: 50%;
    transform: translateX(-50%);
    
  }
  .name { 
    color:#333;
    font-size: 36px;
  }
  .school { 
    color:#999;
    margin-top: 20px;
    font-size: 28px;
  }

  .infoDetail { 
    margin-top: 80px;
    p { 
      text-align: center;
    }
  }


  .bannerImg {
    width: 100%; 
    height: 242px;
    background: url('~@/static/images/banner.png') center center no-repeat;
    background-size: cover;
    padding: 0 30px;
    position: relative;
    margin-bottom: 105px;
  }
  .header { 
    height: 90px;
    font-size: 32px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    .bd(#ddd,'bottom');
  }
  .headerIcon { 
    width: 40px;
  }
  .headerText { 
    font-size: 32px;
    color:#333;
    margin-left: 20px;
  }
  .contant { 
    padding: 15px 30px;
  }
  .avator { 
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bAvator { 
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top:-50%;
  }
  .personCell { 
    & + .personCell { 
      border-top: 20px solid #F6F6F6;
    }
  }


  .infoList { 
    .infoCell { 
      display: flex;
      min-height: 60px;
      line-height: 60px;
    }
    .valImg { 
      width: 250px;
      height: 140px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      margin-bottom: 20px;
      margin-right: 20px;
    }
    .imagesCell { 
      flex-direction: column;
    }
    .key { 
      color:#333;
      white-space: nowrap;
      margin-right: 10px;
    }
    .value { 
      color:#999;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .deinfoList { 
    padding-left: 30px;
    position: relative;
    &::after { 
      content: '';
      width: 6px;
      height: calc(100% - 20px);
      border-radius: 3px;
      position: absolute;
      z-index: 1;
      background-color: #F6F6F6;
      left:0px;
      top:40px;
    }
    &::before { 
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      background-color: #388CFF;
      left:-8px;
      top:20px;
    }
  }
  .jsda_swiper_container { 
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
          font-size: 60px;
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
  .infoWrapper:nth-last-child(1) { 
    .deinfoList { 
      &::after { 
        height: calc(100% - 40px);
      }
  }

  }  
</style>