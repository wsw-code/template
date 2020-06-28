
export const Mixin = {
  data () {
    return {
      val: '',
      zdid:'',
      zdmc:'',
      propmt:'',
      showVal:'', //展示的数据
      isbj:true,
      errorMsg:'',
      notdefault: true
    }
  },
  props:{ 
    zd: { 
      type:Object,
      default() { 
        return {}
      }
    },
    able: { 
      type: Boolean,
      default() { 
        return true
      }
    },    
    mapVal: {
      type:[String,Number,Array],
      default() { 
        return ''
      } 
    },
    value:{ 
      type:[String,Number,Array],
      default:''
    }   
  },  
  watch: {
    value(){ 
      this.init();
    }
  },
  computed: { 
    isArrow() { 
      return !this.notdefault?this.notdefault:this.able
    },
    userInfo(){ 
      return this.$parent.userInfo
    },
    bjzt() { 
      return this.componentAble || this.isbj
    },
    ableBj() { 
      return this.able && this.notdefault;
    },
    placeholder() { 
      const _txt = this.zd.zdlx =='select'?'请选择':'请输入'
      if(!this.able) { 
        return '--'
      } else { 
        return this.zd.prompt?this.zd.prompt:_txt+this.zd.zdmc;
      }
      
    }
  },
  created () {
    // this.valShow();
    this.init();
    this.initDefaultProp();
    this.getZdinfo();
  },
  methods: {
    init() { 
      if(!this.value) return
      this.val = this.value;
      this.needShow && this.needShow(this.value);
    },
    valShow() { 
      if(this.mapVal) { 
        this.val = this.mapVal;
      }
      this.needShow && this.needShow(this.mapVal);
    },
    initDefaultProp() { //判断有没有默认值
      if(this.userInfo[this.zd.zdlx]) { 
        this.val = this.userInfo[this.zd.zdlx];
        this.needShow && this.needShow(this.val)
        this.notdefault = false;
      }
    },
    getZdinfo() { //获取字段ID/是否必填/字段名字;
      this.zdid = this.zd.zdid;
      this.zdmc = this.zd.zdmc;
      this.bt = this.zd.bt;
    },
    check() { 
      if(this.bt == 0 && !this.val) { 
        this.$emit('checkError',{errorMsg:`${this.zd.zdmc}不能为空`})
      } else if(this.beforeCheck){ 
        return this.beforeCheck();
      }
    }
  }
}

export default Mixin
