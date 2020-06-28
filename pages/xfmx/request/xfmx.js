import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'
function ajax(url,params) {  
  return axios.post(url, params).then(data=>{ 
      console.log(data);
      if(data.result.code == '0') { 
        return data.result;
      } else { 
        MessageBox('',data.result.msg);
        return Promise.reject();
      }
  })
}

function queryXfmx (week) {
  return ajax(poxcyPath + '/xfmx/queryXfmx',{week})
}


export {queryXfmx}


