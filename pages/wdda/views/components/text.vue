<template>
  <div id="text">
    <input
      v-model="val"  
      :type="type"
      class="commonInput"
      :class="ableBj?``:`unableText`"
      :placeholder="placeholder"
      :readonly="!ableBj"
    >
    <!-- <span 
      v-show="isArrow"
      class="iconfont" 
    >
      &#xe612;
    </span> -->
  </div>
</template>
<script>
import Mixin from '@/static/js/mixins';
import RexObj from '@/static/js/RegExp.js'
export default {
  name: 'Txcell',
  components: { 
  },  
  mixins:[Mixin],
  data(){ 
    return { 
      type:'text'
    }
  },
  watch:{ 
    val() { 
      this.$emit('input',this.val)
    }
  },
  created() { 
  },
  mounted() { 

  },  
  methods: { 
    beforeCheck() { 
      if(!this.val) return 
      if(RexObj[this.zd.zdlx]) {
        console.log(RexObj[this.zd.zdlx]) 
        if(!RexObj[this.zd.zdlx].test(this.val)) { 
          this.$emit('checkError',{errorMsg:`${this.zdmc}格式不正确，请输入正确格式`})
        }
      }
    }
  },

}
</script>
<style lang='less'>

</style>
