<template>
  <div id="xschild">
    <tj
      ref="tj"
      :dxlx="3"
      :idkey="'xsid'"
      :rzy="[4,3,2]"
      :trname="'姓名'"
      :show-select="false"
      :bbxs="1"
      :mybjlistshow="false"
    >
    </tj>  
  </div>
</template>

<script>
  import Tj from '@/views/components/tj.vue'
  import Mixin from '@/static/js/mixins.js'
  export default {
    components: {
      Tj
    },
    mixins:[Mixin],
    data(){
      return { 
        selist:[]
      }
    },
    mounted() { 
      this.vueBus.$on('bzr_xsupdate',()=>{ 
        this.$refs.tj.bzr_update();
      })
    }

  }
</script>

<style lang='less'>
  #xschild { 
    height: 100%;
    width:100%;
    position: absolute;
    top:0;
    left:0;
  }
</style>