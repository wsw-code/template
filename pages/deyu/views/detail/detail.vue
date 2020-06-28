<template>
  <div id="detail">
    <div>
      <cell
        v-for="(item,index) in list"
        :key="index"
        :left-tp="tpArr[index%tpArr.length]"
        :left-txt="item.text"
        :fz-status="item.fzStatus"
        :fz="item.fz"
        :type="1"
        :fn="()=>{todf(item,index)}"
      ></cell>

      <div 
        v-show="!$route.query.fzStatus"
        class="mrBtn"
        :class="isMr==true?'active':''"
        @click="mrClick"
      >
        全部默认
      </div>
      <button 
        v-if="showWebSubmit"
        @click="submit"
      >
        提交
      </button>
      <!-- <df 
        v-if="dfshow"
        :curdata="curdata"
        @getfs="getfs"
      ></df> -->
    </div>
  </div>
</template>

<script>
  import {getDyTreePf} from '@/request/deyu';
  import {mapMutations} from 'vuex'
  import Cell from '@/views/render/cell.js';
  import Icon1 from '@/static/images/ico_evaldorm_1.png';
  import Icon2 from '@/static/images/ico_evaldorm_2.png';
  import Icon3 from '@/static/images/ico_evaldorm_3.png';
  import Icon4 from '@/static/images/ico_evaldorm_4.png';
  import Icon5 from '@/static/images/ico_evaldorm_4.png';
  var _Arr =  [Icon1,Icon2,Icon3,Icon4,Icon5];
  import {saveJc} from '@/request/deyu.js'
  export default {
    name:'Detail',
    components: { 
      Cell,
    },
    data(){
      return {
        
        tpArr: _Arr,
        dfshow: false,
        curIndex:0,
        title:'',
        isMr:false
      }
    },
    computed:{ 
      showWebSubmit() { 
        return  this.isDev 
      },
      isDev() { 
        return this.showBtn()
      },
      list() { 
        return this.$store.state.detailList;
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{ 
        vm.setHeadBtn();
      })
    },
    beforeRouteLeave (to, from, next) {
      this.setHeadButton(false);
      console.log(to)
      if(to.name != 'df') { 
        
        this.clearDetailList()
      }
      next()
    },
    watch: { 

    },
    created() { 
      this.init();
    },
    mounted() { 
      this.$bus.$on('getfs',(obj)=>{ 
        this.getfs(obj)
      })
    },
    methods: { 
      ...mapMutations([ 
      'dfObjChange',
      'setDetailList',
      'clearDetailList'
      ]),
      init() { 
        // debugger
        if(this.list) return
        getDyTreePf(this.$route.query).then(data=>{ 
          var _list = data.list[0].children;
          _list.forEach(el=>{ 
            if(el.picList) { 
              el.picList = el.picList.map(el=>el.path)
            }else { 
              el.picList = []
            }
          })
          this.setDetailList(_list);
        })
      },
      setHeadBtn() { 
        this.setHeadButton('提交',this.submit);
      },
      todf(obj,index) { //打分详情
        this.dfObjChange(obj);
        this.$router.push({name:'df',query:{curIndex:index}})
      },
      getfs(obj) { 
        var _list = Object.assign({},this.list);
        var _curObj = _list[this.curIndex];
        _curObj.fz = obj.fz;
        _curObj.bz = obj.bz;
        _curObj.fzStatus = true;
        _curObj.tabIndex = obj.tabIndex;
        if(_curObj.fz*1 !=0) { 
          this.isMr = false;
        }
        this.setDetailList(_list);
      }, 
      submit() { 
        // debugger
        console.log(this.list);
        var _lsit = [...[],...this.list]
        console.log(this.lsit)
        console.log(_list)
        var _list = _lsit.map(el=>{ 
          if(!el.fzStatus) { 
            el.fzStatus = true;
            el.fz = 0;
            return el;
          } else {
            return el
          }
        })
        console.log(_list);
        // return
        const id = this.$route.query.dxid;
        const dxlx = this.$route.query.zblx;
        saveJc(dxlx,_list,[id]).then(()=>{ 
          // this.$store.commit('kjtsUpadte',true);
          this.vueBus.$emit('update');
          this.$msg('评价成功');
          window.history.go(-1);
        })
      },
      mrClick() { 
        this.isMr = true;
        this.list = this.list.map(el=>{ 
          el.fz = 0;
          el.fzStatus = true;
          el.bz = '无备注';
          el.isbj = 'isbj';
          return el
        })
      } 
    }
  }
</script>

<style lang='less'>
#detail { 
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9;
  top:0;
  left: 0;
  .mrBtn { 
    width:162px;
    height:58px;
    border:2px solid #35A3DD;
    border-radius:28px;
    color:#35A3DD;
    text-align: center;
    line-height: 58px;
    margin: 100px auto;
    &.active { 
      background-color: #EFEFEF;
      color:#999999;
      border:0px;
    }
  }
}  
</style>