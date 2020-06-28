<template>
  <div id="index">
    <div class="topPartWarrper">
      <div class="topWrapper">
        <div class="topSel">
          <div 
            class="leftSel"
            @click="open"
          >
            <span v-text="curWeek"></span>
            <img 
              src="~@/static/images/more.png" 
              class="more"
            >
          </div>
          <div 
            class="rightYe"
            v-text="`余额：${balance}`"
          ></div>
        </div>
        <div class="content">
          <p class="xfkey">
            本周消费总金额（元）
          </p>
          <p 
            class="xfval"
            v-text="totalConsum"
          ></p>
        </div>
      </div>
    </div>
    <div class="chartWrapper">
      <h-chart :options="chartOptions"></h-chart>
    </div>
    <section class="consumption-details-wrapper">
      <div class="title">
        <span class="titleH">消费明细</span>
      </div>
      <ul class="details">
        <li 
          v-for="(item,index) in weekConsumList"
          :key="index"
        >
          <div class="liTop">
            <div 
              class="liKey"
              v-text="item.feename"
            ></div>
            <div 
              class="time"
              v-text="item.dealtime"
            ></div>
          </div>
          <div 
            class="liVal"
            :class="getClass(item.mondeal)"
            v-text="item.mondeal"
          ></div>
        </li>
      </ul>
    </section>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
    >
      <ul 
        class="selectWrapper"
      >
        <li 
          v-for="(item,index) in actions"
          ref="actionsLi"
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
  import {queryXfmx} from '@/request/xfmx.js';
  import {Chart} from 'highcharts-vue'
  import weekObj from '@/static/js/week.js'
  import { Popup } from 'mint-ui';
  export default {
    components:{ 
      'h-chart': Chart,
       'mt-popup':Popup 
    },
    data(){
      return {
        consumptionDetails:[],
        chartOptions: {
          chart: { type: 'column', height: 160, width: 340 },
          colors: ['#388CFF'],
          title: {
            text: '周消费对比',
            align:'left',
            style:{
              fontSize:'14px',
              color:'#333'
            }
          },
          tooltip:{ 
            enabled:false
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              pointWidth: 30,
              dataLabels:{ 
                enabled:true
              }
            },

          },
          credits: {
              enabled: false
          },
          legend:{ 
            enabled:false
          },
          xAxis: {
            categories: [],
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: '金额'
            }
          },
          series: [{
            data: []
          }]
        },
        weekConsumList:[],
        totalConsum:'',
        balance:'',
        popupVisible:false,
        actions:[],
        acIndex:0
      }
    },
    computed:{ 
      curWeek() { 
        return '第'+weekObj[this.acIndex+1]
      }
    },
    created() { 
      this.init();
    },
    methods:{ 
      initWeek(weekCount) { 
        var count = 1;
        while(count<=weekCount) { 
          this.actions.push({count,name:`第${weekObj[count]}`})
          count++
        }
        this.initWeek = null;
      },
      open() { 
        this.popupVisible = true;
        setTimeout(()=>{ 
          this.$refs.actionsLi[this.acIndex].scrollIntoView();
        },20)
      },
      init(week) { 
        var _week = week?week:this.GetQueryString('week')
        queryXfmx(_week)
        .then(data=>{ 
          this.weekConsumList = data.weekConsumList;
          this.totalConsum = data.totalConsum;
          this.balance = data.balance;
          this.acIndex = data.curWeek*1-1;
          this.initWeek && this.initWeek(data.weekCount*1)
          var _consumStatistics = Object.keys(data.consumStatistics);
          var _data = [];
          _consumStatistics = _consumStatistics.map((el,index)=>{ 
            _data[index] = data.consumStatistics[el]
            return weekObj[el]
          })
          this.chartOptions.xAxis.categories = _consumStatistics
          this.chartOptions.series[0].data = _data
        })
      },
      sel(index) { 
        this.acIndex = index;
        this.init(this.acIndex+1);
        this.popupVisible = false;
      },
      getClass(str) { 
        if(str) { 
          return str.indexOf('+')>=0?'add':'reduce'
        } else { 
          return ''
        }
      }
    }
  }
</script>

<style lang='less'>
 #index { 
   padding-top: 30px;
   .mint-popup-bottom { 
     width: 100%;
   }
 }
  .chartWrapper { 
    padding: 0 30px;
    margin-top: 30px;
  }
 .topPartWarrper { 
   width: 100%;
   padding: 0 30px;

   .topWrapper { 
      width: 100%;
      height: 240px;
      border-radius: 20px;
      padding: 30px;
      background-color: #E9F7FF;
   }
   .topSel { 
     display: flex;
     justify-content: space-between;
   }
   .more { 
     width: 23px;
     margin-left: 5px;
   }
   .xfkey { 
     font-size: 28px;
     color:#333;
   }
   .xfval { 
     font-size: 70px;
     color:#388CFF;
     margin-top: 28px;
   }
   .content { 
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     margin-top: 28px;
   }
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

 .consumption-details-wrapper {
    .title { 
      position: relative;
      height: 40px;
      background: url('~@/static/images/division2.png') 0 0 no-repeat;
      background-size: 100% 10px;
      background-position: center center;
      text-align: center;
      .titleH { 
        color: #388CFF; 
        font-size: 36px; 
        font-weight: 500; 
        text-align: center;
        background-color: #fff;
        height: 100%;
        display: inline-block;
        padding: 0 30px;
      }
    }

    .details { 
      margin-top: 8px; 
      padding: 0 30px;
      li { 
        display: flex; 
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        .bd(#ddd,'bottom');
      }
      .behavior { 
        color: #666; 
        font-size: 14px;
       }
      .time { 
        color: #999; 
        font-size: 24px; 
        margin-top: 16px;
      }
      .data { 
        color: #F2276F; 
        font-size: 14px; 
        margin-left: auto; 
      }       
      .data.active { 
        color: #388CFF; 
      }
    }
    .liTop { 
      display: flex;
      flex-direction: column;
      color:#666;
      justify-content: space-between;
    }
    .liKey { 
      font-size: 28px;
      color:#666;
    }
    .liVal { 
      font-size: 34px;
    }
    .reduce { 
      color:#F2276F;
    }
    .add { 
      color:#388CFF;
    }
  }
</style>