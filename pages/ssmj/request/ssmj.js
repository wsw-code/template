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

function getNjbjBylsid () {
  return ajax(poxcyPath + '/ssmj/getNjbjBylsid')
}

function getXxgqtj (id,date) {
  return ajax(poxcyPath + '/ssmj/getXxgqtj',{date,id})
}

function getNjgqtj (id,date) {
  return ajax(poxcyPath + '/ssmj/getNjgqtj',{date,id})
}
function getBjgqtj (id,date,userid) {
  return ajax(poxcyPath + '/ssmj/getBjgqtj',{date,id,userid})
}

export {getNjbjBylsid,getXxgqtj,getNjgqtj,getBjgqtj}


