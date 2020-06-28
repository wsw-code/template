<template>
  <div id="bd">
    <Head 
      :cell-data="cellData"
      :tip="tip"
      :has-data="hasData"
      :sj-map="cellData.sjMap"
      v-bind="$attrs"
      v-on="$listeners"
    ></Head>
    <List 
      v-if="hasData"
      v-bind="$attrs"
      :sj-map="cellData.sjMap"
      :list="cellData.zdList"
      v-on="$listeners"
    ></List>
    <div 
      v-if="hasAdd && $attrs.isbj && !hasData"
      class="addWrapper" 
      @click="add"
    >
      <div class="addIcon"></div>
      <span>添加</span>  
    </div>  
  </div>
</template>

<script>
  import BdbgMixins from '@/static/js/bdbgMixins'
  export default {
    name:'Bd',
    mixins:[BdbgMixins],
    data(){
      return {

      }
    },
    computed: { 
    },
    created() { 
    },
    methods: { 

    }
  }
</script>

<style lang='less'>

</style>