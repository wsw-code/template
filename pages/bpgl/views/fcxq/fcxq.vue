<template>
  <div 
    id="fcxq"
    v-html="fcContent"
  ></div>
</template>

<script>
  import {getBjfc} from '@/request/bpgl.js'
  export default {
    name:'Fcxq',
    data(){
      return {
        fcContent:''
      }
    },
    created() { 
      this.init();
    },
    methods:{
      init() { 
        getBjfc([this.$route.query.id])
        .then(data=>{ 
          console.log(data);
          this.fcContent = data.bjfc.content;
        })
      }
    }
  }
</script>

<style lang='less'>
 #fcxq { 
   width: 100%;
   height: 100%;
   padding: 30px;
   overflow-y: auto;
   -webkit-overflow-scrolling: touch;
   img { 
     max-width: 100%;
   }
   table { 
     width: 100% !important;
   }
 } 
</style>