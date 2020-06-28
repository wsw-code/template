<template>
  <div id="textarea">
    <div 
      v-show="able"
      class="abStutas"
    >
      <div 
        ref="textareaDiv"
        contenteditable="true"
        class="textarea needsclick"
        :class="ableBj?``:`unableText`"
        @input="getVal($event)"
      ></div>
      <div 
        class="numLim"
      >
        <span v-text="curNum"></span>/ <span v-text="maxNum"></span>  
      </div>
    </div>
    <div 
      v-show="!able"
      class="value"
      v-text="showTextAreaVal"
    ></div>
  </div>
</template>

<script>
  import Mixin from '@/static/js/mixins'
  export default {
    name: 'Tacell',
    mixins:[Mixin],
    props: { 
      maxNum:{ 
        type:Number,
        default: 500
      }
    },
    data(){
      return { 
        curNum:0
      }
    },
    computed: {
      showTextAreaVal() { 
        return this.val?this.val:'--'
      } 
    },
    created() { 
      console.log(this.val);
    },
    mounted() { 
      setTimeout(()=>{ 
        this.$refs.textareaDiv.innerText = this.val;
      },20)
    },
    methods: { 
      getVal(e) { 
        var _val = e.target.innerText;
        if(_val.length>this.maxNum) { 
          _val = _val.substr(0,this.maxNum)
        }
        this.curNum = _val.length;
        this.$emit('input',_val);
      },
      needShow(val) { 
        this.val = val;
        this.curNum = this.val.length;
        this.needShow = function(){};
      }
    }
  }
</script>

<style lang='less'>
  #textarea { 
    width: 100%;
    margin-top: 30px;
    .value { 
      word-break: break-all;
      line-height:46px;
    }
  }
  .abStutas { 
    width: 100%;
    min-height: 300px;
    padding: 30px;
    border-radius: 10px;
    border: 1Px solid #ddd;
  }
  .textarea { 
    outline: none;
    resize: auto;
    border-radius: 4px;
    line-height:46px;
    font-size: 28px;
    min-height: 46px;
    padding: 0 10px;
    font-size: 32px;
    color:#333;
    min-height: 200px;
    
  }
  .numLim { 
    text-align: right;
  }
</style>
