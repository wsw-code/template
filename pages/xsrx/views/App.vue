<template>
  <div id="app">
    <router-view></router-view>
    <div 
      v-show="show"
      class="loading" 
    >
      <mt-spinner 
        :type="0" 
        color="#388CFF"
      ></mt-spinner>
    </div> 
  </div>
</template>
<script>
import {Spinner} from 'mint-ui'
export default {
  name: 'App',
  components: { 
      'mt-spinner': Spinner,
  },  
  data(){ 
      return { 
        show:false,
      }
  },
  computed:{ 
  },
  watch: { 
  },
  created() { 
  },
  mounted() { 
    window.vueEvents.$on('open',()=>{ 
        this.show = true
    })
    window.vueEvents.$on('close',()=>{ 
        this.show = false
    })      
     window.vueEvents.$on('timeout',()=>{ 
        this.vmsg.alert('请求超时').then(()=>{
        })
    })
    window.vueEvents.$on('error',(msg)=>{ 
        this.vmsg.alert(msg).then(()=>{
            this.util.returnApp();
        })
    })
  },  
  methods: { 
    init() { 
      console.log(this.role)
      if(!this.role || this.role == 'XS') { 
        this.$router.push({name:'role_four'});
        return 
      }
      if(this.role == 'SUPER_BZR') {  
        this.$router.push({name:'role_two'})  
      } else if(this.role == 'SUPER_RKJS') { 
        this.$router.push({name:'role_three'})
      }else  { 
        this.$router.push({name:'role_one'})
      }
    },
  },

}
</script>

<style lang='less'>
#app {
    height: 100%;
    .loading { 
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left:0;
      justify-content: center;
      align-items: center;
      display: flex;
      z-index: 3000;
      background-color: rgba(225,225,225,0);
    }
}
</style>
