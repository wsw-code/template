<template>
  <div id="fc">
    <scroll
      ref="scroll"
      v-model="scrollY"
      :pull-down-refresh="true"
      :data="fcList"
      @pullingUp="loadmore"
    >
      <ul slot="sroll">
        <li 
          v-for="(item,index) in fcList"
          :key="index"
          class="fcCell"
          @click="todetail(item)"
        >
          <div class="leftPart">
            <div 
              class="fcTitle"
              v-text="item.title"
            ></div>
            <div 
              class="time"
              v-text="item.cjsj"
            ></div>
          </div> 
          <div 
            class="rightPart"
            :style="`background-image:url(${showImg(item.cover)})`"
          ></div>
        </li>
      </ul>
    </scroll>
    <div
      v-drag
      class="addBtn"
      @click="routo()" 
    >
      <div 
        class="addIcon"
      ></div>
    </div> 
    <router-view 
      :ggdata="ggdata"
      @update="update"
    ></router-view>
  </div>
</template>

<script>
  import {queryBjfcList} from '@/request/bpgl.js'
  import Scroll from '@/views/base/yscroll.vue'
  export default {
    name:'Fc',
    components:{ 
      Scroll
    },
    data(){
      return { 
        rows:20,
        page:1,
        total:0,
        fcList:[],
        ggdata:{},
        scrollY:0,
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log(to.name);
      if(to.name == 'index') { 
        this.$bus.$emit('keep',false)
      }
      next()
    },
    created() { 
      this.$bus.$emit('keep',true)
      this.init();
    },
    activated() { 
      setTimeout(()=>{
        this.$refs.scroll.scrollTo(0,this.scrollY,-1);
        this.scrollY = 0;
      },0)
    },
    methods:{ 
      todetail(item) { 
        this.$router.push({name:'fcxq',query:{id:item.id}});
      },
      loadmore() { 
        this.page++;
        this.init();
      },
      routo() { 
        this.$router.push({name:'fcpublish',query:this.$route.query})
      },
      update() { 
        this.page = 1;
        this.$refs.scroll.resetFn();
        this.init(this.clearData);
      },
      clearData() { 
        this.fcList = [];  
      },
      init(fn) { 
        queryBjfcList({"page": this.page,"rows": this.rows,"macdz":this.$route.query.macdz})
        .then(data=>{ 
          fn && fn();
          this.total = data.total;
          this.fcList = [...this.fcList,...data.rows];
          this.$refs.scroll.finishPullUp();
          if(this.fcList.length == this.total) { 
            this.$refs.scroll.closePullUp();
          }
        })
      },
      getCjsj(item) { 
        if(item) { 
          return item.split(' ')[0]
        }
      }
    }
  }
</script>

<style lang='less'>
  #fc {
    width: 100%;
    height: 100%;
    .content { 
      width:100%;
      max-height: 90px;
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient:vertical;
      /* autoprefixer: on */
      -webkit-line-clamp:2;
      font-size: 28px;
      line-height: 42px;
      color:#666;    
    }
    .rightPart { 
      min-width: 250px;
      max-width: 250px;
      height: 140px;
      background-size: cover;
    }
    .fcCell { 
      height: 200px;
      padding: 30px;
      display: flex;
      justify-content: space-between;
      .bd(#ddd,'bottom')
    }
    .leftPart { 
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .fcTitle { 
      color:#333;
      padding-right: 35px;
      font-size: 28px;
      line-height: 40px;
      max-height: 90px;
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient:vertical;
      /* autoprefixer: on */
      -webkit-line-clamp:2;
      font-size: 28px;
    }
  }

.addBtn { 
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: fixed;
  right:15Px;
  bottom:15Px;
  z-index: 99;
  background-color: #388CFF;
  &.active { 
    transform: rotateZ(45deg);
  }
  &:before { 
    width: 50%;
    height: 4px;
    background-color: #fff;
    content: '';
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto;
    border-radius: 2px;
  }
  &:after { 
    width: 50%;
    height: 4px;
    background-color: #fff;
    content: '';
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto;
    border-radius: 2px;
    transform: rotateZ(90deg)
  }
  .addIcon { 
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 10;
  }
}
</style>