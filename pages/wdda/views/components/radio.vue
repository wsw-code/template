<template>
  <div id="radio">
    <div 
      v-show="ableBj"
      class="radioWrapper"
    >
      <label 
        v-for="(item,key) in csz" 
        :key="key"
        class="labelWrapper"
      >
        <span v-text="item"></span>
        <div class="rq">
          <input 
            v-model="val"
            type="radio" 
            :name="zdmc"
            class="radioInput"
            :value="item"
          >
          <span class="gouWrapper">
            <span class="iconfont icon-gou">&#xe607;</span>
          </span>
        </div>
      </label>
    </div>
    <div
      v-show="!ableBj"
      class="radioTxt" 
      v-text="val"
    ></div>
  </div>
</template>
<script>
import Mixin from '@/static/js/mixins'
export default {
  name: 'Swradio',
  components: { 
  },
  mixins:[Mixin],  
  data(){ 
    return { 
      csz: [],
      zdmc:'',
    }
  },
  watch:{ 
    val() { 
      this.$emit('input',this.val);
    }
  },
  created() { 
    this.init();
  },
  mounted() { 

  },  
  methods: { 
    init() { 
      this.csz = this.zd.csz.split(',');
      this.val = this.value || this.csz[0];
      this.zdmc = this.zd.zdmc;
    }
  },

}
</script>
<style lang='less'>
#radio { 
  display: flex;
  flex-wrap: wrap;
  .radioWrapper { 
    display: flex;
    flex-wrap: wrap;
  }
  .rq { 
    width: 32px;
    height: 32px;
    line-height: 32px;
    position: relative;
    margin-left: 20px;
    text-align: center;
    border-radius: 50%;
    .iconfont { 
      color:#fff;
      font-size: 12Px;
    }
  }
  .labelWrapper { 
    display: flex;
    align-items: center;
    margin-right:40px;
    height: 50px;
    &>* { 
      pointer-events: none;
    }
  }
  .icon-gou { 
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    font-size: 32px;
    z-index: 2;
  }
  .gouWrapper { 
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    font-size: 32px;
    z-index: 6; 
    border-radius: 50%;
    background-color: #ccc;
  }
  .radioInput { 
    .icon-gou;
    z-index: 3;
    appearance: normal;
    &:checked + .gouWrapper { 
      background-color: #388CFF;
      color: #fff;
    }
  }
  .radioTxt { 
    height: 50px;
    line-height: 50px;
  }
}
</style>
