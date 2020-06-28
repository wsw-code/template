<template>
  <div id="index">
    <div class="search">
      <img 
        src="~@/static/images/ss.png"
        class="searchIcon"
      >
      <input 
        v-model="pzmc"
        type="text"
        placeholder="搜索"
      >
    </div>
    <div class="bpScroll">
      <scroll
        ref="scroll"
        v-model="scrollY"
        :pull-down-refresh="true"
        :data="bplist"
        @pullingUp="loadmore"
      >
        <ul
          slot="sroll"
          class="bpUl"
        >
          <li 
            v-for="(item,index) in bplist" 
            :key="index"
            class="bpCell"
          >
            <div class="title">
              <div 
                class="bjname"
                v-text="getname(item)"
              ></div>
              <div class="iconPart">
                <div 
                  class="icon"
                  @click="routerTo('xc',item)"
                ></div>
                <div 
                  class="icon"
                  @click="routerTo('gg',item)"
                ></div>
                <div 
                  class="icon"
                  @click="routerTo('fc',item)"
                ></div>
              </div>
            </div>
            <div 
              class="banner"
              :style="`background-image:url(${showImg(item.jtpath)})`"
            >
              <div 
                class="refreshbtn"
                @click="refresh(item,index)"
              ></div>
            </div>
            <ul class="bottomBtn">
              <li 
                class="cq"
                @click="changeStatus('6',item)"
              >
                重启
              </li>
              <li @click="changeStatus('9',item)">
                关机
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
  import {queryDzbpList,getDzbpJt,saveZl} from '@/request/bpgl.js'
  import Scroll from '@/views/base/yscroll.vue'
  import util from 'util'
  import { MessageBox,Toast } from 'mint-ui';
  export default {
    name:'Index',
    components:{ 
      Scroll
    },
    data(){
      return {
        pzmc:'',
        page:1,
        rows:4,
        total:0,
        scrollY:0,
        bplist:[]
      }
    },
    computed:{ 
      rid() { 
        return util.GetQueryString('role');
      }
    },
    watch:{ 
      pzmc() { 
        this.timer && clearTimeout(this.timer);
        setTimeout(()=>{ 
          this.page = 1;
          this.$refs.scroll.resetFn();
          this.init(this.clearData)
        },500)
      }
    },
    created() { 
      this.init();
    },
    mounted() {  

    },
    activated() { 
      setTimeout(()=>{
        this.$refs.scroll.scrollTo(0,this.scrollY,-1);
        this.scrollY = 0;
      },0)
    },
    methods:{ 
      toast(msg) { 
        this.$toast && this.$toast.close();
        this.$toast = Toast({
          message: msg,
          duration: 2000
        });
      },
      init(fn) { 
        queryDzbpList([{rid:this.rid,page:this.page,rows:this.rows,pzmc:this.pzmc}])
        .then(data=>{ 
          fn && fn();
          this.total = data.total;
          this.bplist =[...this.bplist,...data.rows];
          this.$refs.scroll.finishPullUp();
          if(this.bplist.length == this.total) { 
            this.$refs.scroll.closePullUp();
          }
        })
      },
      getname(item) { 
        var status = item.online == '0'?'(在线)':'(离线)';
        return `${item.pzmc}${status}`
      },
      loadmore() { 
        this.page++;
        this.init();
      },
      clearData() { 
        this.bplist = [];
      },
      refresh(item,index) { 
        getDzbpJt([item.macdz])
        .then(data=>{ 
          console.log(data);
          this.bplist[index].path = data.jt.path;
          var _cell = this.bplist[index];
          _cell.jtpath =  data.jt.path;
          this.$set(this.bplist,index,_cell);
          this.$toast('操作成功');
        })  
      },
      changeStatus(status,item) { 
        if(item.online == '1') {
          this.$toast('离线状态下不能进行此操作'); 
          return
        } 
        var text = status == '6'?'重启':'关机'
        MessageBox.confirm(`确定${text}`,'').then(() => {
          saveZl([{"zlbh":status},[item.macdz]])
          .then((data)=>{ 
            if(data.code == '0') { 
              this.$toast('操作成功')
            }
          })
        });
        
      },
      routerTo(name,item) { 
        this.$router.push({name,query:{macdz:item.macdz}})
      }
    }
  }
</script>

<style lang='less'>
#index { 
  height: 100%;
}
.search { 
  height: 100px;
  width: 100%;
  box-shadow: 0px 2px 10px rgba(56,140,255,0.3);
  display: flex;
  align-items: center;
  padding: 0 30px;
  input { 
    display: flex;
    flex:1;
    padding-left: 30px;
    color:#aaa;
    font-size: 28px;
  }
}
.searchIcon {
  min-width: 34px;
  max-width: 34px;
}
.bpScroll { 
  height: calc(100% - 100px);
  overflow-y: auto;
}
.bpCell { 
  width: 690px;
  height: 512px;
  margin: 0 auto;
  box-shadow: 0px 0px 10px rgba(56,140,255,0.3);
  margin-top: 30px;
  border-radius: 20px;
  & + .bpCell:nth-last-child(1) {
    margin-bottom: 20px;
  }
}
.title { 
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
  padding: 0 20px;
  .bd(#efefef,'bottom');
}
.iconPart { 
  display: flex;
  .icon { 
    width: 54px;
    height: 54px;
    background-size: 54px 54px;
    background-repeat: no-repeat;
    & + .icon { 
      margin-left: 26px;
    }
  }
  .icon:nth-child(1) { 
    background-image: url('~@/static/images/xc.png');
  }
  .icon:nth-child(2) { 
    background-image: url('~@/static/images/gg.png');
  }
    .icon:nth-child(3) { 
    background-image: url('~@/static/images/fc.png');
  }
}
.banner { 
  width: 650px;
  height: 300px;
  margin: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.bottomBtn { 
  display: flex;
  height: 90px;
  .bd(#efefef,'top');
  li { 
    display: flex;
    flex:1;
    font-size: 36px;
    align-items: center;
    justify-content: center;
    & + li { 
      .bd(#efefef,'left');
    }
  }
}

.cq {
  color:#388CFF;
}

.refreshbtn { 
  width: 54px;
  height: 54px;
  position: absolute;
  right: 10px;
  top:10px;
  background: url('~@/static/images/sx.png') 0 0 no-repeat;
  background-size: 54px 54px;
}

</style>