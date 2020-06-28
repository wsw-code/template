<template>
  <div id="kjtschild">
    <indexDeyuList></indexDeyuList>
  </div>
</template>

<script>
  import indexDeyuList from '@/views/components/indexDeyuList.vue'
  import Mixin from '@/static/js/mixins.js'
  export default {
    name:'', 
    components: {
      indexDeyuList
    },
    mixins:[Mixin],
    data(){
      return {
      }
    },
    computed: { 
    },
    activated() { 
      // this.$refs.kjts.resfreshScroll();
    },
    methods: { 
    }

  }
</script>

<style lang='less'>
  #kjtschild {
    height: 100%;
  }
</style>