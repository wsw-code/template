<template>
  <div class="datearound">
    <div class="timeSprite">
      <div class="sprite"></div>
    </div>
    <div class="timeBox">
      <div 
        class="timeCell"
        @click="getTime(0)"
      >
        <span>开始时间</span>  
        <div class="timeLeft">
          <input 
            v-model="startTime"
            type="text" 
            readonly="true"
            class="commonInput"
            :class="ableBj?``:`unableText`"
          >
          <span 
            v-show="isArrow"
            class="iconfont" 
          >
            &#xe612;
          </span>
        </div>
      </div> 
      <div 
        class="timeCell"
        @click="getTime(1)"
      >
        <span>结束时间</span>  
        <div class="timeLeft">
          <input 
            v-model="endTime"
            type="text" 
            readonly="true"
            class="commonInput"
            :class="ableBj?``:`unableText`"
          > 
          <span 
            v-show="isArrow"
            class="iconfont" 
          >
            &#xe612;
          </span>
        </div> 
      </div> 
    </div>
    <DatetimePicker
      ref="datepicker"
      v-model="pickerValue" 
      :start-date="minDate"
      :end-date="maxDate"
      type="date"  
      @confirm="getConfirmTime"  
    >
    </DatetimePicker>   
  </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import Mixin from '@/static/js/mixins'
export default {
  name: 'Datearound',
  components: { 
    DatetimePicker
  },
  mixins:[Mixin],  
  data(){ 
    return { 
      minDate:new Date(),
      pickerValue:'',
      type:0,
      startTime:'',
      endTime:''
    }
  },
  computed:{ 
    maxDate() { 
      var year = new Date().getFullYear()+5;
      return new Date(year,12);
    }
  },
  created() { 
    this.initTime();
  },
  mounted() { 

  },  
  methods: { 
    getTime(type) { 
      this.type = type;
      this.$refs.datepicker.open();
    },
    initTime() { 
      const dateObj = new Date();
      this.pickerValue = dateObj;
      var _year = dateObj.getFullYear() - 100;
      this.minDate = new Date(_year,1,1);
    },
    getConfirmTime() { 
      if(!this.pickerValue) return
      const _dateObj = this.pickerValue;
      const _year = _dateObj.getFullYear();
      const _month = _dateObj.getMonth() +1;
      const _date = _dateObj.getDate();
      const _val = [_year,_month,_date].join('.');      
      if(this.type == 0) { 
        this.startTime = _val;
      } else { 
        this.endTime = _val;
      }
      this.val = `${this.startTime}-${this.endTime}`; 
      this.$emit('input',this.val);
    },
    beforeCheck() { 
      if(!this.startTime || !this.endTime) return
      if(this.accoutTime(this.startTime) > this.accoutTime(this.endTime)) { 
        this.$emit('checkError',{errorMsg:'开始时间不能大于结束时间'})
      }
    },
    accoutTime(time) {
      time = time.split('.');
      return new Date(...time).getTime();
    },
    needShow(val) { 
      var [startTime,endTime] = val.split('-');
      this.startTime = startTime;
      this.endTime = endTime;
      this.val = val;
    },
  },

}
</script>
<style lang='less'>
.datearound { 
  display: flex;
  align-items: center;
  .timeBox { 
    width: 100%;
  }
  .timeCell { 
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    & + .timeCell { 
      .bd(#ddd,'top');
    }
  }
  .commonInput { 
    width: 170px;
  }
  .betIcon { 
    margin: 0 10px;
  }
  .timeSprite { 
    width: 20px;
    margin-right: 20px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .sprite { 
      width: 6px;
      height: 100%;
      background-color: #f6f6f6;
    }
    &:before { 
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      top:0;
      left:0;
      background-color: #388CFF;
    }
    &:after { 
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      bottom:0;
      left:0;
      background-color: #388CFF;
    }    
  }
}
</style>
