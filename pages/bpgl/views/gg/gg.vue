<template>
  <div id="gg">
    <scroll
      ref="scroll"
      :pull-down-refresh="true"
      :data="ggList"
      @pullingUp="loadmore"
    >
      <ul slot="sroll">
        <li 
          v-for="(item,index) in ggList"
          :key="index"
          class="ggCell"
          @click="routo(item)"
        >
          <div class="top">
            <div 
              class="htitle"
              v-text="item.title"
            ></div>
            <div 
              class="createtime"
              v-text="getCjsj(item.cjsj)"
            ></div>
          </div>
          <div
            class="content"
            v-text="item.content"
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
  import {queryTzggList} from '@/request/bpgl.js'
  import Scroll from '@/views/base/yscroll.vue'
  export default {
    components:{ 
      Scroll
    },
    data(){
      return { 
        rows:20,
        page:1,
        total:0,
        ggList:[],
        ggdata:{}
      }
    },
    created() { 
      this.init();
    },
    methods:{ 
      loadmore() { 
        this.page++;
        this.init();
      },
      routo(item) { 
        if(item) { 
          this.ggdata = item
        } else { 
          this.ggdata = {};
        }
        
        this.$router.push({name:'publish',query:this.$route.query})
      },
      update() { 
        this.page = 1;
        this.$refs.scroll.resetFn();
        this.init(this.clearData);
      },
      clearData() { 
        this.ggList = [];  
      },
      init(fn) { 
        queryTzggList({"type": 2,"page": this.page,"rows": this.rows})
        .then(data=>{ 
          fn && fn();
          this.total = data.total;
          this.ggList = [...this.ggList,...data.rows];
          this.$refs.scroll.finishPullUp();
          if(this.ggList.length == this.total) { 
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
  #gg {
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
    .ggCell { 
      padding: 30px;
      border-bottom: 20px solid #f6f6f6;
    }
    .top { 
      display: flex;
      justify-content: space-between;
      margin-bottom: 22px;
    }
    .htitle { 
      color:#333;
      font-size: 32px;
    }
  }

.addBtn { 
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: fixed;
  right:15Px;
  bottom:15Px;
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