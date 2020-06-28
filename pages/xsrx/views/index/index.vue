<template>
  <div id="index">
    <div>
      <cell
        title="我的班级" 
        :nr="njbjnr"
      ></cell>
      <cell 
        title="我的宿舍" 
        :nr="ssnr"
        :type="2"
      ></cell>
    </div>
    <a 
      :href="href" 
      class="wsxx"
    >完善信息</a>
  </div>
</template>
<script>
  import Cell from './components/cell.vue';
  import {getMyDormState,getXsBaseInfo} from '@/request/xsrx.js'
  export default {
    components:{ 
      Cell
    },
    data(){
      return {
       njbjnr:'',
       token:'',
       ssnr:'',
      }
    },
    computed:{ 
      href() { 
        return `http://zhxy.yixx.cn/njs_3088/wdda/?token=${NODE_BASEINFO.token}&apiUrl=${this.apiUrl}xsfzgl&userid=${NODE_BASEINFO.ksh}`
      }
    },
    created() { 
      this.userid = NODE_BASEINFO.ksh || '';
      this.apiUrl = this.changeApiUrl(NODE_BASEINFO.apiUrl);
      this.token = this.saveToken();
      this.getInfo();
      this.getDom();
    },
    mounted() {  

    },
    methods:{ 
      changeApiUrl(str) { 
        if(window.sessionStorage.getItem('XSRX_APIURL')) { 
          return window.sessionStorage.getItem('XSRX_APIURL')
        } else { 
          var _str = str?str.replace(/(yunpt\/|yunpt)/ig,''):'';
          window.sessionStorage.setItem('XSRX_APIURL',_str);
          return _str;
        }
        
      },
      getDom() { 
        var _url = this.saveApiUrl('XSRX_ssUrl',this.apiUrl?(this.apiUrl+'xyzhgl'):'');
        getMyDormState(_url,this.token)
        .then(data=>{ 
          if(data.ssinfo) { 
            var _str = data.ssinfo.text.replace(/\s+/ig,'室');
            this.ssnr = _str
          } else { 
            this.ssnr = "暂无宿舍信息";
          }
        })
      },
      saveApiUrl(name,url) { 
        if(window.sessionStorage.getItem(name)) { 
          return window.sessionStorage.getItem(name)
        }
        window.sessionStorage.setItem(name,url);
        return url
      },
      saveToken() { 
        if(window.sessionStorage.getItem('XSRX_TOKEN')) { 
          return window.sessionStorage.getItem('XSRX_TOKEN')
        }
        window.sessionStorage.setItem('XSRX_TOKEN',NODE_BASEINFO.token || '');
        return NODE_BASEINFO.token
      },
      getInfo() { 
        var _url = this.saveApiUrl('XSRX_xsUrl',this.apiUrl?(this.apiUrl+'xsfzgl'):'');
        getXsBaseInfo(_url,this.token)
        .then((data)=>{ 
          this.njbjnr = data.baseInfo.njmc + data.baseInfo.bjmc;
        })
      }
    }
  }
</script>

<style lang='less'>
 #index { 
   padding: 30px 25px;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: space-between;
   .wsxx { 
      display: block;
      width:690px;
      height:90px;
      background:linear-gradient(95deg,rgba(56,140,255,1) 0%,rgba(11,197,254,1) 100%);
      opacity:0.9;
      text-align: center;
      border-radius:45px;
      font-size:36px;
      font-weight:400;
      color:#fff;
      line-height:90px;
   }
 }
</style>