import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'
function ajax(url,params) {  
  return axios.post(url, params).then(data=>{ 
      if(data.result.code == '0') { 
        return data.result;
      } else { 
        MessageBox('',data.result.msg);
      }
  })
}

function getInfo (host,jsid='') {
  return ajax(poxcyPath + '/jsda/getInfo', {host,jsid})
}



export {getInfo}
