<template>
  <div class="listCell">
    <div class="top">
      <img 
        :src="showHead(data.lx)" 
        class="avator"
      >
      <div class="right">
        <div 
          class="name"
          v-text="data.title"
        >
          系统消息
        </div>
        <div 
          class="time"
          v-text="data.cjsj"
        ></div>
      </div>
    </div>
    <div class="nr">
      <span 
        class="at"  
        v-text="data.at"
      ></span>
      <span 
        class="bz" 
        v-text="data.bz"
      ></span>
    </div>
    <ul 
      v-if="data.rys"
      class="ryIcon"
    >
      <li
        v-for="(item,index) in data.rys"
        :key="index"
        class="ryCell"
      >
        <div>
          <img 
            class="ryImg"
            :src="showImg(item.tpmc)"
          >
        </div>
        <div 
          class="rytxt"
          v-text="item.ry_name"
        ></div>
      </li>
    </ul>
    <ul 
      v-if="data.zbs"
      class="ryIcon"
    >
      <li
        v-for="(item,index) in data.zbs"
        :key="index"
        class="ryCell"
      >
        <div>
          <img 
            class="ryImg"
            :src="item.fz>=0?jiafen:jianfen"
          >
        </div>
        <div 
          class="rytxt"
          v-text="item.zbmc"
        ></div>
        <div class="fzwrapper">
          <span 
            class="fz" 
            v-text="item.fz>=0?'+'+item.fz:item.fz"
          ></span>
          <span class="fen">分</span>
        </div>
      </li>
    </ul>

    <ul
      v-if="data.picList"
      class="imgWrapper"
    > 
      <li 
        v-for="(item,index) in data.picList"
        :key="index"
        class="imgBox" 
        :style="`backgroundImage:url(${showImages(item)})`"
        @click="viewImg(data.picList,index)"
      ></li>
    </ul>
    <ul 
      class="plxq"
    >
      <li 
        class="cell"
        @click="dzFn()"
      >
        <img 
          v-show="data.sfdz != 1"
          src="@/static/images/ico_dz.png" 
          class="dzicon"
        >
        <img 
          v-show="data.sfdz == 1"
          src="@/static/images/ico_dzed.png"
          class="dzicon"
        >
        <span 
          class="num"
          
          v-text="data.dzs"
        ></span>
      </li>
      <li 
        class="cell"
        @click="toPlxq"
      >
        <img 
          src="@/static/images/ico_comment.png" 
          class="plicon"
        >
        <span 
          class="num"
          v-text="data.pls"
        ></span>
      </li>      
    </ul>
  </div>
</template>

<script>
  import {poxcyPath} from 'appConfig';
  var $poxcyPath = poxcyPath
  import jianfen from '@/static/images/jianfen.png';
  import jiafen from '@/static/images/jiafen.png';
  import {updateDz} from '@/request/deyu'
  import {mapMutations} from 'vuex'
  const lxObj = { 
    '4': $poxcyPath + '/deyu/images/ico_ry.png',
    '3': $poxcyPath + '/deyu/images/head.png',
    '2': $poxcyPath + '/deyu/images/ico_news.png',
    '1': $poxcyPath + '/deyu/images/ico_news.png'
  };
  export default {
    components:{ 
    },
    props: { 
      data: { 
        type:Object,
        default(){ 
          return {}
        }
      },
      ispl: { 
        type: Boolean,
        default: true        
      },
      componentId: { 
        type:Number,
        default:0
      },
      curIndex: { 
        type:Number,
        default:0        
      }
    },
    data(){
      return {
        dzs:0,
        jianfen,
        jiafen
      }
    },
    computed: { 

    },
    created() { 
      this.dzs = this.data.dzs*1;
    },
    methods: {  
      ...mapMutations([ 
        'dzChange',
        'plChange'
      ]), 
      showHead(lx) { 
        return lxObj[lx];
      },
      viewImg(srcArr,index) { 
        this.$bus.$emit('zoom',{img:srcArr,index})
      },
      toPlxq() {
        if(!this.ispl) return
        this.plChange(this.data);
        this.$router.push({name:'plxq',query:{curIndex:this.curIndex}});
      },
      dzFn() { 
        updateDz(this.data.id)
        .then(data=>{ 
          var curData = Object.assign({},this.data);
          if(data.dz.status == '1') { 
            curData.dzs --;
            curData.sfdz = 0;
            curData.dzs = Math.max(0,curData.dzs)
          } else { 
            curData.sfdz = 1;
            curData.dzs ++;
          }
          this.dzChange({curData:curData,id:this.data.id});
        })
      }
    }
  }
</script>

<style lang='less'>

.listCell { 
  padding: 30px;
  border-bottom: 30px solid #EFEFEF;
  // & + .listCell { 
    
  // }
  .top { 
    display: flex;
  }
  .name { 
    font-size:32px;
    color:#333333;
    margin-top: 3px;
    margin-bottom: 20px;
  }
  .time { 
    color:#999;
    font-size: 24px;
  }
  .content { 
    margin: 30px 0;
    font-size: 28px;
    color:#666;
  }
  .ryImg { 
    width: 140px;
  }
  .cell { 
    display: flex;
    align-items: center;
    .num { 
      margin-top: 4px;
    }
  }
  .dzicon { 
    width: 30px;
    height: 30px;
  }
  .plicon { 
    width: 30px;
    height: 30px;    
  }
  .plxq { 
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    li + li { 
      margin-left: 60px;
    }
  }
  .num { 
    margin-left: 14px;
  }
  .at { 
    color:#35A3DD;
  }
  .bz { 
    color:#666;
  }
  .nr { 
    // display: flex;
    font-size: 28px;
    margin-left: 10px;
    margin: 30px 0;
    span { 
      line-height: 36px;
    }
  }
  .ryIcon { 
    width: 460px;
    border: 2px solid rgba(53,163,221,0.5);
    padding: 20px;
    border-radius: 6px;
  }
  .ryCell { 
    display: flex;
    align-items: center;
    img { 
      min-height:140px;
    }
  }
  .rytxt { 
    font-weight: 600;
    font-size: 32px;
    color:#333;
    margin-left: 30px;
  }
  .fzwrapper { 
    font-size: 36px;
    color:#35A3DD;
    font-weight: bold;
    display: flex;
    margin-left: 10px;
  }
  .fen { 
    color:#333;
  }
  .imgBox { 
    width:216px;
    height:122px;   
    background-size:cover;
    background-repeat:no-repeat;
    background-position: center center;
  }
  .imgWrapper { 
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    li { 
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(3n) { 
        margin-right: 0px;
      }
    }
  }
}  
</style>