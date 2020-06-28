<template>
  <div class="cellWrapper">
    <div class="head">
      <img 
        :src="icon" 
        class="img"
      >
      <div 
        class="title" 
        v-text="title"
      >
      </div> 
    </div> 
    <div 
      v-if="type==2"
      class="container"
      v-text="nr"
    >
    </div>
    <div 
      v-else
      class="container"
      v-text="nr"
    >
    </div>    
  </div>
</template>

<script>
  import bj from '@/static/images/bj.png';
  import ss from '@/static/images/ss.png';
  export default {
    props:{ 
      title:{ 
        type:String,
        default:''
      },
      nr:{ 
        type:String,
        default:''        
      },
      type:{ 
        type:Number,
        default:1
      }
    },
    data(){
      return { 
      }
    },
    computed:{ 
      icon() { 
        return this.type == 1?bj:ss;
      }
    },
  }
</script>

<style lang='less'>
  .cellWrapper { 
    width: 100%;
    min-height:340px;
    border-radius: 20px;
    background-color:#fff;
    background:url('~@/static/images/yun.png') right bottom no-repeat;
    background-size: 112px 129px;
    box-shadow:0Px 5Px 20Px rgba(56,140,255,0.3);
    & + .cellWrapper { 
      margin-top: 60px;
    }
    .img { 
      width: 32px;
    }
    .title { 
      font-size: 32px;
      color:#666;
      margin-left: 10px;
    }
    .head { 
      height: 80px;
      .bd(#ddd,'bottom');
      display:flex;
      padding: 0 30px;
      align-items:center;
    }
    .container { 
      min-height: 260px;  
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 80px;
      color:#388CFF;
      font-size: 60px;
      padding: 30px;
      // text-align: center;
    }
  }
</style>