import axios from 'axios'
import { poxcyPath } from 'appConfig'
import util from '@/static/js/util.js'
import {MessageBox} from 'mint-ui'
var userxx = JSON.parse(util.getToken(null, 'achieve'))
var token = GetQueryString('token') || (userxx ? userxx.token : '')
function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

// function getPersonalInfo () {
//   return axios.post(poxcyPath + '/wdda/getPersonalInfo', { token })
// }

function getEaraList (areaId='',type=1) {
  return axios.post(poxcyPath+'/wdda/getEaraList', { type,areaId,token })
}

function uploadTx (formData) {
  return axios.post(poxcyPath + '/wdda/uploadTx', formData,{ 
    headers: { 
      "Content-type":"multipart/form-data"
    }
  })
}

function saveLrsj (bdid,userid,ufmxMap,userbdid="") {
  ufmxMap = JSON.stringify(ufmxMap);
  return axios.post(poxcyPath + '/wdda/saveLrsj', { bdid,userid,userbdid,ufmxMap,token })
}


function uploadImage (formData) {
  return axios.post(poxcyPath + '/wdda/uploadImage',formData)
}

function createdRequestPath(name) { 
  return `${poxcyPath}/wdda/postAjax_${name}`
}

function newAjax(requestPath,{url,data},extraParams={LOADING:true}) { 
  return axios.post(requestPath,{url,data},extraParams).then(data=>{ 
    if(data.result.code == '0') { 
      return data;
    } else { 
      MessageBox('',data.result.msg);
    }
  })
}

function getPersonalInfo(LOADING=false) { 
  var requestPath = createdRequestPath('getPersonalInfo')
  var url = '/public/jsfzgl/wdda/getPersonalInfo.jsmeb'
  var userid = NODE_BASEINFO.ksh || NODE_BASEINFO.userid;
  var params = [userid,userid,1,'']
  var reg = /zhxygl$|zhxygl\/$/ig;
  if(reg.test(NODE_BASEINFO.apiUrl)) { //合并应用后要添加一个空参数 
    params.push('');
  }
  
  return newAjax(requestPath,{url,data:params},{LOADING})
}

export { getPersonalInfo,getEaraList,uploadTx,saveLrsj,uploadImage }
