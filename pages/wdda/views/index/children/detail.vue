<template>
  <div class="detailPage">
    <div 
      v-show="isbj"
      class="bjsjkf"
    >
      <div v-if="shzt == '0' || !shzt">
        <p 
          v-if="shzt == '0'"
          v-text="shztInfo[shzt].txt"
        ></p>
        <p 
          v-if="kfsj"
          v-text="'开放编辑时间:'+kfsj"
        ></p>   
        <p 
          v-show="prompt" 
          v-text="`提示:${prompt}`"
        >
        </p>  
      </div>
      <div v-else>
        <div>
          <p v-text="shzt?shztInfo[shzt].txt:''"></p>  
          <p 
            v-show="shzt == '3'" 
            v-text="`原因：${bhyy}`"
          >
          </p>
        </div> 
      </div>     
    </div>
    <ul 
      class="wrapper" 
    >
      <li
        v-for="(item,key) in zdList" 
        :key="key"
        :class="isText(item)"
        class="detailLi"
      >
        <div class="key">
          <span 
            v-show="item.bt == 0"
            class="require" 
          >
            *
          </span>
          <span 
            v-text="able?item.zdmc:item.zdmc+' : '"
          ></span>
        </div>
        <div class="value">
          <component 
            :is="getComponentsName(item.zdlx)" 
            ref="components"
            v-model="sjMap[item.zdid]"
            :zd="item"
            :able="able"
            class="value"
            @checkError="checkError"
          ></component>
        </div>
      </li>
    </ul>
    <div 
      v-if="isbj && able"
      class="isbjShow"
    >
      <div 
        v-show="issh == 0"
        class="reBtnBox"
      >
        <button 
          class="submit"
          @click="submit('0')"
        >
          保存草稿
        </button>      
        <button 
          class="submit"
          @click="submit()"
        >
          提交
        </button>
      </div>
      <div 
        v-show="issh != 0"
        class="reBtnBox"
      >     
        <button 
          class="submit submitSave"
          @click="submit()"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import tx from '@/views/components/tx.vue'
