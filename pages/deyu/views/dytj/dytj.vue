<template>
  <div id="dytj">
    <ul class="tab">
      <li
        v-for="(value,key,index) in tablist"
        :key="index"
        class="tabLi"
        :class="tabIndex == key?'active':''"
        @click="tab(key)"
        v-text="value.txt"
      ></li>
    </ul>
    <div
      v-for="(value,key,index) in tablist"
      v-show="tabIndex == key"
      :key="index"
      class="tjWrapper"
    >
      <tj 
        :rzy="value.rzy"
        :idkey="value.idkey"
        :dxlx="value.dxlx"
        :refresh="tabIndex == key"
        :trname="value.trname"
        :pull="value.pull"
        :mybjlistshow="false"
      ></tj>  
    </div>
  </div>
</template>

<script>
  import Tj from '@/views/components/tj.vue'
  import {mapMutations} from 'vuex'
  import {tjUpdate} from '@/update.config.js';
  const updateArea = tjUpdate.updateArea;
  export default {
    name:'Dytj',
    components: {
      Tj
    },
    data(){
      return { 
        tablist:{
          'bj':{dxlx:1,txt:'班级德育',rzy:[4,3,2],idkey:'njid',trname:'年级',pull:false},
          'ss':{dxlx:2,txt:'宿舍德育',rzy:[3,2],idkey:'ssid',trname:'宿舍',pull:false},
          'xs':{dxlx:3,txt:'学生德育',rzy:[4,3,2],idkey:'bjid',trname:'姓名',pull:true}
        },
        tabIndex:'bj'
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.name != 'tjdetail') { 
        var _index = this.findIndex();
        var _arr  = [...this.keepPage];
        if(_index && _index>=0) { 
          _arr.splice(_index,1);
        }
        this.keepPageChange(_arr); 
      }
      next()
    },
    computed: { 
      keepPage() { 
        return this.$store.state.keepPage;
      }
    },
    created() { 
      this.initUpdate();
      this.keepFn();
    },
    methods: { 
      ...mapMutations([
        'keepPageChange'
      ]),
      initUpdate() { 
        console.log(updateArea)
        if(updateArea.indexOf(NODE_BASEINFO.area)>=0 || updateArea.indexOf(this.GetQueryString('area'))>=0) { 
          var _ss = this.tablist['ss'];
          _ss.rzy = [4,3,2];
          this.$set(this.tablist,'ss',_ss);
        }
      },
      keepFn() { 
        var _index = this.findIndex();
        var _arr  = [...this.keepPage];
        if(!_index) { 
          _arr.push('Dytj');
          this.keepPageChange(_arr);
        }
      },
      tab(key) { 
        this.tabIndex = key;
      },
      findIndex() { 
        var _index
        this.keepPage.some((el,index)=>{ 
          if(el =='Dytj') { 
            _index = index
            return true
          } 
        })
        return _index
      }
    }

  }
</script>

<style lang='less'>
  #dytj { 
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    .tjWrapper { 
      height: calc(100% - 100px);
    }
    .tab { 
      display: flex;
      height: 92px;
      align-items: center;
    }
    .tabLi { 
      display: flex;
      flex:1;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      height: 100%;
      color: #999;
      position: relative;
      .bd(#EFEFEF,'bottom');
      &.active { 
        color:#35A3DD;
        &:before { 
          content: '';
          position: absolute;
          left:0;
          bottom:0;
          width: 100%;
          border-bottom: 1Px solid #35A3DD;
        }
      }
    }
  }
</style>