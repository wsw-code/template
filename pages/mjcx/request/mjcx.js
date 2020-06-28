import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'


function createdRequestPath(name) { 
  return `${poxcyPath}/mjcx/postAjax_${name}`
}

function newAjax(requestPath,{url,data},extraParams={LOADING:true}) { 
  return axios.post(requestPath,{url,data},extraParams).then(data=>{ 
    if(data.result.code == '0') { 
      return data.result;
    } else { 
      MessageBox('',data.result.msg);
    }
  })
}

function getXsgqtj(data,LOADING=false) { 
  var requestPath = createdRequestPath('getXsgqtj')
  var url = '/mjgl/getXsgqtj.jsmeb'
  return newAjax(requestPath,{url,data},{LOADING})
}

function saveXsgq(data) { 
  var requestPath = createdRequestPath('saveXsgq')
  var url = '/mjgl/saveXsgq.jsmeb'
  return newAjax(requestPath,{url,data})
}

export {getXsgqtj,saveXsgq}


