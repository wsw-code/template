<template>
  <div id="publish">
    <ul>
      <li class="publishCell">
        <span class="key">标题</span>
        <input
          v-model="title" 
          type="text" 
          placeholder="请输入标题(20字以内)"
        >
      </li>
      <li class="publishCell areaCell">
        <span class="key">内容</span>
        <textarea 
          v-model="content"
          class="textarea"
          placeholder="请输入内容"
        ></textarea>
      </li>
      <li class="publishCell">
        <span class="key">开始时间</span>
        <input 
          v-model="getStartTime"  
          type="text" 
          readonly
          @click="getStart"
        >
      </li> 
      <li class="publishCell">
        <span class="key">结束时间</span>
        <input
          v-model="getEndTime"  
          type="text"
          readonly
          @click="getEnd" 
        >
      </li>            
    </ul>
    <div class="btnWrapper">
      <button @click="save">保 存</button>
    </div>
    <DatetimePicker
      ref="picker"
      v-model="startTime"
      type="datetime"
    ></DatetimePicker>
    <DatetimePicker
      ref="epicker"
      v-model="endTime"
      type="datetime"
    ></DatetimePicker>
  </div>
</template>

<script>
  import { DatetimePicker } from 'mint-ui';
  import {saveTzgg} from '@/request/bpgl.js';
  export default {
    name:'Publish',
    components:{
      DatetimePicker
    },
    props:{ 
      ggdata:{
        type:Object,
        default() { 
          return {}
        }
      }
    },
    data(){
      return { 
        title:'',
        content:'',
        startTime:'',
        endTime:'',
        id:''
      }
    },
    computed:{
      getStartTime() { 
        if(this.startTime) { 
          return this.getTimeFormat(this.startTime) 
        } else {
          return ''
        }
      },
      getEndTime() { 
        if(this.endTime) { 
          return this.getTimeFormat(this.endTime) 
        } else {
          return ''
        }        
      }
    },
    watch:{ 
      title() { 
        this.title = this.title.substr(0,20); 
      }
    },
    mounted() { 
      if(this.ggdata.id) { 
        this.initEdit(this.ggdata)
      } else { 
        this.initDate()
      } 
    },
    methods:{
      initEdit(data) { 
        this.startTime = data.kssj;
        this.endTime = data.jssj;
        this.title = data.title;
        this.content = data.content;
        this.id =data.id;
      },
      getTimeFormat(dateObj) { 
        if(typeof dateObj == 'string') return '' 
        var year = dateObj.getFullYear();
        var mounth = this.padStart(dateObj.getMonth()*1+1);
        var dates = this.padStart(dateObj.getDate());
        var hours = this.padStart(dateObj.getHours());
        var minutes = this.padStart(dateObj.getMinutes()); 
        var seconds = this.padStart(dateObj.getSeconds()); 
        return `${year}-${this.padStart(mounth)}-${dates} ${hours}:${minutes}:${seconds}`
      },
      
      initDate() { 
        var dateObj = new Date();
        var _year = dateObj.getFullYear();
        var _month = this.padStart(dateObj.getMonth()*1 + 1);
        var _date = this.padStart(dateObj.getDate());
        this.startTime = `${_year}-${_month}-${_date} 00:00:00`
        this.endTime = `${_year}-${_month}-${_date} 23:59:59`
      },
      getStart() { 
        this.$refs.picker.open();
      },
      getEnd() { 
        this.$refs.epicker.open();
      },
      save() { 
        if(!this.title) { 
          this.$toast('请输入标题')
          return 
        }
        if(!this.content) { 
          this.$toast('请输入标题')
          return 
        }
        if(this.startTime.getTime() > this.endTime.getTime()) { 
          this.$toast('开始时间不能小于结束时间')
          return
        }
        saveTzgg([
          {
            id:this.id,
            title:this.title,
            content:this.content,
            kssj:this.getStartTime,
            jssj:this.getEndTime,
            type:'2'
          },
          [this.$route.query.macdz]
        ])
        .then((data)=>{ 
          this.$toast('操作成功');
          window.history.go(-1);
          this.$emit('update')
        })      
      }
    }
  }
</script>

<style lang='less'>
  #publish { 
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    top:0;
    left:0;
    background-color: #fff;
    .btnWrapper { 
      padding: 30px;
      width:100%;
      position: absolute;
      bottom:0;
      left:0;
      button { 
        width: 100%;
        height: 90px;
        background:linear-gradient(90deg,rgba(56,140,255,1) 0%,rgba(11,197,254,1) 100%);
        border-radius:45px;
        color:#fff;
        text-align: center;
        line-height: 90px;
        font-size: 36px;
      }
    }
  }
  .publishCell { 
    display: flex;
    align-items: center;
    min-height: 100px;
    padding: 0 30px;
    &.areaCell { 
      flex-direction: column;
      align-items: flex-start;
      padding: 30px;
    }
    .bd(#ddd,'bottom');
    input { 
      padding-left: 40px;
    }
    .textarea { 
      width: 100%;
      height: 300px;
      margin-top: 30px;
    }
    .key {
      color:#333;
      font-size: 28px;
    }
  }
</style>