<template>
  <div class="bzpj">
    <textarea 
      placeholder="评价内容(选填)"
      class="textarea"
      @input="inputFn"
    ></textarea>
    <div 
      class="towho"
      @click="open"
    >
      <span class="toIcon">@</span>
      <span 
        class="toTxt"
        v-text="toTxt"
      ></span>
      <span 
        v-for="(item,index) in toWho"
        :key="index"
        class="whospan"
        v-text="`@${item}`"
      ></span>
    </div>
    <div class="mx">
      选择荣誉勋章
    </div> 
    <ul class="pyUl">
      <li 
        v-for="(item,index) in list"
        :key="index"
        class="pyLi"
        :class="selIndex == index?'active':''"
        @click="sel(item,index)"
      >
        <img :src="showRyImg(item.tpmc)">
        <div 
          class="ryName"
          v-text="item.ry_name"
        ></div>
      </li>
    </ul>  
  </div>
</template>

<script>
  export default {
    props: { 
      toTxt: { 
        type:String,
        default:''
      },
      list:{ 
        type:Array,
        default() { 
          return []
        }
      },
      toWho: { 
        type:Array,
        default() { 
          return []
        }        
      }
    },
    data(){
      return { 
        txt:'',
        selIndex:0
      }
    },
    methods: { 
      sel(item,index) { 
        this.selIndex = index
      },
      open() { 
        this.$emit('open');
      },
      submit() { 
      },
      inputFn(e) { 
        this.$emit('input',e.target.value)
      }
    }
  }
</script>

<style lang='less'>

</style>