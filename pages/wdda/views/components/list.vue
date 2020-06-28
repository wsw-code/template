<template>
  <div
    v-show="showList" 
    class="infoWrapper"
  >
    <ul 
      class="infoList"
      :style="getShzt()"
      :class="isBg?'deinfoList':''"
    >
      <div
        v-show="!onlyView && isBg" 
        class="rightPos"
      >
        <div 
          v-if="showBgBj"
          class="rightIcon"
          @click.stop="revise"
        ></div>
        <div 
          v-else
          class="viewIcon"
          @click="toViewMore"
        ></div>
      </div> 
      <li 
        v-for="(cell,cellKey) in filterList"
        :key="cellKey"
        class="infoCell"
        :class="cell.zdlx == 'image' && sjMap[cell.zdid]?'imagesCell':''"
      >
        <div
          class="key"
          v-text="`${cell.zdmc}:`"
        >
        </div>
        <div 
          v-if="cell.zdlx == 'image' && sjMap[cell.zdid]"
          class="value"
        >
          <div 
            v-for="(imgCell,imgKey) in imgArr(sjMap[cell.zdid])"
            :key="imgKey"
            :style="`backgroundImage:url(${showImages(imgCell)})`"
            class="valImg"
            @click.stop="openView({index:imgKey,img:sjMap[cell.zdid]})" 
          >
          </div>
        </div>
        <div 
          v-else-if="cell.zdlx == 'tx'"
          class="value"
        >
          <img 
            class="avator"
            :src="showTx()"
          > 
        </div>
        <div 
          v-else-if="cell.zdlx == 'date'"
          class="value"
        >
          <div 
            class="value"
            v-text="sjMap[cell.zdid]?showDate(sjMap[cell.zdid]):'--'"
          ></div>
        </div>
        <div 
          v-else
          class="value"
          :class="onlyView?'':'onlyView'"
          v-text="sjMap[cell.zdid] || '--'"
        >
        </div>        
      </li>         
    </ul>
  </div>
</template>

<script>
  import {shztInfo} from '@/static/js/constant.js';
  export default {
    props:{ 
      list:{ 
        default() { 
          return []
        },
        type:Array
      },
      sjMap:{ 
        default() { 
          return {}
        },
        type: [Array,Object]        
      },
      listType:{
        default:'',
        type:String
      },
      showAll:{ 
        default:true,
        type: Boolean
      },
      onlyView: { 
        default:false,
        type: Boolean
      },
      isViewPage:{ 
        default:false,
        type: Boolean        
      }
    },
    data(){
      return { 
        shztInfo
      }
    },
    computed:{ 
      showList() { 
        return !this.onlyView?!this.isPersonModel:true
      },
      someList() { 
        var _list = [...[],...this.list]; // 
        return _list.splice(0,3);
      },
      targetList() { 
        return this.showAll?this.list:this.someList;
      },
      filterList() { 
        // return this.targetList
        if(this.isPersonModel && (!this.showAll || this.isViewPage)) { 
          return this.targetList.filter(el=>{ 
            return el.zdlx != 'tx'
          })
        } else { 
          return this.targetList
        }
      },
      issh() { //是否需要审核
        return (this.$attrs.cdata && this.$attrs.cdata.jbxx.issh == '0')
      },
      isPersonModel() { 
         return (this.$attrs.cdata && this.$attrs.cdata.jbxx.bdmc == '个人信息')
      },
      zt() { 
        return this.sjMap.zt
      },
      isBd() { 
        return this.sjMap instanceof Array? false : true; 
      },
      isBg() { 
        return this.listType == 'bg'?true:false;
      },
      showBgBj() { //显示编辑按钮
        if(!this.zt) return false
        let _jude = this.issh?this.shztInfo[this.zt].canSubmit:true;
        return (this.isBg && this.$attrs.isbj && _jude)
      }
    },
    created() { 

    },
    methods:{ 
      toViewMore() { 
        this.$emit('viewMore',{cdata:this.$attrs.cdata,zdList:this.list,sjMap:this.sjMap})
      },
      getShzt() { 
        if(!this.zt) { 
          return false
        }
        if(this.issh) { 
          console.log(this.zt)
          let icon = this.shztInfo[this.zt].icon;
          return `background-image:url(${icon})`
        } else { 
          return ''
        } 
      },
      imgArr(str) { 
        return str?str.split(','):[];
      },
      openView(obj) { 
        this.$bus.$emit('zoom',obj)
      },
      revise() { 
        this.$emit('revise',this.$attrs.cindex);
      }
    }
  }
</script>

<style lang='less'>
  .infoWrapper { 
    padding: 0 30px;
  }
  .infoList { 
    position: relative;
    min-height: 150px;
    background-size: 100px 100px;
    background-position: right 50px;
    background-repeat: no-repeat;
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
      margin-right: 20px;
    }
    .value { 
      color:#999;
      word-break: break-all;
      display: flex;
      flex-wrap:wrap;
      &.onlyView { 
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
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
  .infoWrapper:nth-last-child(1) { 
    .deinfoList { 
      &::after { 
        height: calc(100% - 40px);
      }
    }
  }
  .contant { 
    padding: 15px 30px;
  }
  .rightPos { 
    display: flex;
    position: absolute;
    top:15px;
    right:0;
  }

</style>