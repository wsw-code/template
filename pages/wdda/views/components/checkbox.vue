<template>
  <div class="checkbox">
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
            v-model="valArr"
            type="checkbox" 
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
  name: 'Swcheckbox',
  components: { 
  },
  mixins:[Mixin],  
  data(){ 
    return { 
      csz: [],
      zdmc:'',
      valArr:[]
    }
  },
  watch:{
    valArr() {
      this.val = this.valArr.join(','); 
      this.$emit('input',this.val);
    }
  },
  created() { 
    this.initCsz();
  },
  mounted() { 

  },  
  methods: { 
    initCsz() { 
      this.csz = this.zd.csz.split(',');
      this.zdmc = this.zd.zdmc;
    },
    needShow(val) {
      this.valArr = val?val.split(','):[]; 
    },
  },

}
</script>
<style lang='less'>
.checkbox { 
  display: flex;
  flex-wrap: wrap;
  .radioWrapper { 
    display: flex;
    flex-wrap: wrap;
  }
  .rq { 
    width: 32px;
    height: 32px;
    position: relative;
    margin-left: 20px;
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
    color:#fff;
    z-index: 2;
  }
  .gouWrapper { 
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    font-size: 12Px;
    z-index: 6; 
    background-color: #ccc;
  }
  .radioInput { 
    .icon-gou;
    z-index: 3;
    appearance: normal;
    font-size: 12Px;
    &:checked + .gouWrapper { 
      color: #fff;
      background-color: #388CFF;
    }
  }
  .radioTxt { 
    height: 50px;
    line-height: 50px;
  }
}
</style>
