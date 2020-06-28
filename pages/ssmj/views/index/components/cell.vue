<template>
  <div
    class="cellWrapper"
    @click="jump"
  >
    <div class="top">
      <div 
        class="bjName"
        v-text="dataObj.bjmc"
      ></div>
      <div class="ygqWrapper">
        <span class="ygqName">应归寝</span>
        <span 
          class="ygqNum"
          v-text="gqzs"
        ></span>
      </div>
    </div>
    <ul class="delUl">
      <li class="delLi">
        <span class="delName">未归寝</span>
        <span 
          class="delNum r_color"
          v-text="dataObj.wgqrs || 0"
        ></span>
      </li>
      <li class="delLi">
        <span class="delName">按时归寝</span>
        <span 
          class="delNum b_color"
          v-text="dataObj.ygqrs"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    props:{ 
      dataObj:{ 
        type:Object,
        default() { 
          return {}
        }
      },
      curTime:{ 
        type:String,
        default:''
      }
    },
    data(){
      return { 
        targetData:'',
        njmc:'',
        ygqrs:0
      }
    },
    computed:{ 
      gqzs() { 
        return parseInt(this.dataObj.ygqrs) + parseInt(this.dataObj.wgqrs)
      }
    },
    watch:{ 
     dataObj() { 
       this.init();
     }   
    },
    created() { 
      this.init();
    },
    methods:{ 
      init() { 
        if(this.dataObj.njmc) { 
          var {njmc,...resObj} = this.dataObj;
          this.njmc = njmc;
          var [key] = Object.keys(resObj)
          console.log(key);
          this.targetData = resObj[key];
          this.initYgqrs();
        }
      },
      initYgqrs() { 
        this.ygqrs = parseInt(this.targetData.ygqrs || 0) + parseInt(this.targetData.wgqrs || 0) 
      },
      jump() { 
        console.log({...this.dataObj})
        sessionStorage.setItem("detailData",JSON.stringify(this.dataObj));
        this.$router.push({name:'bjDetail',query:{time:this.curTime}})
      }
    },

  }
</script>

<style lang='less'>
  .cellWrapper { 
    width: 100%;
    min-height: 145px;
    border-radius:10px;
    background-color: #fff;
    padding: 30px;
    padding-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 3px solid #388CFF;
    & + .cellWrapper { 
      margin-top: 30px;
    }
    .top { 
      display: flex;
      justify-content: space-between;
    }
    .ygqNum { 
      display: flex;
      font-size: 26px;
      color:#666;
    }
    .bjName { 
      font-size: 32px;
      color:#333;
    }
    .delLi { 
      display: flex;
      padding: 0 30px;
      height: 36px;
      align-items: center;
      position: relative;
      &:nth-child(1) { 
        padding-left: 0;
      }
      & + .delLi { 
        .bd(#efefef,'left');
        
      }
      .delName { 
        font-size: 28px;
        color:#666;
      }
      .delNum { 
        margin-left: 20px;
      }
    }
    .delUl { 
      display: flex;
    }
  }
</style>