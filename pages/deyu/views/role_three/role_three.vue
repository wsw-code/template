<template>
  <div id="role_three">
    <indexDeyuList 
      ref="kjts"
    ></indexDeyuList>
    <btn></btn>    
  </div>
</template>

<script>
  import indexDeyuList from '@/views/components/indexDeyuList.vue'
  import Mixin from '@/static/js/mixins.js'
  import Btn from '@/views/components/btn.vue'
  export default {
    name:'RoleThree',
    components: { 
      indexDeyuList,
      Btn
    },
    mixins:[Mixin],  
    data(){
      return {

      }
    },
    
  }
</script>

<style lang='less'>
  #role_three { 
    height: 100%;
  }
</style>