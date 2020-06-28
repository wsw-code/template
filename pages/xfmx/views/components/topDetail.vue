<template>
  <div 
    class="topCon"
    :class="fz?'heightClass':''"
  >
    <div class="topHeader">
      <div 
        class="moreWrapper"
        @click="openTime"
      >
        <span 
          class="curTime"
          v-text="curTime"
        ></span>
        <img 
          src="~@/static/images/more.png"
          class="more"
        >
      </div>
      <div class="ygqWrapper">
        <span class="ygqName">应归寝</span>
        <span 
          class="ygqNum" 
          v-text="totalYgq+totalWgq"
        ></span>
      </div>
    </div>
    <ul 
      class="conList"
      :class="fz?'fzClass':''"
    >
      <li class="state">
        <span 
          class="num" 
          v-text="totalWgq"
        ></span>
        <span class="name">未归寝</span>
      </li>
      <li class="state">
        <span 
          class="num y_color" 
          v-text="totalYgq">
        </span>
        <span class="name">按时归寝</span>
      </li>
    </ul>
    <DatetimePicker
      ref="datepicker"
      v-model="pickerValue" 
      :end-date="curDate"
      type="date"  
      @confirm="getConfirmTime"  
    >
    </DatetimePicker>
  </div>
</template>

<script>
  import { DatetimePicker } from 'mint-ui';
  export default {
    components: { 
      DatetimePicker
    },
    props:{ 
      height:{ 
        type:Number,
        default:0
      },
      fz:{ 
        type:Boolean,
        default:false
      },
      totalYgq: { 
        type:Number,
        default:0
      },
      totalWgq: { 
        type:Number,
        default:0
      },
      curTime:{ 
        type:String,
        default:""
      }
    },
    data(){
      return {
        pickerValue:new Date()
      }
    },
    computed: { 
      curDate() { 
        return new Date();
      }
    },
    created() { 
      this.pickerValue = this.curDate;
    },
    methods: { 
      getConfirmTime(value) { 
        var _year = value.getFullYear();
        var _month = value.getMonth()+1;
        var _date = value.getDate();
        _month = `${_month}`.padStart(2,"0");
        _date = `${_date}`.padStart(2,"0");
        this.$emit('getTime',`${_year}-${_month}-${_date}`);
      },
      openTime() { 
        this.$refs.datepicker.open();
      }
    }

  }
</script>

<style lang='less'>
  .topCon { 
    height: 230px;
    border-radius:10px;
    background-color: #fff;
    position: relative;
  }
  .topHeader { 
    width: 100%;
    height: 80px;
    display: flex;
    font-size: 26px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    .bd(#ddd,'bottom');
  }  
  .conList { 
    display: flex;
    position: absolute;
    width: 100%;
    top:80px;
    bottom:0;
    left:0;
  }
  .num { 
    color:#F2276F;
    font-size: 60px;
    margin-bottom: 20px;
  }
  .name { 
    font-size: 24px;
    color:#999;
  }
  .state { 
    height: 100%;
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & + .state { 
      position: absolute;
      left:0;
      top:28px;
      height: 74px;
      .bd(#ddd,'left');
    } 
  }
  .fzClass { 
    .num { 
      font-size: 36px;
    }
  }
  .heightClass { 
    height: 214px;
  }
</style>