<template>
  <div>
    <div class="header">
      <img 
        :src="comIcon"
        class="headerIcon"
      >
      <span 
        class="headerText"
        v-text="itemData.jbxx.bdmc"
      ></span>
    </div>
    <div class="contant">
      <List 
        v-for="(item,key) in itemData.sjMap"
        :key="key"
        :sj-map="item"
        :list="itemData.zdList"
        :list-type="`bg`"
        v-bind="$attrs"
      ></List>
    </div>     
  </div>
</template>

<script>
  import List from './list.vue'
  export default {
    components: {
      List
    },
    props:{
      itemData:{ 
        default() { 
          return {}
        },
        type:Object
      },
      userInfo:{ 
        default() { 
          return {}
        },
        type:Object
      }
    },
    data(){
      return {

      }
    },
    computed:{ 
      comAvator() { 
        return `${this.$attrs.host}/showImg.do?type=tx&userid=${this.$attrs.userid}&timestamp=${new Date().getTime()}`
      },
      comIcon() { 
        return `${this.$attrs.host}/pages/wdda/images/${this.itemData.jbxx.icon}-.png`
      }
    },
    created() { 
    }

  }
</script>

<style lang='less'>
  
</style>