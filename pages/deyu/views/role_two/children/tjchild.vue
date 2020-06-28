<template>
  <div id="tjchild">
    <tj
      :dxlx="1"
      :idkey="'njid'"
      :rzy="[4,3,2]"
      :trname="'年级'"
      :showbg="true"
      :bbxs="1"
    >
      <div class="topPic"></div>
    </tj>  
  </div>
</template>

<script>
  import Tj from '@/views/components/tj.vue'
  import Mixin from '@/static/js/mixins.js'
  export default {
    components: {
      Tj
    },
    mixins:[Mixin],
    data(){
      return { 
        selist:[]
      }
    }

  }
</script>

<style lang='less'>
  #tjchild { 
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    bottom:100px;
    .topPic { 
      background: url('~@/static/images/bj_bg.png') center center no-repeat;
      background-size: contain;
      height: 398px;
      width: 100%;
    }
  }
</style>