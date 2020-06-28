<template>
  <div 
    id="infiniteScroll"
  >
    <slot name="sroll"></slot>      
  </div>
    <!-- <spinner 
    :size="20" 
    type="fading-circle"
  ></spinner> -->
</template>

<script>
  // import {Spinner} from 'mint-ui';
  export default {
    components:{
      // Spinner  
    },
    props: {
                   
    },  
      
    data() { 
      return { 

      }
    },
    watch: {

    },
    created() { 
      
    },
    mounted() {      
      console.log(this.$slots)
    },
    activated() { 

    },
    deactivated() { 
    },
    beforeDestroy() { 

    },
    methods: {

    },
  }
</script>

<style  lang="less" scoped>
#infiniteScroll { 
  width:100%;
  height: 101%;
  overflow-y:auto; 
}
</style>