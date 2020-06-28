<template>
  <div id="role_one">
    <!-- <Kjts 
      ref="kjts"
    ></Kjts> -->
    <indexDeyuList></indexDeyuList>
    <btn></btn>
  </div>
</template>

<script>
  // import Kjts from '@/views/components/kjtsList.vue'
  import indexDeyuList from '@/views/components/indexDeyuList.vue'
  import Btn from '@/views/components/btn.vue'
  import Mixin from '@/static/js/mixins.js'
  export default {
    name:'RoleoOne', 
    components: {
      // Kjts,
      indexDeyuList,
      Btn,
    }, 
    mixins:[Mixin],
    data(){
      return { 

      }
    },
    created() { 
    },
    activated() { 
      // this.$refs.kjts.resfreshScroll();
    },
    methods: { 

    },
  }
</script>

<style lang='less'>
#role_one { 
  height: 100%;
}   
</style>