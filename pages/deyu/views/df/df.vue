<template>
  <div id="df">
    <div class="tabWrapper">
      <ul class="tabUl">
        <li 
          v-for="(item,index) in tabList"
          :key="index"
          class="tabIcon"
          :class="getBtnClass(index)"
          @click="tab(index)"
        >
          <div 
            class="icon" 
            :class="getClass(index,item.lx)"
          ></div>
          <span 
            class="txt"
            v-text="item.txt"
          ></span>
        </li>
      </ul>
    </div>
    <ul 
      v-if="tabList"
      class="fsUl"
    >
      <li
        v-for="(item,index) in tabList[tabIndex]['fs']"
        :key="index"
        class="fsLi"
        :class="fsIndex == index?'cur':''"
        @click="selfs(index)"
        v-text="getFs(index)"
      ></li>
    </ul>
    <div class="title">
      备注 :
    </div>
    <textarea 
      v-model="bz"
      class="textara"
      placeholder="请输入备注(选填)"
    ></textarea>
    <div class="title">
      上传图片 :
    </div>
    <images v-model="picArr"></images> 
    <button 
      v-if="showWebSubmit()"
      @click="submit"
    >
      提交
    </button>
  </div>
</template>

<script>
  import images from '@/views/components/images.vue'
  import {mapMutations} from 'vuex'
  export default {
    components:{ 
      images
    },
    data(){
      return {
        tabIndex:0,
        fsIndex:0,
        bz:'',
        getCurfs:0,
        picArr:[]
      }
    },
    computed: {
      curdata() { 
        return this.$store.state.dfObj;
      },
      list() { 
        return this.$store.state.detailList;
      },
      index_fz() { // fsIndex = fz 情况
        if(this.tabList.length == 1 || this.tabIndex == 0) { 
          return true
        } else { 
          return false
        }
      },
      tabList(){ 
        var _arr = this.curdata.fs.split(',');
        _arr = _arr.filter(el=>{  // 做 [-5,0] 类型数据兼容
          return el*1 !=0;
        })
        var _targetArr = _arr.map(el=>{ 
          let fs = Math.abs(el);
          return el*1>0? {txt:'奖',fs:fs,lx:0}:{txt:'罚',fs,lx:1}
        });
        _targetArr = _targetArr.sort((a,b)=>{ 
           return (a.lx - b.lx)
        })
        console.log(_targetArr)
        _targetArr[0].fs = _targetArr[0].fs+1;
        return _targetArr
      },
      lx() { 
        return this.tabList[this.tabIndex].lx;
      },
    },
    watch: { 
    },
    created() {
      this.setHeadBtn();
      this.init();
    },
    methods: { 
      ...mapMutations([ 
      'fzChange',
      'setDetailList'
      ]),
      init() {
        this.picArr = this.curdata.picList;
        if(this.curdata.fzStatus) { 
          this.initFz()
        }
      },
      setHeadBtn() { 
        this.setHeadButton('提交',this.submit);
      },
      fzToIndex() { //分数转index
        if(!this.curdata.fz) return;
        let _fz =  Math.abs(this.curdata.fz)
        if(this.index_fz) { 
          this.fsIndex = _fz;
        } else { 
          this.fsIndex = _fz - 1;
        }
      },
      indexToFz() { // index转分数
        let fz
        if(this.index_fz) { 
          fz = this.fsIndex
        } else { 
          fz = this.fsIndex + 1;
        }
         return this.lx? -fz:fz;
      },
      getBtnClass(index) { 
        return this.tabIndex == index?'active':'';
      },
      getFs(index) { 
        if(this.index_fz) { 
          return index;
        } else { 
          return index+1;
        }
      },
      showWebSubmit() { 
        return this.showBtn() && !this.$route.query.fzStatus;
      },
      initFz() { 
        if(this.tabList.length > 1) { //奖/罚tab栏显示
          this.curdata.fz>=0?(this.tabIndex = 0):(this.tabIndex = 1);
        } 
        this.bz = this.curdata.bz;
        this.fzToIndex();
      },
      getClass(index,lx) { 
        return lx?'icon2':'icon1';
      },
      tab(index) { 
        if(this.tabIndex != index) { 
          this.fsIndex = 0;
        }
        this.tabIndex = index;
      },
      selfs(index) { 
        this.fsIndex = index;
      },
      submit() { 
        // this.$bus.$emit('getfs',{fz:this.indexToFz(),bz:this.bz,tabIndex:this.tabIndex,picList:this.picArr})
        var obj = {fz:this.indexToFz(),bz:this.bz,tabIndex:this.tabIndex,picList:this.picArr}
        this.getfs(obj);
        window.history.go(-1)
      },
      getfs(obj) { 
        var _list = [...[],...this.list];
        var _curObj = _list[this.$route.query.curIndex];
        _curObj.fz = obj.fz;
        _curObj.bz = obj.bz;
        _curObj.isbj = 'isbj';
        _curObj.fzStatus = true;
        _curObj.tabIndex = obj.tabIndex;
        _curObj.picList = obj.picList;
        if(_curObj.fz*1 !=0) { 
          this.isMr = false;
        }
        // this.$set(this.list,this.curIndex,_curObj);
        // this.list[this.curIndex] = _curObj;
        this.setDetailList(_list);
      },
    }

  }
</script>

<style lang='less'>
  #df { 
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 30px;
    top:0;
    left:0;
    background-color: #fff;
    z-index: 1;
    .textara { 
      width: 100%;
      height: 300px;
      border: 2px solid #ddd;
      border-radius: 5px;
      margin-top: 20px;
      padding: 10px;
      line-height: 36px;
      font-size: 28px;
      color:#666;
    }
    .title { 
      margin-top: 20px;
      color:#666666;
      font-size: 28px;
      margin-bottom: 10px;
    }
    .tabWrapper { 
      display: flex;
      height: 60px;
      border-radius:5px;
      justify-content: center;
      margin: 60px auto;
    }
    .tabUl { 
      display: flex;
      border: 2px solid #35A3DD;
      border-radius: 5px;
    }
    .tabIcon { 
      height: 100%;
      display: flex;
      width: 135px;
      justify-content: center;
      align-items: center;
    }
    .icon { 
      width: 29px;
      height: 23px;
      background-size: contain;
      margin-right: 20px;
    }
    .txt { 
      color:#35A3DD;
    }
    .active { 
      background-color: #35A3DD;
      .txt { 
        color:#fff;
      }
    }
    .fsUl { 
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .fsLi { 
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 2px solid #ddd;
      color:#666;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      margin-bottom: 20px;
      &.cur { 
        border-color: #35A3DD;
        color:#35A3DD;
      }
    }
  }
  .icon1{ 
    background-image: url('~@/static/images/ico_good_nor.png');
  }
  .icon2{ 
    background-image: url('~@/static/images/ico_worse_nor.png');
  }

  .active .icon1 { 
    background-image: url('~@/static/images/ico_good_pre.png');
  }
  .active .icon2 { 
    background-image: url('~@/static/images/ico_worse_pre.png');
  }
</style>