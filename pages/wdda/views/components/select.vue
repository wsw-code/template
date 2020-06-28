<template>
  <div id="select">
    <input 
      v-model="val"
      type="text" 
      class="commonInput"
      :class="ableBj?``:`unableText`"
      readonly="true"
      :placeholder="placeholder"
      @click="openAction"
    >
    <span 
      v-show="isArrow"
      class="iconfont" 
    >
      &#xe612;
    </span>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
    >
      <div class="selCell topTitle">
        <button 
          class="cancel"
          @click="cancel"
        >
          取消
        </button>
        <div 
          class="title"
          v-text="selectTitle"
        ></div>
      </div>
      <ul 
        class="selectWrapper"
      >
        <li 
          v-for="(item,index) in actions"
          :key="index"
          class="selCell"
          :class="acIndex==index?'active':''"
          @click="sel(index)"
          v-text="item.name"
        ></li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
import Mixin from '@/static/js/mixins'
import { Popup } from 'mint-ui';
export default {
  name: 'Swselect',
  components: { 
    'mt-popup':Popup 
  },  
  mixins:[Mixin],
  data(){ 
    return { 
      popupVisible: false,
      actions: [],
      indexObj:{},
      acIndex:-1
    }
  },
  computed: { 
    selectTitle() { 
      return this.zd.zdmc
    }
  },
  created() { 
    this.initActions();
  },
  mounted() { 
    if(this.mapVal) { 
      this.acIndex = this.indexObj[this.mapVal];
    }
  },  
  methods: { 
    initActions() { 
       let _arr = this.zd.csz.split(',');
       this.actions = _arr.map((name,index)=>{ 
        this.indexObj[name] = index;
         return { 
           name
         }
       })
    },
    cancel() { 
      this.popupVisible = false;
    },
    openAction() { 
       this.popupVisible = true; 
    },
    sel(index) { 
      this.acIndex = index;
      this.val = this.actions[index].name;
      this.$emit('input',this.val);
      this.cancel();
    }
  },

}
</script>
<style lang='less'>
#select { 
  .mint-popup { 
    width: 100%;
  }
  .topTitle { 
    position: relative;
    color:#333;
    font-size: 32px;
  }
  .cancel { 
    height: 100px;
    background-color: #fff;
    font-size: 28px;
    color:#999;
    line-height: 100px;
    position: absolute;
    z-index: 1;
    left:30px;
    top:0;
  }
  .selectWrapper { 
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    background-color: #fff;
    &::-webkit-scrollbar {
      width: 4Px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #388CFF;
    }
    &::-webkit-scrollbar-track { 
      background-color: #dedede;
    }
  }
  .selCell {
    height: 100px;
    line-height: 100px;
    text-align: center;
    .bd(#ddd,'bottom');
    &.active { 
      color:#388CFF;
    }
  }
}
</style>
