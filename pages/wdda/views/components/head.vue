<template>
  <div
    v-if="cellData.jbxx" 
    class="headWrapper"
  >
    <div class="head">
      <div class="left">
        <img 
          class="iconClass"
          :src="comIcon"
        >
        <span 
          class="title"
          v-text="title"
        ></span>
      </div>
      <div 
        v-if="!onlyView"
        class="rightPart"
      >
        <div 
          v-if="showBdBj && hasData && isbd"
          class="rightIcon"
          @click="add"
        ></div>
        <div 
          v-if="showView"
          class="viewIcon"
          @click="toViewMore"
        ></div>
        <div 
          v-if="tip"
          class="tipTxt"
          v-text="tip"
        ></div>
      </div>
    </div>
    <div
      v-if="showPerson"
      class="personalInfoWrapper"
    >
      <div 
        class="personalInfo"
        :style="getShzt()"
      > 
        <img 
          class="avator"
          :src="showTx()"
        >  
        <div> 
          <div 
            class="name"
            v-text="userInfo.xm"
          ></div>
          <div 
            class="xx"
            v-text="userInfo.xx"
          ></div>
        </div> 
      </div>
    </div> 
  </div>
</template>

<script>
  import {shztInfo} from '@/static/js/constant.js';
  export default {
    name:"Head",
    props: { 
      sjMap:{ 
        default() { 
          return {}
        },
        type: [Array,Object]        
      },
      tip:{ 
        type:String,
        default:''
      },
      hasData:{ 
        type:Boolean,
        default:false
      },
      onlyView: { 
        default:false,
        type: Boolean
      }
    },
    data(){
      return {
        shztInfo,
        isteacher:NODE_ISTEACHER
      }
    },
    computed:{ 
      showPerson() { 
        if(this.onlyView) { 
          return false
        } else { 
          return this.cellData.jbxx.bdmc == '个人信息'
        }
      },
      showView() { 
        if(this.isbd) { 
          return !this.showBdBj
        } else { 
          return false
        }
      },
      cellData() { 
        return this.$attrs.cdata
      },
      userInfo() { 
        return this.$attrs.uinfo;
      },
      comIcon() { 
        return `${NODE_BASEURL}/pages/wdda/images/${this.cellData.jbxx.icon}-.png`
      },
      title() { 
        return this.cellData.jbxx.bdmc
      },
      isbd() { 
        return this.cellData.jbxx.lx === '0'?true:false
      },
      issh() { 
        return this.cellData.jbxx.issh == '0';
      },
      zt() { 
        return this.cellData.sjMap?this.cellData.sjMap.zt:''
      },
      showBdBj() { //显示表单编辑按钮
      if(!this.zt) return true
        let _jude = this.issh?this.shztInfo[this.zt].canSubmit:true;
        return (this.isbd && this.$attrs.isbj && _jude)
      }
    },
    created() { 
    },
    methods: { 
      getShzt() { 
        if(!this.zt) return 
        if(this.issh) { 
            let icon = this.shztInfo[this.zt].icon;
            return `background-image:url(${icon})`
        } else { 
          return ''
        } 
      },
      add() { 
        this.$emit('add');
      },
      toViewMore() { 
        this.$emit('viewMore',{cdata:this.cellData,zdList:this.cellData.zdList,sjMap:this.cellData.sjMap})
      },
    }
  }
</script>

<style lang='less'>
  .head { 
    height: 90px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .rightPart { 
      display: flex;
      align-items: center;
    }
    .rightIcon { 
      margin-right: 20px;
    }
    border-bottom: 1Px solid #ddd;
    // .bd(#ddd,'bottom');
    .iconClass { 
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    .left { 
      height: 100%;
      display: flex;
      align-items: center;
    }
    .title { 
      font-size: 32px;
      color:#333;
    }
    .tipTxt { 
      font-size: 24px;
      height: 50px;
      border-radius: 25px;
      
      padding: 0 15px;
      padding-top: 12px;
      color:#F2266F;
      border: 1Px solid #F2266F;
    }
  }
  .personalInfoWrapper { 
    padding: 0 30px;
  }
  .personalInfo { 
    width:100%;
    height: 142px;
    display: flex;
    align-items: center;
    border-bottom: 1Px solid #f6f6f6;
    background-size: 100px 100px;
    background-position: right 20px;
    background-repeat: no-repeat;
    .avator { 
      margin-left: 0;
      margin-right: 20px;
    }
    .name { 
      margin-bottom: 20px;
      font-size: 28px;
      color:#333;
    }
    .xx { 
      font-size: 28px;
      color:#999;
    }    
  } 
</style>