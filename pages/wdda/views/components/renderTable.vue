<template>
  <table 
    v-show="tabledata.length>0"
    class="tableRender" 
  >
    <tr>
      <td
        v-for="(item,index) in showZd"
        :key="index"
        v-text="item.zdmc"
      ></td>
    </tr>
    <tr 
      v-for="(cell,cellIindex) in tabledata"
      :key="cellIindex"
    >
      <td 
        v-for="(tdcell,tdindex) in showZd" 
        :key="tdindex"
        @click="todetail(cellIindex)"
        v-text="getVal(cell,tdcell)"
      >
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: { 
      tabledata: { 
        type: [Object,Array],
        default() { 
          return []
        }
      },
      zdList: { 
        type: [Object,Array],
        default() { 
          return []
        }
      }, 
      outKey: { 
        type: Number,
        default() { 
          return 0
        }
      },         
    },
    data(){
      return { 
        showZd:[]
      }
    },
    created() { 
      this.initZd();
    },
    methods: { 
      todetail(tdindex) {   
        this.$emit('fromtable',{'outKey':this.outKey,'tdindex':tdindex})
      },
      initZd() { 
        let _index = 0;
        this.zdList.some(el=>{
          if(['tx','pic'].indexOf(el.zdlx)<0) { 
            this.showZd.push(el)
            _index++;
          }
          if(_index>=4) { 
            return true
          }
        })
      },
      getVal(cell,tdcell) {
        var _zdid =  tdcell.zdid;
        if(tdcell.zdlx == 'date') { 
          return this.showDate(cell[_zdid]?cell[_zdid] : '');
        }
        return cell[_zdid]?cell[_zdid]:''
      }
    }
  }
</script>

<style lang='less'>
.tableRender { 
  width: 100%;
  margin-top: 30px;
  td { 
    border: 1Px solid #DDD;
    text-align: center;
    height: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}  
</style>