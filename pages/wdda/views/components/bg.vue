<template>
  <div id="bg">
    <Head 
      :tip="tip"
      :has-data="hasData"
      v-bind="$attrs"
      v-on="$listeners"
    ></Head>
    <List 
      v-for="(item,key) in cellData.sjMap"
      :key="key"
      :cindex="key"
      :sj-map="item"
      :list="cellData.zdList"
      :list-type="`bg`"
      v-bind="$attrs"
      v-on="$listeners"
    ></List>
    <div 
      v-show="hasAdd && $attrs.isbj"
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
    name:'Bg',
    mixins:[BdbgMixins],
    data(){
      return { 
      }
    },
    created() { 
    },
  }
</script>

<style lang='less'>

</style>