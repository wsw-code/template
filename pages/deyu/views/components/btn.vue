<template>
  <div
    v-if="funcsArr.length"
    v-drag
    class="addBtn"
    @click="openPop"
  >
    <div 
      v-if="funcsArr.length == 1"
      class="onlyBtn icTp"
      :class="btnObj[funcsArr[0].fid].iconClass"
      @click="todetail(btnObj[funcsArr[0].fid])"
    ></div>
    <div 
      v-if="funcsArr.length>=2"
      class="addIcon"
      :class="pop?'active':''"
    ></div> 
    <ul 
      v-show="pop" 
      class="btnUl"
    >  
      <li
        v-for="(item,index) in funcsArr"
        :key="index" 
        @click="todetail(btnObj[item.fid])"
      >
        <div 
          class="icTxt"
          v-text="btnObj[item.fid].txt"
        ></div>
        <div 
          class="icTp"
          :class="btnObj[item.fid].iconClass"
        ></div>
      </li>           
    </ul>
  </div>  
</template>

<script>
  import {getDyAppRoleFuncs} from '@/request/deyu';
  export default {
    data(){
      return { 
        pop: false,
        odiv:null,
        targetArr:[],
        btnObj:{ 
          'dyapp_50000101':{txt:'德育统计',name:'dytj',iconClass:'ic1'},
          'dyapp_50000102':{txt:'宿舍评比',name:'sspj',iconClass:'ic2'},
          'dyapp_50000103':{txt:'班级评比',name:'bjpj',iconClass:'ic3'},
          'dyapp_50000104':{txt:'表彰/评价',name:'bop',iconClass:'ic4'},
          'dyapp_50000105':{txt:'评分明细',name:'pfmx',iconClass:'ic5'},
        },
        funcsArr:[]  
      }
    },
    computed: {
      role() { 
        return this.$store.state.GLOBAL_ROLE;
      },
      isbz() { //是否可以进行班级表彰
        if(this.role == 'SUPER_BZR' || this.role == 'SUPER_RKJS' || this.role == 'XS') { 
          return false
        } else { 
          return true
        }
      }
    },
    created() { 
      this.initbtnObj();
      this.init();
    },
    methods: { 
      init() { 
        getDyAppRoleFuncs().then(data=>{ 
          this.funcsArr = data.rows;
          if(!this.funcsArr.length) { 
            // this.funcsArr = [{fid:'dyapp_50000101'},{fid:'dyapp_50000102'},{fid:'dyapp_50000103'},{fid:'dyapp_50000104'}]
          }
        })
      },
      initbtnObj() { 
        if(!this.isbz) { 
          this.$set(this.btnObj,'dyapp_50000104',{txt:'评价',name:'bop',iconClass:'ic4',type:'pj'})
        }
      },
      todetail(obj) { 
        var {name,type} = obj;
        var pushObj = type?{name,query:{type}}:{name}
        this.$router.push(pushObj);
      },
      openPop() { 
        if(this.funcsArr.length == 1) { 
          return 
        }
        this.pop = !this.pop;
        this.openZz();
      },
      openZz() { 
        this.odiv = document.createElement("div");
        this.odiv.className = 'popupWrapper';
        document.body.appendChild(this.odiv);
        this.openZz = this.switch;
        this.odiv.addEventListener('click',()=>{
          this.openPop();
        })
      },
      switch() { 
        this.odiv.style.display = this.pop?'block':'none';
      }
    },
  }
</script>

<style lang='less'>
  .addBtn { 
    width: 100px;
    height: 100px;
    border-radius: 50%;
    color:#fff;
    background-color: #35A3DD;
    font-size: 60px;
    position: fixed;
    right: 15Px;
    bottom: 65Px;
    z-index: 22;
    .addIcon { 
      width: 100%;
      height: 100%;
      position: absolute;
      left:0;
      top:0;
      transition: all 0.3s;
      &.active { 
        transform: rotateZ(45deg);
      }
      &:before { 
        width: 45%;
        height: 3px;
        background-color: #fff;
        content: '';
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin: auto;
      }
      &:after { 
        width: 45%;
        height: 3px;
        background-color: #fff;
        content: '';
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin: auto;
        transform: rotateZ(90deg)
      }
    }
    
  }
  .icTp { 
    width: 100px;
    height: 100px;
    background-image: url('~@/static/images/ic4.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #333;
    border-radius: 50%;
    background-size: 50%;
  }
  .icTxt { 
    white-space: nowrap;
    position: absolute;
    top:35%;
    left:-140px;
    font-size: 28px;
    width: 120px;
    text-align: right;
    
  }

  .btnUl { 
    position: absolute;
    transform: translate3d(0,-100%,0);
    left: 0;
    li { 
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 30px;
    }
  }

  .ic1 { 
   background-image: url('~@/static/images/ic1.png'); 
  }

  .ic2 { 
    background-image: url('~@/static/images/ic2.png');
  }

  .ic3 { 
    background-image: url('~@/static/images/ic3.png');
  } 

  .ic5 { 
    background-image: url('~@/static/images/ic5.png');
  } 

  .popupWrapper { 
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 1;
  }
  .onlyBtn { 
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #35A3DD;
  } 
</style>