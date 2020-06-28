<template>
  <div class="bjDetail">
    <top-detail 
      :fz="true" 
      :height="214"
      :total-ygq="ygqrs" 
      :total-wgq="wgqrs"
      :cur-time="nowTime"
      @getTime="getTime"
    ></top-detail>
    <div class="wgqWrapper">
      <div class="headTitle">
        <div class="title">
          <span class="sprite"></span>  
          <span class="titleName">未归寝</span>
        </div>
      </div>  
      <ul class="nameList">
        <li 
          v-for="(item,index) in wgqmd" 
          :key="index"
          v-text="item"
        ></li>  
      </ul>    
    </div>
  </div>
</template>

<script>
  import TopDetail from '@/views/components/topDetail.vue'
  import roleData from "@/static/js/roleConfig.js";
  import {getBjgqtj} from '@/request/ssmj.js';
  import util from 'util'
  const ROLE = roleData.GLY_BZR;
  export default {
    components: {
      TopDetail
    },
    data(){
      return { 
        wgqmd:[],
        datailData:'',
        nowTime:'',
        ygqrs:0,
        wgqrs:0,
        userid:''
      }
    },
    computed:{ 
      isBzr() { //是否是管理员
        return this.GetQueryString("role") === ROLE;
      }
    },
    created() { 
      if(this.isBzr) { 
        window.AndoridBack = util.returnApp
      }
      this.init();
    },
    methods:{ 
      init() { 
        this.nowTime = this.$route.query.time || this.GetQueryString('rq');
        if(sessionStorage.getItem('detailData')) { //年级长或
          this.datailData = JSON.parse(sessionStorage.getItem('detailData'));
          this.dealFn(this.datailData);
        } else { 
          this.datailData = {}
          this.datailData.bjid = '';
          this.userid = this.GetQueryString('userid');
          this.getBjgqtjFn();
        }
      },
      dealFn(detailData) { 
        console.log(detailData)
        this.ygqrs = parseInt(detailData.ygqrs);
        this.wgqrs = parseInt(detailData.wgqrs);
        this.wgqmd = detailData.wgqmd.split(',');
      },
      getTime(value) { 
        this.nowTime = value;
        this.getBjgqtjFn();
      },
      getBjgqtjFn() { 
        getBjgqtj(this.datailData.bjid,this.nowTime,this.userid)
        .then((data)=>{ 
          var _data = data[this.datailData.bjid];
          var targetData = Object.assign(_data,{ 
            wgqrs:data.wgqzs,
            ygqrs:data.ygqzs,
          })
          console.log(targetData)
          this.dealFn(targetData);
        })
      }
    }

  }
</script>

<style lang='less'>
  .bjDetail { 
    .wgqWrapper { 
      min-height: 146px;
      padding: 0 30px;
      background-color: #fff;
      border-top: 20px solid #f6f6f6;
    }
    .nameList { 
      display: flex;
      flex-wrap: wrap;
      li { 
        font-size: #666;
        font-size: 28px;
        margin-right: 20px;
        margin-bottom: 30px;
      }
    }
  }
</style>