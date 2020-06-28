<template>
  <div class="bjpm">
    <tj 
      :rzy="value.rzy"
      :idkey="value.idkey"
      :dxlx="value.dxlx"
      :trname="value.trname"
      :pull="value.pull"
      :mybjlistshow="false"
      :showSelect="false"
      :getid="getid"
    ></tj>
  </div>
</template>

<script>
  import Tj from '@/views/components/tj.vue'
  export default {
    name:'bjpm',
    components: {
      Tj
    },
    computed:{ 
      getid() { 
        return this.$route.query.bjid
      }
    },
    data(){
      return { 
        value:{dxlx:3,txt:'学生德育',rzy:[4,3,2],idkey:'bjid',trname:'姓名',pull:false}
      }
    },
    created() { 
      this.settitle(this.$route.query.bjname);
    }
  }
</script>

<style lang='less'>
  .bjpm { 
    width: 100%;
    height: 100%;
  }
</style>