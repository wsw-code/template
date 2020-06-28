<template>
  <div class="pj"> 
    <div class="bzpj">
      <textarea 
        v-model="bz"
        placeholder="评价内容(选填)"
        class="textarea"
      ></textarea>
      <div class="picArrWrapper">
        <div class="uploadTxt">
          上传图片:
        </div>
        <images v-model="picArr"></images>  
      </div> 
      <div 
        class="towho"
        @click="open"
      >
        <span class="toIcon">@</span>
        <span class="toTxt">鼓励/惩罚谁</span>
        <span 
          v-for="(item,index) in sendName"
          :key="index"
          class="whospan"
          v-text="`@${item}`"
        ></span>
      </div>
      <ul class="mxUl">
        <li 
          :class="mxIndex == 0?'active':''"
          @click="mxsel(0)"
        >
          值得鼓励的
        </li>
        <li 
          :class="mxIndex == 1?'active':''"
          @click="mxsel(1)"
        >
          需要修正的
        </li>
      </ul> 
      <div class="pjWrapper">
        <ul class="pyUl">
          <li
            v-for="(item,index) in curpyList"
            :key="index"
            class="pyLi"
            :class="selIndex == index?'active':''"
            @click="sel(item,index)"
          >
            <img 
              v-show="mxIndex == 0"
              src="@/static/images/jiafen.png" 
            >
            <img 
              v-show="mxIndex == 1"
              src="@/static/images/jianfen.png" 
            >
            <div 
              class="dot"
              v-text="item.fs"
            ></div>
            <div 
              class="ryName"
              v-text="item.zbmc"
            ></div>
          </li>
        </ul>
      </div>
    </div>
    <delist
      v-if="show"
      ref="delist"
      v-model="searchTxt"
      :delist="xslist"
      :search-tip="'搜索姓名'"
      :not-data-txt="'该学生不存在'"
      :max-len="maxLen"
      @close="show=false"
      @pullingUp="pullingUp"
    >
      <li>
        <label 
          v-for="(item,index) in xslist"
          :key="index"
          class="deLi needsclick"
        >
          <div class="leftPart">
            <span
              class="lTxt"
              v-text="item.xm"
            ></span>
            <span v-text="`${item.njmc}${item.bjmc}`"></span>
          </div>
          <div class="rightIcon">
            <input 
              v-model="checkArr"
              type="checkbox" 
              :value="{'xsid':item.xsid,'mc':item.xm}"
            >
            <div class="pic"></div>
          </div>
        </label>
      </li>
    </delist>   
    <button 
      v-if="showBtn()"
      @click="submit"
    >
      提交
    </button> 
  </div>
</template>

<script>
  import {getGrZbList,getMyStudents,saveJc} from '@/request/deyu'
  import images from '@/views/components/images.vue'
  import Mixin from '@/views/bop/mixins/bzpjMixins.js';
  import delist from './delist.vue'
  export default {
    name:'Pj',
    components: {
      delist,
      images
    },
    mixins:[Mixin],
    data(){
      return {
        list:[],
        xslist:[],
        selIndex:0,
        checkArr:[],
        show: false,
        bz:'',
        mxIndex:0,
        pjList:[],
        dxlx:3,
        searchTxt:'',
        allList:'',
        picArr:[],
        showLen:100,
        pagesShowLen:100,
        maxLen:0
      }
    },
    computed:{ 
      sendName() { 
        return this.checkArr.map(el=>{ 
          return el.mc
        })
      },
      curpyList() { 
        return this.pjList[this.mxIndex];
      }
    },
    watch: { 
      searchTxt() { 
        if(!this.searchTxt) { 
          this.cancel();
          return 
        }
        this.xslist = this.allList.filter(el=>{ 
          return el.xm.indexOf(this.searchTxt)>=0
        })
        this.$refs.delist.closePullUp();
        this.$refs.delist.scrollStart();
      }
    },
    activated() { 
      this.setHeadButton('提交',this.submit); 
    },
    created(){ 
      this.init();
    },
    methods:{ 
      pullingUp() { 
        this.showLen = this.showLen + this.pagesShowLen;
        this.xslist = this.allList.slice(0,this.showLen);
      },
      mxsel(index){ 
        if(index != this.mxIndex) { 
          this.selIndex = 0;
        }
        this.mxIndex = index;
      },
      cancel() { 
        this.showLen = this.pagesShowLen;
        this.xslist = this.allList.slice(0,this.showLen);
        setTimeout(()=>{
          this.$refs.delist.refresh();
        },20)
      },
      init() { 
        getGrZbList().then(data=>{ 
          this.pjList = [data.jfList,data.kfList];
        })
        getMyStudents().then(data=>{ 
          this.allList = [...data.rows];
          this.maxLen = this.allList.length;
          this.xslist = data.rows.slice(0,this.showLen);
        })
      },
      open(){
        if(!this.xslist.length) { 
          this.cancel();
        }
        this.showLen = this.pagesShowLen;
        this.xslist = this.allList.slice(0,this.showLen);
        
        this.show = !this.show;
        setTimeout(()=>{
          this.$refs.delist.refresh();
        },20)
      },
      get() {
         
      },
      sel(item,index) { 
        this.selIndex = index
      },
      submit() { 
        if(!this.checkArr.length) { 
          this.vmsg('','请选择鼓励/惩罚的学生');
          return 
        }
        var dxids = this.checkArr.map(el=>{ 
          return el.xsid;
        })
        var jclist = this.curpyList[this.selIndex];
        jclist.bz = this.bz;
        jclist.fz = jclist.fs;
        jclist.picList = this.picArr;
        saveJc(this.dxlx,[jclist],dxids).then(()=>{ 
          this.checkArr = [];
          this.$store.commit('kjtsUpadte',true);
          this.vueBus.$emit('bzr_xsupdate');
          window.history.go(-1);
        })
      }
    }

  }
</script>

<style lang='less'>
  .pj { 
    height: calc(100% - 90px);
    overflow-y: auto;
    .mxUl { 
      display: flex;
      height: 93px;
      background-color: #fff;
      li { 
        font-size: 32px;
        line-height: 93px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#999;
        flex:1;
        position: relative;
        &.active { 
          color:#35A3DD;
          &:before { 
            content: '';
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            border-radius:5px;
            border-bottom: 1Px solid #35A3DD;
          }
        }
      }
    }
    .dot { 
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #35A3DD;
      color:#fff;
      font-size: 24px;
      text-align: center;
      line-height: 40px;
      right: 20px;
      top: 20px;
    }
    .lTxt { 
      width: 200px;
      display: inline-block;
    }
    input { 
      appearance: none;
      opacity: 0;
    }
  }
</style>