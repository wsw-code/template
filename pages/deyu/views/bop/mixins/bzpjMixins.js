
export const Mixin = {
  data () {
    return {
    }
  },
  watch: { 
    show() { 
      if(this.show) { 
        this.setHeadButton('提交',function(){window.history.go(-1)}); 
      } else { 
        this.initHeadBtn(); 
      }
    }
  },
  computed: { 

  },
  activated() { 
    this.initHeadBtn();
  },
  created () {
    this.initHeadBtn();
  },
  methods: {
    initHeadBtn() { 
      this.setHeadButton('提交',this.submit); 
    }
  }
}

export default Mixin