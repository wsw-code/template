import axios from 'axios'
import { poxcyPath } from 'appConfig'
import { MessageBox } from 'mint-ui'


function createdRequestPath(name) { 
  return `${poxcyPath}/bpgl/postAjax_${name}`
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

function queryDzbpList(data,LOADING=false) { 
  var requestPath = createdRequestPath('queryDzbpList')
  var url = '/dzbp/pz/queryDzbpList.jsmeb'
  return newAjax(requestPath,{url,data},{LOADING})
}



function getDzbpJt(data) { 
  var requestPath = createdRequestPath('getDzbpJt')
  var url = '/dzbp/pz/getDzbpJt.jsmeb'
  return newAjax(requestPath,{url,data})
}


function saveZl(data) { 
  var requestPath = createdRequestPath('saveZl')
  var url = '/dzbp/zl/saveZl.jsmeb'
  return newAjax(requestPath,{url,data})
}

function queryAlbumList(data) { 
  var requestPath = createdRequestPath('queryAlbumList')
  var url = '/dzbp/queryAlbumList.jsmeb'
  return newAjax(requestPath,{url,data},{LOADING:false})
}

function uploadImage (formData) {
  return axios.post(poxcyPath + '/bpgl/uploadImage',formData,{LOADING:true})
}

function saveAlbum(data) { 
  var requestPath = createdRequestPath('saveAlbum')
  var url = '/dzbp/saveAlbum.jsmeb'
  return newAjax(requestPath,{url,data})
}

function deleteAlbum(data) { 
  var requestPath = createdRequestPath('deleteAlbum')
  var url = '/dzbp/deleteAlbum.jsmeb'
  return newAjax(requestPath,{url,data})
}
function queryTzggList(data) { 
  var requestPath = createdRequestPath('queryTzggList')
  var url = '/dzbp/tzgg/queryTzggList.jsmeb'
  return newAjax(requestPath,{url,data})
}
function saveTzgg(data) { 
  var requestPath = createdRequestPath('saveTzgg')
  var url = '/dzbp/tzgg/saveTzgg.jsmeb'
  return newAjax(requestPath,{url,data})
}

function queryBjfcList(data) { 
  var requestPath = createdRequestPath('queryBjfcList')
  var url = '/dzbp/xyzx/queryBjfcList.jsmeb'
  return newAjax(requestPath,{url,data})
}

function saveBjfc(data) { 
  var requestPath = createdRequestPath('saveBjfc')
  var url = '/dzbp/xyzx/saveBjfc.jsmeb'
  return newAjax(requestPath,{url,data})
}

function getBjfc(data) { 
  var requestPath = createdRequestPath('getBjfc')
  var url = '/dzbp/xyzx/getBjfc.jsmeb'
  return newAjax(requestPath,{url,data})
}


export {getBjfc,saveBjfc,queryBjfcList,saveTzgg,queryDzbpList,getDzbpJt,saveZl,queryAlbumList,uploadImage,saveAlbum,deleteAlbum,queryTzggList}


