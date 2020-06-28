<template>
  <div id="index">
    <div class="head">
      <div 
        class="time"
        @click="open"
      >
        <span v-text="date"></span>
        <img
          class="more" 
          src="~@/static/images/more.png"
        >
      </div>
      <div class="gqdetial">
        <span>应归寝:</span>
        <span v-text="ygqzs"></span>
      </div>
    </div>
    <div class="headTitle">
      <div class="title">
        <span class="sprite"></span>  
        <span class="titleName">学生归寝情况</span>
      </div>
      <ul class="gqTab">
        <li 
          :class="zt == '1'?'active':''"
          @click="changeZt('1')"
        >
          已归寝
        </li>
        <li
          :class="zt == '0'?'active':''"
          @click="changeZt('0')"
        >
          未归寝
        </li>
      </ul>
    </div>
    <div class="searchBox">
      <div class="searchWrapper">
        <img src="~@/static/images/search.png">
        <input 
          v-model="xm"
          type="text" 
          placeholder="请输入姓名关键字"
          @input="changeXm()"
        >
      </div>
    </div>
    <div class="searchResult">
      <Scroll
        ref="scroll"
        :data="list"
        @pullingUp="loadmore"
      >
        <ul
          slot="sroll" 
          class="searchScroll"
        >
          <li 
            v-for="(item,key) in list"
            :key="key"
            :class="getClass(item)"
            class="searchCell" 
            @click="changeGqZt(item,key)"
          >
            <span v-text="item.xm"></span>
            <span 
              class="bj"
              v-text="`${item.njmc}${item.bjmc}`"
            ></span>
          </li>
        </ul>
      </Scroll>
    </div>
    <mt-datetime-picker
      ref="picker"
      v-model="selDate"
      :end-date="curDate"
      type="date"
      @confirm="confirm"
    >
    </mt-datetime-picker>
  </div>
</template>
<script>
  import {getXsgqtj,saveXsgq} from '@/request/mjcx.js';
  import Scroll from '@/views/base/yscroll.vue';
  import { DatetimePicker } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    components:{ 
      Scroll,
      "mt-datetime-picker":DatetimePicker,
    },
    data(){
      return {
        date:'',
        selDate:'',
        zt:'1',
        xm:'',
        isGq:true,
        page:1,
        rows:100,
        ygqzs:0,
        list:[]
      }
    },
    computed:{ 
      curDate() { 
        return new Date();
      }
    },
    created() { 
      this.date = this.createDate();
      this.selDate = this.curDate;
      this.init('',false);
    },
    methods:{ 
      confirm(val) { 
        this.date = this.createDate(val);
        this.init(this.clearData);
      },
      getClass(item) { 
        if(item.hasOwnProperty('isGq')) { 
          return item.isGq?'':'wgq'
        } else { 
          return this.isGq?'':'wgq'
        }
        
      },
      open() { 
        this.$refs.picker.open();
      },
      loadmore() { 
        this.page++;
        this.init('',false);
      },
      changeGqZt(item) { 
        if(this.date != this.createDate(new Date())) { 
          this.$toast('只能更改当天的归寝情况')
          return 
        }
        MessageBox.confirm(`确定更改 <span class="blue">${item.xm}</span> 的归寝状态?`,'').then(() => {
          this.changeXsGqZt(item.xsid)
          .then(()=>{ 
            // var _obj = item;
            // _obj.isGq = this.isGq?false:true;
            // this.$set(this.list,index,_obj)

            this.resetStatus();
            this.init(this.clearData);
          })
        });
        
      },
      changeXsGqZt(xsid) { 
        var zt = this.isGq?'0':'1';
        return saveXsgq([xsid,zt,this.date])
      },
      init(fn,loading=true) { 
        getXsgqtj({date:this.date,zt:this.zt,xm:this.xm,page:this.page,rows:this.rows},loading)
        .then(data=>{ 
          fn && fn();
          this.totalCount = data.totalCount;
          this.ygqzs = data.ygqzs;
          this.list = [...this.list,...data.rows];
          this.isGq = this.zt == '1'?true:false
          if(this.totalCount == this.list.length) { 
            this.$refs.scroll.closePullUp();
          }
          this.$refs.scroll.finishPullUp();
        })
      },
      clearData() { 
        this.list = [];
        this.$refs.scroll.scrollTo(0,0,-1);
        this.$refs.scroll.resetFn();
      },
      createDate(dateObj=this.curDate) { 
        var year = dateObj.getFullYear();
        var mounth = dateObj.getMonth()+1+'';
        var date = dateObj.getDate()+'';
        return `${year}-${mounth.padStart(2,0)}-${date.padStart(2,0)}`
      },
      changeXm() { 
        clearTimeout(this.timer);
        this.resetStatus();
        this.timer = setTimeout(() => {
          this.clearData();
          this.$refs.scroll.scrollTo(0,0,-1);
          this.init();
        }, 500);
      },
      resetStatus() { 
        this.page = 1;
      },
      changeZt(zt) { 
        this.zt = zt;
        this.resetStatus();
        this.init(this.clearData);
      }
    }
  }
</script>

<style lang='less'>

.searchResult { 
  padding: 0 30px;

  height: calc(100% - 296px);
  color:#666;
  .bj { 
    margin-top: 10px;
    color:#999;
    font-size: 26px;
  }
  .searchScroll { 
    display: flex;
    flex-wrap: wrap;
  }
}
.blue { 
  color:#388CFF;
}
.searchCell { 
  width: 210px;
  min-height: 100px;
  padding: 10px 0;
  border-radius:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1Px solid #9CC6FF;
  margin-right: 30px;
  margin-bottom: 30px;
  &:nth-child(3n) { 
    margin-right: 0;
  }
  &.wgq { 
    background-color: #efefef;
    border: 0px;
  }
}

.searchBox { 
  padding: 0 30px;
  margin-bottom: 30px;
  .searchWrapper { 
    width:100%;
    height: 70px;
    border: 1Px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  img { 
    max-width:34px;
    height: 34px;
  }
  input { 
    width: 100%;
    padding-left: 20px;
  }
}
 #index { 
  height: 100%; 
  .head { 
    width: 100%;
    height: 80px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F4F4F4;
  }
  .time { 
    height: 80px;
    display: flex;
    align-items: center;
    color:#333;
  }
  .more { 
    width: 23px;
  }
  .gqdetial { 
    color:#666;
  }
  .headTitle { 
    display: flex;
    margin: 30px 0;
    padding: 0 30px;
    justify-content: space-between;
    .title { 
      font-size: 32px;
      color:#333;
      display: flex;
      align-items: center;
    }
    .sprite { 
      width: 6px;
      height: 30px;
      margin-right: 15px;
      background:linear-gradient(0deg,rgba(250,208,79,1),rgba(253,168,68,1));
      border-radius:2px;
    }

  }
  .gqTab { 
    width: 240px;
    overflow: hidden;
    display: flex;
    li:nth-child(1) { 
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    li:nth-child(2) { 
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    li { 
      width: 50%;
      padding: 10px 0;
      text-align: center;
      border: 1Px solid #388CFF;
    }
    li.active { 
      background-color: #388CFF;
      color:#fff;
    }
  }
 }
</style>