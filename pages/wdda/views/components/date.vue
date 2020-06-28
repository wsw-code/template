<template>
  <div id="date">
    <input 
      v-model="showVal"
      type="text" 
      class="commonInput"
      readonly="true"
      :class="ableBj?``:`unableText`"
      :placeholder="placeholder"
      @click="open"
    >
    <span 
      v-show="isArrow"
      class="iconfont" 
    >
      &#xe612;
    </span>
    <DatetimePicker
      ref="datepicker"
      v-model="pickerValue" 
      :start-date="minDate"
      :end-date="maxDate"
      type="date"
      @confirm="getTime"
    ></DatetimePicker>
  </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import Mixin from '@/static/js/mixins'
export default {
  name: 'Date',
  components: { 
    DatetimePicker,
  },  
  mixins:[Mixin],
  data(){ 
    return { 
      pickerValue:'',
      minDate:new Date(),
      showVal:''
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
    open() { 
      this.$refs.datepicker.open();
    },
    initTime() { 
      const dateObj = new Date();
      this.pickerValue = dateObj;
      var _year = dateObj.getFullYear() - 100;
      console.log(_year)
      this.minDate = new Date(_year,1,1);
    },
    getTime() { 
      if(!this.pickerValue) return 
      const _dateObj = this.pickerValue;
      const _year = _dateObj.getFullYear();
      const _month = _dateObj.getMonth() +1;
      const _date = _dateObj.getDate();
      var _time = [_year,_month,_date].join('-');
      this.showVal = _time
      this.val =  _time + ' 00:00:00';
      this.$emit('input',this.val);
    },
    needShow(val) { 
      this.showVal = this.showDate(val);
      this.val = val;
    }
  }
}
</script>
<style lang='less'>
#date { 
}
</style>
