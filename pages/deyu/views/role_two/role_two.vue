<template>
  <div id="role_two">
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <ul class="bottomUl">
      <router-link 
        tag="li" 
        to="kjtschild"
        replace
      >
        <div class="ticon ticon1"></div>
        <div class="linkTxt">
          德育空间
        </div>
      </router-link>
      <router-link 
        tag="li" 
        to="tjchild"
        replace
      >
        <div class="ticon ticon2"></div>
        <div class="linkTxt">
          班级德育
        </div>
      </router-link>
      <router-link 
        tag="li" 
        to="xschild"
        replace
      >
        <div class="ticon ticon3"></div>
        <div class="linkTxt">
          学生德育
        </div>
      </router-link>
    </ul>
    <btn></btn>
  </div>
</template>

<script>
  import Btn from '@/views/components/btn.vue'
  
  export default {
    name:'RoleTwo', 
    components: {
      Btn  
    },
    data(){
      return {
        tabIndex:0,
        dj:'',
        nj_pm_2:'',
        qx_pm_2:'',
      }
    },
    computed: { 
    },
    created() { 
    },
    methods: { 
      tab(index) { 
        this.tabIndex = index;
      }
    }

  }
</script>

<style lang='less' scoped>
  #role_two {
    height: 100%;
    .roleTwoTop {
      position: relative;
      overflow: hidden;
      height: 398px;
      background-color: #35A3DD;
    }
    .linkTxt { 
      font-size: 20px;
    }
    .pmList { 
      display: flex;
      color:#fff;
      position: absolute;
      left:0;
      bottom:0;
      width: 100%;
      padding-bottom: 32px;
      li { 
        display: flex;
        flex:1;
        font-size: 32px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        &:before { 
          position: absolute;
          content: '';
          right: 0px;
          top: 10px;
          width: 1Px;
          height: 45px;
          background-color: rgba(255,255,255,0.3);
        }
      }
      .pm { 
        font-size: 32px;
      }
      .score { 
        font-size: 32px;
        margin-top: 20px;
        color:rgba(255,255,255,0.5);
      }
    }
    .pfIcon { 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 35px;
      img { 
        width: 120px;
      }
      .txt { 
        font-size: 28px;
        margin-top: 10px;
        color:rgba(255, 255, 255, 0.6);
      }
    }
    .container { 
      width: 100%;
      height: calc(100% - 100px);
    }
    .bottomUl { 
      height: 100px;
      width: 100%;
      display: flex;
      left:0;
      bottom:0;
      background-color: #fff;
      .bd(#ddd,'top',fixed);
      li { 
        display: flex;
        flex:1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    }
    .router-link-active { 
      color:#35A3DD;
      .ticon1 {
        background-image: url('~@/static/images/ticon1ac.png');
      }
      .ticon2 {
        background-image: url('~@/static/images/ticon2ac.png');
      } 
      .ticon3 {
        background-image: url('~@/static/images/ticon3ac.png');
      }            
    }
    .ticon { 
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .ticon1 {
      background-image: url('~@/static/images/ticon1.png');
    }
    .ticon2 {
      background-image: url('~@/static/images/ticon2.png');
    }
    .ticon3 { 
      background-image: url('~@/static/images/ticon3.png');
    }
  }
</style>