import text from '@/views/components/text.vue'
import radio from '@/views/components/radio.vue'
import select from '@/views/components/select.vue'
import date from '@/views/components/date.vue'
import datearound from '@/views/components/datearound.vue'
import textarea from '@/views/components/textarea.vue'
import area from '@/views/components/area.vue'
import images from '@/views/components/images.vue'
import checkbox from '@/views/components/checkbox.vue'
import {saveLrsj} from "@/request/wdda"
import {shztInfo} from '@/static/js/constant.js';
export default {
  name: 'Detail',
  components: {
    'swtx':tx,
    'swtext':text,
    'swradio':radio,
    'swselect':select,
    'swdate':date,
    'swdatearound':datearound,
    'swtextarea':textarea,
    'swarea':area,
    'swimage':images,
    'swcheckbox':checkbox,
  },  
  props:{ 
    curData: { 
      type:Object,
      default(){ 
        return {}
      }
    },
    userInfo: { 
      type:Object,
      default(){ 
        return {}
      }
    },
    curIndex: { 
      type:Number,
      default:0
    },
    bgIndex: { 
      type:Number,
      default() { 
        return -1
      }     
    }    
  },
  data(){ 
    return { 
      zdList:'',
      detailData:'',
      formData:{},
      bdid:'',
      userid:'345701',
      userbdid:'',
      zt:'', // 是否审核
      sjMap: {},
      lx:'0',
      able:true, 
      issh:'', //是否需要审核 '0'=>需要
      bhyy:'', //审核不通过原因
      prompt:'', // 表单/表格提示语
      NotTextArr:["textarea","datearound","image"], // 是否左右排列
      shztInfo,
      errorMsg:'',// 验证错误信息
      copyData:""
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$emit('initbgIndex');
    if(this.copyData && this.curData.sjMap) { 
      this.curData.sjMap = this.copyData;
    }
    next();
  },
  computed: { 
    isbj() { 
      return this.curData.jbxx?(this.curData.jbxx.isbj == '0'):true;
    },
    isbgAdd() {  // 判断是修改还是新增
      return (this.$route.query.type == 'add' && this.lx == '1')
    },
    kfsj() { 
      if(this.curData.jbxx && this.curData.jbxx.hasOwnProperty('kssj')) { 
  
        var {kssj = [],jssj = []} = this.curData.jbxx;
        kssj = kssj.split(' ')[0];
        jssj = jssj.split(' ')[0];
        return `${kssj} 至 ${jssj}`
      } else { 
        return ''
      }
    },
    shzt() { //审核状态
      return this.sjMap?this.sjMap.zt:'';
    },
    isShowReset() { // 是否展示编辑按钮 
      if(this.issh == '0') { //需要审核
        return !this.able && this.shztInfo[this.shzt].canSubmit;
      } else { 
        return !this.able;
      }
    }
  },  
  watch:{
    curData() { 
      this.init() 
    }
  }, 
  created() { 
    this.init()
  },
  mounted() { 
    this.detailData = this.curData;
  },  
  methods: { 
    init() {   
      if(!this.curData.zdList) return 
      this.util.tosettitle(this.curData.jbxx.bdmc); 
      this.zdList = this.curData.zdList;
      this.bdid = this.curData.jbxx.bdid;
      this.lx = this.curData.jbxx.lx;
      this.prompt = this.curData.jbxx.prompt || '';
      this.issh = this.curData.jbxx.issh;
      this.zt = this.curData.jbxx.issh == '0'?'1':'2';
      this.judeShowSubmit();

    },
    judeShowSubmit() { //判断提交/编辑按钮显示
      if(this.isbj) {
        if(this.curData.sjMap) { 
          this.copyData = Object.assign({},this.curData.sjMap)
          this.bhyy = this.lx == '0'?this.curData.sjMap.bhyy:this.curData.sjMap[this.bgIndex].bhyy; 
          this.initSjMap();
          if(this.isbgAdd) { 
            this.able = true; 
          }
        } 
      } else { 
        this.able = false;
      }
    },
    initSjMap() { 
      if(this.bgIndex>=0) { 
        this.sjMap = this.curData.sjMap[this.bgIndex];
      } else { 
        this.sjMap = this.curData.sjMap;
      }
      this.userbdid = this.sjMap.userbdid;
    },
    //zt是否需要审核
    submit(zt) { 
      const _components = this.$refs.components;
      let _ableSave = true;
      for(let i = 0;i<_components.length;i++) { 
        let curComponent = _components[i];
        curComponent.check();
        if(this.errorMsg) {
          this.vmsg('',this.errorMsg);
          _ableSave = false;
          this.errorMsg = '';
          break;
        }
      }
      this.formData = Object.assign(this.sjMap,{'zt':zt?zt:this.zt});
      _ableSave && this.save();
      
    },
    save() { 
      saveLrsj(this.bdid,this.userid,this.formData,this.userbdid).then(data=>{ 
        this.copyData = ''
        if(data.result.code == '0') { 
          if(this.userbdid) { 
            this.$emit('getnewSjmap',{'newMap':this.formData,'curIndex':this.curIndex,'bgIndex':this.bgIndex});
            window.history.go(-1);
          } else { 
            this.$parent.init().then(()=>{ 
              window.history.go(-1);
            });
          }
        } else { 
          this.vmsg('',data.result.verifyObjList[0].msg)
        }
      })
    },
    getComponentsName(zdlx) { 
      if(['tx','date','datearound','radio','select','textarea','area','image','checkbox'].indexOf(zdlx)>=0) { 
        return `sw${zdlx}`
      } else { 
        return `swtext`
      }
    },
    reset() { 
      this.able = true;
    },
    isText(item) { 
      var _class = this.NotTextArr.indexOf(item.zdlx)>=0?'notTextClass':''
      return this.able?_class:_class+ ' seeStatus'
    },
    checkError(obj) { 
      this.errorMsg = obj.errorMsg;
    }
  }
}
</script>
<style lang='less'>
  .bjsjkf { 
    min-height: 83px;
    line-height: 83px;
    padding: 20px 30px;
    color:#F2266F;
    background-color: rgba(242,38,111,0.05);
    p { 
      line-height: 1.5em;
    }
  }
  .detailPage { 
    position: absolute;
    width: 100%;
    height: 101%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    top:0;
    left:0;
    z-index: 20;
    background-color: #fff;
    .submit { 
      display: block;
      width:90%;
      height: 80px;
      color:#fff;
      text-align: center;
      line-height: 80px;
      background-color: #388CFF;
      border-radius: 6px;
      margin: 0 auto;
      font-size: 32px;
      &.submitSave { 
        width: 100%;
      }
    }
    .wrapper { 
      width: 100%;
      .detailLi { 
        display: flex;
        min-height: 100px;
        justify-content: space-between;
        padding: 23px 0;
        padding-left: 30px;
        padding-right: 20px;
        .bd(#ddd,'bottom');
      }
      .notTextClass { 
        flex-direction: column;
      }
      .seeStatus { 
        justify-content: flex-start;
        input { 
          text-align: left;
        }
      }
      .key { 
        margin-right: 10px;
        min-width: 140px;
        font-size: 32px;
        line-height: 50px;
      }
      .value { 
        font-size: 32px;
        .tx { 
          width: 140px;
          height: 140px;
        }
      }
    }
    .prompt { 
      font-size: 28px;
      margin-top: 20px;
      color:red;
    }
    .require { 
      color:red;
    }
  }
  .reBtnBox { 
    display: flex;
    padding: 30px;
    .submit { 
      width: 40%;
    }
    .bjSubmit { 
      width: 100%;
    }
  }
</style>
