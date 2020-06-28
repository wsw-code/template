import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'
function ajax(url,params) {  
  return axios.post(url, params).then(data=>{ 
      if(data.result.code == '0') { 
        return data.result;
      } else { 
        MessageBox('',data.result.msg);
        return Promise.reject();
      }
  })
}

function getXsBaseInfo (apiUrl,token) {
  return ajax(poxcyPath + '/xsrx/getXsBaseInfo', {apiUrl,token})
}

function getMyDormState (apiUrl,token) {
  return ajax(poxcyPath + '/xsrx/getMyDormState', {apiUrl,token})
}


export {getMyDormState,getXsBaseInfo}
