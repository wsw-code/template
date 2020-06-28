
import util from 'util'
export const Mixin = {
  data () {
    return {
    }
  },
  computed: { 

  },
  activated() { 
    window.AndoridBack = util.returnApp;
    this.settitle('数字德育空间');
  },
  created () {

  },
  methods: {
  
  }
}

export default Mixin
