
import Head from '@/views/components/head.vue'
import List from '@/views/components/list.vue'
export const Mixin = {
  components:{
    Head,
    List
  },
  data () {
    return {
      judeArr:[],
      tip:'',
    }
  },
  props:{ 
    hasAdd:{ 
      default:true,
      type:Boolean
    }
  },
  computed: { 
    cellData() { 
      return this.$attrs.cdata
    },
    userInfo() { 
      return this.$attrs.uinfo;
    },
    jbxx() { //基本信息
      return this.cellData.jbxx?this.cellData.jbxx:''
    },
    jsbj() { //是否可以编辑
      return (this.jbxx.jsbj == '0') 
    },
    isInDate() { //是否在编辑时间内
      if(this.jsbj) { 
        var {jssj='',kssj=''} = this.jbxx;
        var curTime = new Date().getTime();
        return (this.toTime(jssj) >= curTime) && (this.toTime(kssj) <= curTime)
      } else { 
        return false
      }
    },
    hasData() { //是否有填写记录
      return this.cellData.sjMap?true:false
    }
  },
  created () {
    this.judeArr = [
      {
        key:this.jsbj,
        tip:'未开放编辑'
      },
      {
        key:this.isInDate,
        tip:'不在开放时间内'
      }
    ];
    this.jude(this.judeArr);
  },
  methods: { 
    add() { 
      this.$emit('add')
    },
    toTime(time) { 
      var reg = /\s|:|-/g;
      var _timeArr = time.split(reg);
      _timeArr[1] = _timeArr[1]*1-1;
      return new Date(..._timeArr).getTime()
    },
    jude(arr) { 
      for(let i = 0;i<arr.length;i++) { 
        const {key,tip=""} = arr[i];
        if(!key) {
          this.tip = tip;
          break;
        }
      } 
    }
  }
}

export default Mixin
