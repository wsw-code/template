<template>
  <div class="infoWrapper">
    <ul 
      class="infoList"
      :class="listType == 'bg'?'deinfoList':''"
    >
      <li 
        v-for="(cell,cellKey) in list"
        :key="cellKey"
        class="infoCell"
        :class="cell.zdlx == 'image' && sjMap[cell.zdid]?'imagesCell':''"
      >
        <div
          class="key"
          v-text="`${cell.zdmc}:`"
        >
        </div>
        <div 
          v-if="cell.zdlx == 'image' && sjMap[cell.zdid]"
          class="value"
        >
          <div 
            v-for="(imgCell,imgKey) in imgArr(sjMap[cell.zdid])"
            :key="imgKey"
            :style="`backgroundImage:url(${imgVal(imgCell)})`"
            class="valImg"
            @click="openView({index:imgKey,img:sjMap[cell.zdid]})" 
          >
          </div>
        </div>
        <div 
          v-else-if="cell.zdlx == 'tx'"
          class="value"
        >
          <img 
            class="avator"
            :src="comAvator"
          > 
        </div>
        <div 
          v-else
          class="value"
          v-text="sjMap[cell.zdid] || '--'"
        >
        </div>        
      </li>         
    </ul>
  </div>
</template>

<script>
  export default {
    props:{ 
      list:{ 
        default() { 
          return []
        },
        type:Array
      },
      sjMap:{ 
        default() { 
          return {}
        },
        type: [Array,Object]        
      },
      listType:{
        default:'',
        type:String
      }
    },
    data(){
      return { 

      }
    },
    computed:{ 
      isBd() { 
        return this.sjMap instanceof Array? false : true; 
      },
      comAvator() { 
        return `${this.$attrs.host}/showImg.do?type=tx&userid=${this.$attrs.userid}&timestamp=${new Date().getTime()}`
      },
    },
    created() { 
      console.log(this.$attrs);
    },
    methods:{ 
      imgArr(str) { 
        return str?str.split(','):[];
      },
      openView(obj) { 
        window.vueEvents.$emit('zoom',obj)
      },
      imgVal(imgId) { 
        return `${this.$attrs.host}/showImg.do?type=img&imgid=${imgId}&xxh=${this.$attrs.xxh}&userid=${this.$attrs.userid}&timestamp=`
      }
    }
  }
</script>

<style lang='less'>
  
</style>