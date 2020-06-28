<template>
  <div 
    v-show="toastShow"
    id="Toast"
    @click="cancel"
  >
    <transition 
      name="fade"
      @after-leave="hide"
    >  
      <div 
        v-show="toastSwitch"
        class="Toast-container"
      >
        <span class="iconfont Toast-iconfont"> 
          &#xe640; 
        </span>
        <span 
          v-text="txt"
        ></span>
      </div>
    </transition> 
  </div>
</template>

<script>
  export default {
    data(){
      return { 
        txt:'sdsd',
        toastSwitch: false,
        toastShow: false
      }
    },
    created() { 
    },
    methods: { 
      show({txt="测试",duration=1000}={}) { 
        this.txt=txt
        this.toastShow = true;
        this.toastSwitch = true;
        this.timer =setTimeout(()=>{ 
          this.toastSwitch = false;
        },duration)
      },
      cancel() { 
        if(this.timer) { 
          clearTimeout(this.timer)
        }
        this.toastSwitch = false;
        this.txt='';
      },
      hide() { 
        this.toastShow = false;
      }
    }
  }
</script>

<style lang='less'>
  #Toast {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    z-index: 9999;
    .Toast-container { 
      padding: 10Px 15Px;
      position: absolute;
      top:50%;
      left:50%;
      background-color: rgba(0,0,0,0.5);
      border-radius: 10px;
      font-size: 16Px;
      color:#fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate3d(-50%,-50%,0);
      
    }
    .Toast-iconfont { 
      font-size: 36Px;
      margin-bottom: 10Px; 
    }
    
  }

.fade-enter-active {
  animation: bounce-in .2s;
}
.fade-leave-active {
  animation: bounce-in .2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(-50%, -50%, 0)  scale(0.4);
    opacity: 0.5;
  }
  100% {
    transform: translate3d(-50%, -50%, 0)  scale(1);
    opacity: 1;
  }
}
</style>