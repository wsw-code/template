import axios from 'axios';
import {poxcyPath} from "appConfig"
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function getUserInfo() { 
    var appId = GetQueryString('appId') || ''
    var sfbdks = GetQueryString('sfbdks') || 1
    var appUrl = GetQueryString('appUrl') || 'https://zhxy-pro.yixx.cn/yxx_pro/'
    var appToken = GetQueryString('appToken') || ''
    var appUser = GetQueryString('appUser') || ''
    return axios.post('/'+poxcyPath+'getUserInfo',{appId,sfbdks,appUrl,appUser,appToken})
}


function proxyFn(next,fn) { 
  if(!window.NODE_TOKEN) { 
   getUserInfo().then(data=>{ 
     if(data.result.code == '0') { 
      fn && fn(data)
      next()
     } else { 
      window.vueEvents.$emit('error',data.result.msg); 
     }
   })
 } else { 
   next()
 } 
}

export default proxyFn
