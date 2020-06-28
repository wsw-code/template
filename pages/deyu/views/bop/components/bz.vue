<template>
  <div class="bz"> 
    <div class="bzpj">
      <textarea 
        v-model="bz"
        placeholder="评价内容(选填)"
        class="textarea"
      ></textarea>
      <div 
        class="towho"
        @click="open"
      >
        <span class="toIcon">@</span>
        <span class="toTxt">表彰班级</span>
        <span 
          v-for="(item,index) in sendName"
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
    <delist
      v-if="show"
      v-model="searchTxt"
      :delist="bjlist"
      :max-len="maxLen"
      @close="show=false"
    >
      <li>
        <label 
          v-for="(item,index) in bjlist"
          :key="index"
          :search-tip="'搜索班级'"
          class="deLi needsclick"
        >
          <div class="leftPart">
            <span
              class="lTxt"
              v-text="item.njmc"
            ></span>
            <span v-text="item.bjmc"></span>
          </div>
          <div class="rightIcon">
            <input 
              v-model="checkArr"
              type="checkbox" 
              :value="{'bjid':item.bjid,'mc':item.njmc+item.bjmc}"
            >
            <div class="pic"></div>
          </div>
        </label>
      </li>
    </delist>
    <button 
      v-if="showBtn()"
      @click="submit"
    >
      提交
    </button> 
  </div>
</template>

<script>
  import delist from './delist.vue'
  import Mixin from '@/views/bop/mixins/bzpjMixins.js';
  import {queryRyList,getBjByXX,addBjRyJl} from '@/request/deyu'
  export default {
    name:'Bz',
    components: {
      delist,
    },
    mixins:[Mixin],
    data(){
      return {
        allList:[],
        list:[],
        bjlist:[],
        selIndex:0,
        sendArr:[],
        checkArr:[],
        show: false,
        bz:'',
        searchTxt:'',
        showLen:200,
        pagesShowLen:200,
        maxLen:0
      }
    },
    computed: { 
      sendName() { 
        return this.checkArr.map(el=>{ 
          return el.mc
        })
      },
    },
    watch: { 
      searchTxt() { 
        if(!this.searchTxt) { 
          this.cancel();
          return 
        }
        this.bjlist = this.allList.filter(el=>{ 
          var _mc = `${el.njmc}${el.bjmc}`;
          return _mc.indexOf(this.searchTxt)>=0
        })
      }
    },
    created() { 
      this.getRyList();
      this.getbjList();
    },
    methods: { 
      cancel() { 
        this.bjlist = [...this.allList];
      },
      getRyList() { 
        queryRyList('',-1,-1).then(data=>{ 
          this.list = data.rows;
        })
      },
      getbjList() { 
        getBjByXX().then(data=>{ 
          this.bjlist = data.rows;
          this.allList = [...this.bjlist];
        })
      },
      open() { 
        if(!this.bjlist.length) { 
          this.cancel();
        }
        this.show = !this.show
      },
      sel(item,index) { 
        this.selIndex = index;
      },
      submit(){ 
        if(this.checkArr.length == 0) { 
          this.vmsg('','请选中表彰班级');
          return 
        }
        var bjIds = this.checkArr.map(el=>{ 
          return el.bjid;
        })
        var ryIds = [this.list[this.selIndex].id];
        addBjRyJl(bjIds,ryIds,this.bz).then(()=>{ 
          this.checkArr = [];
          this.$store.commit('kjtsUpadte',true);
          window.history.go(-1);
        })
      }
    },


  }
</script>

<style lang='less'>
  .bz { 
    input { 
      appearance: none;
      opacity: 0;
    }
  }
</style>